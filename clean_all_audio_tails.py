#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全音声ファイルの末尾ノイズ（TTS生成時のEOSアーティファクト・クリック音）を除去し、
末尾を滑らかにフェードアウトさせて0にするクリーンアップスクリプト
"""
import glob
import wave
import array
import math
import os

def clean_file(file_path):
    with wave.open(file_path, "rb") as wf:
        rate = wf.getframerate()
        nchannels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        frames = wf.readframes(wf.getnframes())
    
    samples = array.array("h", frames)
    orig_len = len(samples)
    
    # 10msウィンドウでRMS計算
    w_size = int(rate * 0.01) # 10ms
    rms_list = []
    for i in range(0, len(samples) - w_size, w_size):
        chunk = samples[i : i + w_size]
        rms = math.sqrt(sum(s*s for s in chunk) / len(chunk))
        rms_list.append((i, rms))
        
    search_start = max(0, len(rms_list) - int(rate * 1.0 / w_size))
    cut_idx = None

    # 末尾1秒間を前から後ろへ探索:
    # 静音（RMS < 70）が 40ms（4ウィンドウ）以上続いた後の区間に、
    # 異常ノイズバースト（RMS > 180）がある場合、その静音区間の終端で切り落とす
    for w in range(len(rms_list) - 4, search_start, -1):
        if all(rms_list[w + k][1] < 70 for k in range(4)):
            has_subsequent_noise = any(rms_list[k][1] > 180 for k in range(w + 4, len(rms_list)))
            if has_subsequent_noise:
                cut_idx = rms_list[w + 4][0]
                break

    trimmed = False
    if cut_idx is not None:
        samples = samples[:cut_idx]
        trimmed = True

    # 末尾30msをゼロへフェードアウト
    fade_len = min(len(samples), int(rate * 0.03))
    for i in range(fade_len):
        factor = i / fade_len
        samples[-1 - i] = int(samples[-1 - i] * factor)

    # 20msの完全無音（ゼロ）を追加
    samples.extend([0] * int(rate * 0.02))
        
    with wave.open(file_path, "wb") as wf:
        wf.setnchannels(nchannels)
        wf.setsampwidth(sampwidth)
        wf.setframerate(rate)
        wf.writeframes(samples.tobytes())
        
    cut_ms = (orig_len - len(samples)) / rate * 1000
    return trimmed, cut_ms

def main():
    dirs = [
        "audio/neural/questions",
        "audio/neural/praises",
        "audio/neural/table"
    ]
    
    total_files = 0
    total_trimmed = 0
    
    for d in dirs:
        files = sorted(glob.glob(f"{d}/*.wav"))
        trimmed_in_dir = 0
        for f in files:
            total_files += 1
            tr, ms = clean_file(f)
            if tr:
                trimmed_in_dir += 1
                total_trimmed += 1
        print(f"[{d}] 完了: {len(files)} ファイル中 {trimmed_in_dir} ファイルの末尾ノイズを除去")
        
    print(f"\n全ディレクトリ完了: 全 {total_files} ファイル中 {total_trimmed} ファイルの末尾ノイズを完全に除去しました。")

if __name__ == '__main__':
    main()
