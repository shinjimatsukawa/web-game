# -*- coding: utf-8 -*-
"""
音声品質自動ガードシステム（Audio Quality Guard）
1. 波形解析による末尾ノイズ（EOSアーティファクト）の自動検知＆切除＆ゼロフェードアウト
2. Gemini AI による音声認識（文字起こし）・期待単語突合・英語指示文混入・末尾ノイズの自動判定
"""
import io
import wave
import array
import math
import re
from google.genai import types

def clean_pcm_tail(pcm_data, rate=24000):
    """先頭ヘッダー混入の切除＆先頭フェードイン、末尾ノイズバースト切除＆ゼロフェードアウト"""
    # 1. もし Gemini API が WAV ヘッダー（RIFF）を返してきた場合は data チャンク以降の純粋なPCMのみを取り出す
    if pcm_data.startswith(b"RIFF"):
        data_idx = pcm_data.find(b"data")
        if data_idx != -1 and data_idx < 100:
            pcm_data = pcm_data[data_idx + 8:]

    samples = array.array("h", pcm_data)
    
    # 2. 先頭 10ms のゼロフェードイン（クリック音・POPノイズの完全防止）
    head_fade_len = min(len(samples), int(rate * 0.01))
    for i in range(head_fade_len):
        factor = i / head_fade_len
        samples[i] = int(samples[i] * factor)

    # 3. 末尾ノイズ探索と切除
    w_size = int(rate * 0.01) # 10ms
    rms_list = []
    for i in range(0, len(samples) - w_size, w_size):
        chunk = samples[i : i + w_size]
        rms = math.sqrt(sum(s*s for s in chunk) / len(chunk))
        rms_list.append((i, rms))
        
    search_start = max(0, len(rms_list) - int(rate * 1.0 / w_size))
    cut_idx = None

    for w in range(len(rms_list) - 4, search_start, -1):
        if all(rms_list[w + k][1] < 70 for k in range(4)):
            has_subsequent_noise = any(rms_list[k][1] > 180 for k in range(w + 4, len(rms_list)))
            if has_subsequent_noise:
                cut_idx = rms_list[w + 4][0]
                break

    if cut_idx is not None:
        samples = samples[:cut_idx]

    # 4. 末尾 30ms のゼロフェードアウト ＋ 20ms の完全無音パディング
    fade_len = min(len(samples), int(rate * 0.03))
    for i in range(fade_len):
        factor = i / fade_len
        samples[-1 - i] = int(samples[-1 - i] * factor)

    samples.extend([0] * int(rate * 0.02))
    return samples.tobytes()

def pcm_to_wav_bytes(pcm_data, rate=24000, channels=1, sample_width=2):
    """PCMデータをWAVバイト列に変換"""
    buf = io.BytesIO()
    with wave.open(buf, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(pcm_data)
    return buf.getvalue()

def verify_audio_with_ai(client, wav_bytes, expected_text):
    """Gemini 3.8 Flash による音声品質の厳格な全自動インスペクション"""
    try:
        resp = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=[
                types.Part.from_bytes(data=wav_bytes, mime_type="audio/wav"),
                f"期待される発話内容: 「{expected_text}」\n\n"
                "この音声を厳密に検証してください。\n"
                "1. 英語の指示文（'Say in...'など）やプロンプトの読み上げ、期待しない言葉が入っていないか？\n"
                "2. 発話が途中で途切れたり、末尾にクリック音・ノイズ・割れ音が入っていないか？\n"
                "3. 日本語の発話内容が期待テキストと合致しているか？（※漢字・ひらがな・句読点・感嘆詞などの表記揺れは許容しPASSとします。明らかな言い間違い、意味を変える余計な言葉の追加、発話の脱落がある場合のみFAILとします）\n\n"
                "必ず以下の3行の形式のみで回答してください:\n"
                "TRANSCRIPT: (聞き取れた正確なテキスト)\n"
                "STATUS: (上記すべて問題なければ PASS、問題があれば FAIL)\n"
                "REASON: (FAILの場合の具体的な理由、PASSなら NONE)"
            ]
        )
        text = resp.text.strip()
        
        status_match = re.search(r"STATUS:\s*(PASS|FAIL)", text, re.IGNORECASE)
        status = status_match.group(1).upper() if status_match else "FAIL"
        
        transcript_match = re.search(r"TRANSCRIPT:\s*(.+)", text)
        transcript = transcript_match.group(1).strip() if transcript_match else "N/A"
        
        reason_match = re.search(r"REASON:\s*(.+)", text)
        reason = reason_match.group(1).strip() if reason_match else text

        # 英語の指示文キーワードが transcript に紛れていないか追加チェック
        unwanted_keywords = ["say", "cheerful", "energetic", "tone", "child", "japanese", "prompt"]
        lower_tr = transcript.lower()
        for kw in unwanted_keywords:
            if kw in lower_tr:
                return False, transcript, f"英語指示キーワード「{kw}」を検知しました"

        if status == "PASS":
            return True, transcript, "NONE"
        else:
            return False, transcript, reason

    except Exception as e:
        return False, "ERROR", f"AI検証中にエラー: {e}"

def clean_and_verify_pcm(client, pcm_data, expected_text, rate=24000, verify_ai=True):
    """
    波形クリーンアップ ＋ AI文字起こし検証の統合ガード関数
    戻り値: (is_ok: bool, message: str, cleaned_pcm: bytes)
    """
    # 1. 末尾ノイズトリミング ＆ ゼロフェードアウト
    cleaned_pcm = clean_pcm_tail(pcm_data, rate)
    dur = len(cleaned_pcm) / (rate * 2)
    
    # 2. 音声長チェック（短すぎ・長すぎの異常を排除）
    if dur < 0.8 or dur > 7.5:
        return False, f"音声長異常: {dur:.2f}秒 (0.8s〜7.5sの範囲外)", cleaned_pcm

    # 3. AIによる文字起こし・ノイズ検知チェック
    if verify_ai:
        wav_bytes = pcm_to_wav_bytes(cleaned_pcm, rate)
        ok, transcript, reason = verify_audio_with_ai(client, wav_bytes, expected_text)
        if not ok:
            return False, f"AI検品NG [{reason}] (認識: {transcript})", cleaned_pcm
        return True, f"AI検品合格 (認識: {transcript})", cleaned_pcm

    return True, f"波形クリーンアップ完了 ({dur:.2f}秒)", cleaned_pcm
