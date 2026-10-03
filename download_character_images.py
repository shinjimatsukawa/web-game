# -*- coding: utf-8 -*-
"""
全75種類のキャラクター用の高品質SVGイラスト画像をダウンロードして
images/characters/{id}.svg に配置するスクリプト
"""
import os
import urllib.request
import setup_quiz_mode

DEST_DIR = "images/characters"
os.makedirs(DEST_DIR, exist_ok=True)

def get_emoji_hex(emoji_str):
    # 異体字セレクタ (FE0F) を除外して小文字の16進数で結合
    chars = [c for c in emoji_str if ord(c) != 0xfe0f]
    return "-".join([f"{ord(c):x}" for c in chars])

items = setup_quiz_mode.ITEMS
print(f"Total items to download: {len(items)}")

headers = {"User-Agent": "Mozilla/5.0"}

success_count = 0
for item in items:
    cid = item["id"]
    emoji_str = item["emoji"]
    dest_path = os.path.join(DEST_DIR, f"{cid}.svg")
    
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 100:
        success_count += 1
        continue

    hex_code = get_emoji_hex(emoji_str)
    url = f"https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/{hex_code}.svg"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read()
            with open(dest_path, "wb") as f:
                f.write(content)
            print(f"[{item['category']}] Downloaded: {cid} ({item['nameHira']}) from {hex_code}.svg")
            success_count += 1
    except Exception as e:
        print(f"Error downloading {cid} ({hex_code}): {e}")
        # フォールバックで raw.githubusercontent から試行
        try:
            url2 = f"https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/{hex_code}.svg"
            req2 = urllib.request.Request(url2, headers=headers)
            with urllib.request.urlopen(req2, timeout=10) as resp2:
                content = resp2.read()
                with open(dest_path, "wb") as f:
                    f.write(content)
                print(f"[{item['category']}] Downloaded fallback: {cid}")
                success_count += 1
        except Exception as e2:
            print(f"Failed fallback for {cid}: {e2}")

print(f"\nCompleted! Successfully downloaded {success_count} / {len(items)} SVGs.")
