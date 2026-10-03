#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gemini Speech Generation (Voice: Aoede)
複数TTSモデルの自動ローテーション ＆ 自動リトライ ＆ Pi4自動同期付き一括生成スクリプト
"""
import os
import sys
import time
import wave
import subprocess
from dotenv import load_dotenv

# ~/.env または .env から API キーを読み込む
load_dotenv(os.path.expanduser("~/.env"))
load_dotenv(".env")

api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
if not api_key:
    print("Error: GEMINI_API_KEY is not set in ~/.env or .env", file=sys.stderr)
    sys.exit(1)

from google import genai
from google.genai import types

try:
    from setup_quiz_mode import ITEMS
except ImportError:
    print("Error: Could not import ITEMS from setup_quiz_mode.py", file=sys.stderr)
    sys.exit(1)

# 無料枠（Free Tier）の Daily クォータ（RPD）制限を回避するためのモデルプール
# 1つのモデルが 1日上限（PerDay）に達したら、自動で次のモデルに切り替えます
# 利用モデル群（3.1-flash-tts-preview が高速かつ高精度）
MODELS = [
    "gemini-3.1-flash-tts-preview",
    "gemini-3.8-flash-lite-tts",
    "gemini-3.8-flash-tts"
]
VOICE_NAME = "Aoede"

QUESTIONS_DIR = "audio/neural/questions"
PRAISES_DIR = "audio/neural/praises"

os.makedirs(QUESTIONS_DIR, exist_ok=True)
os.makedirs(PRAISES_DIR, exist_ok=True)

client = genai.Client(api_key=api_key, http_options=types.HttpOptions(timeout=25000))

import array
import math

def clean_pcm_tail(pcm_data, rate=24000):
    samples = array.array("h", pcm_data)
    w_size = int(rate * 0.01) # 10ms
    rms_list = []
    for i in range(0, len(samples) - w_size, w_size):
        chunk = samples[i : i + w_size]
        rms = math.sqrt(sum(s*s for s in chunk) / len(chunk))
        rms_list.append((i, rms))
        
    noise_start_w = None
    for w in range(len(rms_list) - 1, max(0, len(rms_list) - 45), -1):
        if rms_list[w][1] > 1200:
            noise_start_w = w
            break
            
    if noise_start_w is not None:
        silence_w = None
        for w in range(noise_start_w - 1, max(0, noise_start_w - 35), -1):
            if rms_list[w][1] < 100:
                silence_w = w
                break
        if silence_w is not None:
            cut_sample = min(len(samples), rms_list[silence_w][0] + int(rate * 0.04))
            samples = samples[:cut_sample]

    fade_len = min(len(samples), int(rate * 0.025))
    for i in range(fade_len):
        factor = i / fade_len
        samples[-1 - i] = int(samples[-1 - i] * factor)

    silence_padding = array.array("h", [0] * int(rate * 0.01))
    samples.extend(silence_padding)
    return samples.tobytes()

def save_wav(filename, pcm_data, rate=24000, channels=1, sample_width=2):
    cleaned_pcm = clean_pcm_tail(pcm_data, rate)
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(cleaned_pcm)

def is_valid_wav(path, max_dur=7.5):
    """正常な日本語音声ファイルか（英語指示文の誤読による8〜12秒の異常音声は再生成対象）"""
    if not os.path.exists(path) or os.path.getsize(path) < 1000:
        return False
    try:
        with wave.open(path, "rb") as wf:
            dur = wf.getnframes() / wf.getframerate()
            return 1.0 <= dur <= max_dur
    except Exception:
        return False

def sync_to_pi4():
    """生成済みのWAVファイルを Raspberry Pi 4 に随時同期"""
    try:
        subprocess.run(
            "rsync -avz ./audio/neural/questions/*.wav pi4:/home/shinji/kids-web-game/audio/neural/questions/ >/dev/null 2>&1 && "
            "rsync -avz ./audio/neural/praises/*.wav pi4:/home/shinji/kids-web-game/audio/neural/praises/ >/dev/null 2>&1",
            shell=True,
            timeout=15
        )
        print("    [SYNC] Synced new wav files to Raspberry Pi 4.")
    except Exception as e:
        print(f"    [SYNC ERROR] Could not sync to Pi4: {e}")

from audio_quality_guard import clean_and_verify_pcm

def generate_speech(prompt, out_path):
    if is_valid_wav(out_path):
        print(f"  [SKIP] Already clean & valid: {out_path}")
        return True

    total_attempts = 0
    MAX_TOTAL_ATTEMPTS = 3  # 無限リトライ防止のための全体試行回数ハードキャップ
    model_idx = 0

    while model_idx < len(MODELS):
        current_model = MODELS[model_idx]
        max_attempts_for_model = 2

        for attempt in range(1, max_attempts_for_model + 1):
            total_attempts += 1
            if total_attempts > MAX_TOTAL_ATTEMPTS:
                print(f"  [RETRY LIMIT REACHED] Reached total cap of {MAX_TOTAL_ATTEMPTS} attempts for {out_path}. Aborting.", file=sys.stderr)
                return False

            try:
                response = client.models.generate_content(
                    model=current_model,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        response_modalities=["AUDIO"],
                        speech_config=types.SpeechConfig(
                            voice_config=types.VoiceConfig(
                                prebuilt_voice_config=types.PrebuiltVoiceConfig(
                                    voice_name=VOICE_NAME
                                )
                            )
                        )
                    )
                )
                part = response.candidates[0].content.parts[0]
                pcm_data = part.inline_data.data

                # 自動検品システム: 波形ノイズ除去 ＋ AI文字起こし突合検査
                ok, msg, cleaned_pcm = clean_and_verify_pcm(client, pcm_data, prompt, rate=24000, verify_ai=True)
                if not ok:
                    print(f"  [QUALITY CHECK FAILED ({current_model})] {msg}. Retrying ({total_attempts}/{MAX_TOTAL_ATTEMPTS})...")
                    time.sleep(2)
                    continue

                with wave.open(out_path, "wb") as wf:
                    wf.setnchannels(1)
                    wf.setsampwidth(2)
                    wf.setframerate(24000)
                    wf.writeframes(cleaned_pcm)

                dur = len(cleaned_pcm) / (24000 * 2)
                print(f"  [DONE & VERIFIED ({current_model})] {out_path} ({dur:.2f}s) -> {msg}")
                return True
            except Exception as e:
                err_str = str(e)
                if "PerDay" in err_str:
                    print(f"  [DAILY QUOTA EXCEEDED] Model {current_model} reached PerDay limit. Rotating to next model...")
                    model_idx += 1
                    break
                elif "429" in err_str or "RESOURCE_EXHAUSTED" in err_str:
                    wait_sec = 22
                    print(f"  [RATE LIMIT 429 ({current_model})] Waiting {wait_sec}s for RPM reset ({total_attempts}/{MAX_TOTAL_ATTEMPTS})...")
                    time.sleep(wait_sec)
                else:
                    print(f"  [ERROR ({current_model})] {e}")
                    time.sleep(5)
        else:
            print(f"  [MODEL RETRY LIMIT] Switching from {current_model} to next model...")
            model_idx += 1

    print(f"  [ALL MODELS EXHAUSTED] Could not generate {out_path}.", file=sys.stderr)
    return False

def main():
    total = len(ITEMS)
    print("==================================================")
    print("Gemini Speech Generation 一括生成 (クリーン日本語版)")
    print(f"利用可能モデル群: {MODELS}")
    print(f"声質: {VOICE_NAME}")
    print(f"全アイテム数: {total} 問 (出題 {total} + 褒め {total} = 計 {total*2} ファイル)")
    print("==================================================")

    interval_sec = float(os.environ.get("GEMINI_INTERVAL_SEC", "1.5"))

    success_count = 0
    fail_count = 0
    generated_in_batch = 0

    for idx, item in enumerate(ITEMS, 1):
        cid = item["id"]
        q_text = item["questionText"]
        p_text = item["praiseText"]

        q_path = os.path.join(QUESTIONS_DIR, f"{cid}.wav")
        p_path = os.path.join(PRAISES_DIR, f"{cid}.wav")

        print(f"\n[{idx}/{total}] キャラクター: {cid} ({item['nameHira']})")

        # 1. 出題クイズ音声 (英語の指示文を含めず日本語テキストのみを直接渡す)
        if not is_valid_wav(q_path):
            ok = generate_speech(q_text, q_path)
            if ok:
                success_count += 1
                generated_in_batch += 1
                time.sleep(interval_sec)
            else:
                fail_count += 1
        else:
            print(f"  [SKIP] Question clean: {q_path}")
            success_count += 1

        # 2. 正解・褒め言葉音声 (日本語テキストのみを直接渡す)
        if not is_valid_wav(p_path):
            ok = generate_speech(p_text, p_path)
            if ok:
                success_count += 1
                generated_in_batch += 1
                time.sleep(interval_sec)
            else:
                fail_count += 1
        else:
            print(f"  [SKIP] Praise clean: {p_path}")
            success_count += 1

        # 1問（2ファイル）生成ごとに Raspberry Pi 4 へバックグラウンド同期
        if generated_in_batch >= 2:
            sync_to_pi4()
            generated_in_batch = 0

    # 最後に全ファイルを同期
    sync_to_pi4()

    print("\n==================================================")
    print(f"一括生成終了: 成功 {success_count} / 失敗 {fail_count} (計 {total*2})")
    print("==================================================")

if __name__ == "__main__":
    main()
