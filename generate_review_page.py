#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
文字集め問題レビュー用ドキュメント生成スクリプト
js/data.js の CHARACTERS_DATA から GitHub レビュー用 Markdown (REVIEW_CHARACTERS.md) を生成します。
"""

import json
import re
import os

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    data_js_path = os.path.join(root_dir, 'js', 'data.js')
    output_md_path = os.path.join(root_dir, 'REVIEW_CHARACTERS.md')

    with open(data_js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'const CHARACTERS_DATA = (\[.*?\]);', content, re.DOTALL)
    if not m:
        raise ValueError("CHARACTERS_DATA not found in js/data.js")

    data = json.loads(m.group(1))

    category_names = {
        'vehicle': '🚗 のりもの',
        'animal': '🦁 どうぶつ',
        'food': '🍎 たべもの'
    }

    categories = {'vehicle': [], 'animal': [], 'food': []}
    for d in data:
        categories[d['category']].append(d)

    md = []
    md.append('# 🔍 文字あつめ 問題・画像・答え レビュー一覧')
    md.append('')
    md.append(f'「うごく！文字あつめ」ゲームに登場する全{len(data)}問の**問題画像**、**答えの文字**、**出題問題文**のレビュー用ページです。')
    md.append('')
    md.append('> [!TIP]')
    md.append('> 🎧 **音声試聴・絞り込み・メモ保存ができる動的レビューツール**:  ')
    md.append('> ブラウザで [`review.html`](review.html) を開くと、出題音声や正解音声の試聴、カテゴリ・文字数フィルタ、チェック状態の保存が可能です。')
    md.append('')
    md.append('## 📊 サマリー')
    md.append('')
    md.append(f'| カテゴリ | 問題数 | 文字数の範囲 |')
    md.append('| :--- | :---: | :--- |')
    for cat_key, cat_label in category_names.items():
        items = categories[cat_key]
        lengths = [len(x['charsHira']) for x in items]
        min_l, max_l = min(lengths), max(lengths)
        md.append(f'| {cat_label} | {len(items)}問 | {min_l}文字 〜 {max_l}文字 |')
    md.append(f'| **合計** | **{len(data)}問** | 2文字 〜 8文字 |')
    md.append('')
    md.append('### 目次')
    for cat_key, cat_label in category_names.items():
        count = len(categories[cat_key])
        md.append(f'- [{cat_label} (全{count}問)](#-{cat_label.split()[-1]}-全{count}問)')
    md.append('')

    idx = 1
    for cat_key, cat_label in category_names.items():
        count = len(categories[cat_key])
        md.append(f'## {cat_label} (全{count}問)')
        md.append('')
        md.append('| No | 画像 | 答えの文字<br>(ひらがな / カタカナ) | 出題問題文 (`questionText`) | 構成文字スロット | 音声・演出テキスト | ID |')
        md.append('| :---: | :---: | :--- | :--- | :--- | :--- | :---: |')

        for d in categories[cat_key]:
            img_path = d['imageSrc'].lstrip('/')
            char_badges = ' '.join([f'`{c}`' for c in d['charsHira']])
            q_text = d['questionText'].replace('|', '&#124;')
            s_text = d.get('soundText', '').replace('|', '&#124;')
            decor = d.get('bgDecor', '')
            action = d.get('actionType', '')

            sound_info = f'{decor} {s_text}' if s_text else decor
            if action:
                sound_info += f'<br><small style="color:#888;">(動作: {action})</small>'

            row = (
                f'| {idx} '
                f'| <img src="{img_path}" width="80" height="80" alt="{d["nameHira"]}"> '
                f'| <strong style="font-size:1.1em;">{d["nameHira"]}</strong><br><code>{d["nameKata"]}</code> ({len(d["charsHira"])}文字) '
                f'| {q_text} '
                f'| {char_badges} '
                f'| {sound_info} '
                f'| <code>{d["id"]}</code> |'
            )
            md.append(row)
            idx += 1

        md.append('')

    with open(output_md_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(md) + '\n')

    print(f"Generated {output_md_path} successfully ({len(data)} items).")

if __name__ == '__main__':
    main()
