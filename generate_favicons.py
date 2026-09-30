#!/usr/bin/env python3
"""
もじあそび パーク - Favicon & App Icons 生成スクリプト
Chrome Headless と sips を使用して高品質なアイコンアセットを一括生成
"""

import os
import struct
import subprocess
import shutil

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TMP_DIR = "/tmp/webgame_icons"
os.makedirs(TMP_DIR, exist_ok=True)

# 1. ファビコン用SVG（角丸・透過シャドウ付き）
# ブラウザタブやブックマークバーで見やすいバッジ型
FAVICON_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF5A78"/>
      <stop offset="50%" stop-color="#FF8E3C"/>
      <stop offset="100%" stop-color="#FFCA3A"/>
    </linearGradient>

    <linearGradient id="shineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.38"/>
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.12"/>
    </linearGradient>

    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="100%" stop-color="#FFD54F"/>
    </linearGradient>

    <filter id="shadowFilter" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#a0203e" flood-opacity="0.35"/>
    </filter>
    <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#801530" flood-opacity="0.35"/>
    </filter>
    <filter id="starShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="2" dy="5" stdDeviation="5" flood-color="#a84300" flood-opacity="0.32"/>
    </filter>
  </defs>

  <!-- アイコンベース（角丸 squircle） -->
  <g filter="url(#shadowFilter)">
    <rect x="24" y="24" width="464" height="464" rx="112" fill="url(#bgGrad)"/>
    <rect x="24" y="24" width="464" height="464" rx="112" fill="url(#shineGrad)"/>
    <rect x="30" y="30" width="452" height="452" rx="106" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-opacity="0.45"/>
  </g>

  <!-- 背景デコレーション（ポップな泡） -->
  <circle cx="95" cy="115" r="16" fill="#FFFFFF" opacity="0.35"/>
  <circle cx="125" cy="140" r="9" fill="#FFFFFF" opacity="0.25"/>
  <circle cx="410" cy="405" r="14" fill="#FFFFFF" opacity="0.3"/>
  <circle cx="380" cy="430" r="8" fill="#FFFFFF" opacity="0.2"/>

  <!-- 左下のミニ星飾り -->
  <g opacity="0.9" transform="translate(105, 385) rotate(-18) scale(0.65)" filter="url(#starShadow)">
    <path d="M 0 -45 L 13 -14 L 46 -13 L 20 7 L 30 38 L 0 19 L -30 38 L -20 7 L -46 -13 L -13 -14 Z" fill="#FFF176" stroke="#FFFFFF" stroke-width="3"/>
  </g>

  <!-- 中央のメイン文字「あ」 -->
  <g filter="url(#textShadow)">
    <text x="230" y="342"
          text-anchor="middle"
          font-family="'Hiragino Maru Gothic ProN', 'Zen Maru Gothic', 'Yu Gothic', 'Rounded Mplus 1c', sans-serif"
          font-size="285"
          font-weight="900"
          stroke="#FFFFFF"
          stroke-width="12"
          stroke-linejoin="round"
          fill="#FFFFFF">あ</text>
  </g>

  <!-- 右上のキラキラ笑顔の星 🌟 -->
  <g filter="url(#starShadow)" transform="translate(372, 126) rotate(16) scale(1.15)">
    <!-- 星本体 -->
    <path d="M 0 -46 L 14 -15 L 47 -14 L 20 8 L 30 40 L 0 20 L -30 40 L -20 8 L -47 -14 L -14 -15 Z"
          fill="url(#starGrad)" stroke="#FFFFFF" stroke-width="4.5" stroke-linejoin="round"/>
    
    <!-- ほっぺ（チーク） -->
    <ellipse cx="-13" cy="7" rx="5.5" ry="3.5" fill="#FF5252" opacity="0.6"/>
    <ellipse cx="13" cy="7" rx="5.5" ry="3.5" fill="#FF5252" opacity="0.6"/>

    <!-- つぶらな瞳 -->
    <ellipse cx="-10" cy="1" rx="3.5" ry="4.5" fill="#3D1D00"/>
    <circle cx="-11" cy="-0.5" r="1.5" fill="#FFFFFF"/>
    
    <ellipse cx="10" cy="1" rx="3.5" ry="4.5" fill="#3D1D00"/>
    <circle cx="9" cy="-0.5" r="1.5" fill="#FFFFFF"/>

    <!-- にっこりお口 -->
    <path d="M -5 7 Q 0 13 5 7" fill="none" stroke="#3D1D00" stroke-width="2.8" stroke-linecap="round"/>
  </g>

  <!-- 小さなきらめきクロス -->
  <path d="M 435 60 L 441 75 L 456 81 L 441 87 L 435 102 L 429 87 L 414 81 L 429 75 Z" fill="#FFFFFF" opacity="0.85"/>
</svg>
"""

# 2. Apple Touch Icon & PWA用SVG（全面フルブリード）
# iOSのホーム画面追加時にシステム側で正しく角丸マスクされる仕様
APPLE_TOUCH_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF5A78"/>
      <stop offset="50%" stop-color="#FF8E3C"/>
      <stop offset="100%" stop-color="#FFCA3A"/>
    </linearGradient>

    <linearGradient id="shineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.32"/>
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.10"/>
    </linearGradient>

    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="100%" stop-color="#FFD54F"/>
    </linearGradient>

    <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#801530" flood-opacity="0.35"/>
    </filter>
    <filter id="starShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="2" dy="6" stdDeviation="6" flood-color="#a84300" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- 全面グラデーション背景 -->
  <rect width="512" height="512" fill="url(#bgGrad)"/>
  <rect width="512" height="512" fill="url(#shineGrad)"/>

  <!-- 背景デコレーション -->
  <circle cx="85" cy="105" r="18" fill="#FFFFFF" opacity="0.35"/>
  <circle cx="118" cy="135" r="10" fill="#FFFFFF" opacity="0.25"/>
  <circle cx="425" cy="415" r="16" fill="#FFFFFF" opacity="0.3"/>
  <circle cx="390" cy="445" r="9" fill="#FFFFFF" opacity="0.2"/>

  <!-- 左下のミニ星飾り -->
  <g opacity="0.9" transform="translate(95, 395) rotate(-18) scale(0.72)" filter="url(#starShadow)">
    <path d="M 0 -45 L 13 -14 L 46 -13 L 20 7 L 30 38 L 0 19 L -30 38 L -20 7 L -46 -13 L -13 -14 Z" fill="#FFF176" stroke="#FFFFFF" stroke-width="3"/>
  </g>

  <!-- 中央のメイン文字「あ」 -->
  <g filter="url(#textShadow)">
    <text x="234" y="352"
          text-anchor="middle"
          font-family="'Hiragino Maru Gothic ProN', 'Zen Maru Gothic', 'Yu Gothic', 'Rounded Mplus 1c', sans-serif"
          font-size="305"
          font-weight="900"
          stroke="#FFFFFF"
          stroke-width="14"
          stroke-linejoin="round"
          fill="#FFFFFF">あ</text>
  </g>

  <!-- 右上のキラキラ笑顔の星 🌟 -->
  <g filter="url(#starShadow)" transform="translate(385, 122) rotate(16) scale(1.22)">
    <path d="M 0 -46 L 14 -15 L 47 -14 L 20 8 L 30 40 L 0 20 L -30 40 L -20 8 L -47 -14 L -14 -15 Z"
          fill="url(#starGrad)" stroke="#FFFFFF" stroke-width="4.5" stroke-linejoin="round"/>
    
    <ellipse cx="-13" cy="7" rx="5.5" ry="3.5" fill="#FF5252" opacity="0.6"/>
    <ellipse cx="13" cy="7" rx="5.5" ry="3.5" fill="#FF5252" opacity="0.6"/>

    <ellipse cx="-10" cy="1" rx="3.5" ry="4.5" fill="#3D1D00"/>
    <circle cx="-11" cy="-0.5" r="1.5" fill="#FFFFFF"/>
    
    <ellipse cx="10" cy="1" rx="3.5" ry="4.5" fill="#3D1D00"/>
    <circle cx="9" cy="-0.5" r="1.5" fill="#FFFFFF"/>

    <path d="M -5 7 Q 0 13 5 7" fill="none" stroke="#3D1D00" stroke-width="2.8" stroke-linecap="round"/>
  </g>

  <!-- きらめきクロス -->
  <path d="M 450 50 L 456 66 L 472 72 L 456 78 L 450 94 L 444 78 L 428 72 L 444 66 Z" fill="#FFFFFF" opacity="0.85"/>
</svg>
"""

def render_svg_to_png(svg_str, output_png_path, size=512):
    tmp_svg = os.path.join(TMP_DIR, "temp.svg")
    tmp_html = os.path.join(TMP_DIR, "temp.html")
    with open(tmp_svg, "w", encoding="utf-8") as f:
        f.write(svg_str)
    
    html_content = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ width: {size}px; height: {size}px; overflow: hidden; background: transparent; }}
  img {{ width: {size}px; height: {size}px; display: block; }}
</style>
</head>
<body>
  <img src="{tmp_svg}" />
</body>
</html>"""
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html_content)

    chrome_cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        f"--screenshot={output_png_path}",
        f"--window-size={size},{size}",
        "--default-background-color=00000000",
        f"file://{tmp_html}"
    ]
    subprocess.run(chrome_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def resize_png(src_png, dst_png, width, height):
    cmd = ["sips", "-z", str(height), str(width), src_png, "--out", dst_png]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def build_ico(png_sizes_and_paths, output_ico_path):
    # ICOヘッダー: reserved(2), type=1(2), count(2)
    images = []
    for size, p in png_sizes_and_paths:
        with open(p, "rb") as f:
            data = f.read()
            images.append(data)

    num_images = len(images)
    header = struct.pack("<HHH", 0, 1, num_images)
    
    entries = []
    offset = 6 + 16 * num_images
    for i, (size, p) in enumerate(png_sizes_and_paths):
        b_w = 0 if size >= 256 else size
        b_h = 0 if size >= 256 else size
        data_len = len(images[i])
        entry = struct.pack("<BBBBHHII", b_w, b_h, 0, 0, 1, 32, data_len, offset)
        entries.append(entry)
        offset += data_len
        
    with open(output_ico_path, "wb") as f:
        f.write(header)
        for entry in entries:
            f.write(entry)
        for data in images:
            f.write(data)

def main():
    print("🎨 [1/5] Favicon SVG を保存中...")
    favicon_svg_path = os.path.join(BASE_DIR, "favicon.svg")
    with open(favicon_svg_path, "w", encoding="utf-8") as f:
        f.write(FAVICON_SVG.strip())

    print("🖼️  [2/5] 高解像度マスターPNG を生成中...")
    raw_favicon_512 = os.path.join(TMP_DIR, "raw_favicon_512.png")
    raw_apple_512 = os.path.join(TMP_DIR, "raw_apple_512.png")
    
    render_svg_to_png(FAVICON_SVG, raw_favicon_512, size=512)
    render_svg_to_png(APPLE_TOUCH_SVG, raw_apple_512, size=512)

    print("📐 [3/5] 各種サイズのPNGアイコンを生成中...")
    # 32x32, 16x16, 48x48
    p32 = os.path.join(BASE_DIR, "favicon-32x32.png")
    p16 = os.path.join(BASE_DIR, "favicon-16x16.png")
    p48 = os.path.join(TMP_DIR, "favicon-48x48.png")
    resize_png(raw_favicon_512, p32, 32, 32)
    resize_png(raw_favicon_512, p16, 16, 16)
    resize_png(raw_favicon_512, p48, 48, 48)

    # Apple Touch Icon (180x180)
    apple_icon_path = os.path.join(BASE_DIR, "apple-touch-icon.png")
    resize_png(raw_apple_512, apple_icon_path, 180, 180)

    # PWA / Web App Icons (192x192, 512x512)
    p192 = os.path.join(BASE_DIR, "icon-192.png")
    p512 = os.path.join(BASE_DIR, "icon-512.png")
    resize_png(raw_apple_512, p192, 192, 192)
    shutil.copyfile(raw_apple_512, p512)

    print("📦 [4/5] favicon.ico (16, 32, 48px) を作成中...")
    favicon_ico_path = os.path.join(BASE_DIR, "favicon.ico")
    build_ico([(16, p16), (32, p32), (48, p48)], favicon_ico_path)

    print("✨ [5/5] アイコンファイル生成が完了しました！")
    for f in ["favicon.svg", "favicon.ico", "favicon-32x32.png", "favicon-16x16.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png"]:
        size = os.path.getsize(os.path.join(BASE_DIR, f))
        print(f"  - {f}: {size:,} bytes")

if __name__ == '__main__':
    main()
