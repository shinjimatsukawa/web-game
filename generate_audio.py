import os
import subprocess

# 50音定義
KANA_DATA = [
  ('a', 'あ', 'アイス'),
  ('i', 'い', 'いちご'),
  ('u', 'う', 'うさぎ'),
  ('e', 'え', 'えんぴつ'),
  ('o', 'お', 'おにぎり'),
  ('ka', 'か', 'かめ'),
  ('ki', 'き', 'きりん'),
  ('ku', 'く', 'くるま'),
  ('ke', 'け', 'ケーキ'),
  ('ko', 'こ', 'コアラ'),
  ('sa', 'さ', 'さかな'),
  ('shi', 'し', 'しんかんせん'),
  ('su', 'す', 'すいか'),
  ('se', 'せ', 'せみ'),
  ('so', 'そ', 'そら'),
  ('ta', 'た', 'たいよう'),
  ('chi', 'ち', 'チューリップ'),
  ('tsu', 'つ', 'つき'),
  ('te', 'て', 'てんとうむし'),
  ('to', 'と', 'トマト'),
  ('na', 'な', 'なす'),
  ('ni', 'に', 'にじ'),
  ('nu', 'ぬ', 'ぬいぐるみ'),
  ('ne', 'ね', 'ねこ'),
  ('no', 'の', 'のりまき'),
  ('ha', 'は', 'はな'),
  ('hi', 'ひ', 'ひこうき'),
  ('fu', 'ふ', 'ふうせん'),
  ('he', 'へ', 'へび'),
  ('ho', 'ほ', 'ほし'),
  ('ma', 'ま', 'マイク'),
  ('mi', 'み', 'みかん'),
  ('mu', 'む', 'むしば'),
  ('me', 'め', 'めがね'),
  ('mo', 'も', 'もも'),
  ('ya', 'や', 'やま'),
  ('yu', 'ゆ', 'ゆきだるま'),
  ('yo', 'よ', 'ようちえん'),
  ('ra', 'ら', 'ライオン'),
  ('ri', 'り', 'りんご'),
  ('ru', 'る', 'ルビー'),
  ('re', 'れ', 'レモン'),
  ('ro', 'ろ', 'ロケット'),
  ('wa', 'わ', 'わに'),
  ('wo', 'を', '「手を洗う」の を'),
  ('nn', 'ん', 'パンダの ん')
]

WORDS = [
  ('inu', 'いぬ'),
  ('neko', 'ねこ'),
  ('tori', 'とり'),
  ('kuma', 'くま'),
  ('ushi', 'うし'),
  ('buta', 'ぶた'),
  ('saru', 'さる'),
  ('kani', 'かに'),
  ('hoshi', 'ほし'),
  ('ame', 'あめ'),
  ('hana', 'はな'),
  ('yama', 'やま'),
  ('kuruma', 'くるま'),
  ('ringo', 'りんご'),
  ('suika', 'すいか'),
  ('mikan', 'みかん'),
  ('tomato', 'トマト'),
  ('banana', 'バナナ'),
  ('usagi', 'うさぎ'),
  ('kirin', 'きりん'),
  ('roketto', 'ロケット'),
  ('hikouki', 'ひこうき')
]

PHRASES = [
  ('dorekana', 'どれかな？'),
  ('correct_1', 'せいかい！'),
  ('correct_2', 'やったね！'),
  ('correct_3', 'すごーい！'),
  ('try_again_1', 'おしい！もういっかい！'),
  ('try_again_2', 'もういっかい えらんでね！'),
  ('goal_quiz', 'ぜんもん せいかい！すごいね！'),
  ('goal_puzzle', 'パズル クリア！じょうずに できたね！')
]

def make_audio(text, out_m4a):
  tmp_aiff = out_m4a.replace('.m4a', '.aiff')
  subprocess.run(['say', '-v', 'Kyoko', text, '-o', tmp_aiff], check=True)
  subprocess.run(['afconvert', '-f', 'm4af', '-d', 'aac', tmp_aiff, out_m4a], check=True)
  if os.path.exists(tmp_aiff):
    os.remove(tmp_aiff)

# 1. 50音
for item_id, char, word in KANA_DATA:
  # フル読み上げ: 「あ！アイス！」
  full_text = f"{char}！ {word}！"
  make_audio(full_text, f"audio/kana/{item_id}.m4a")
  # 文字単体: 「あ」
  make_audio(f"{char}", f"audio/kana/char_{item_id}.m4a")

# 2. 単語
for word_id, word_text in WORDS:
  make_audio(f"{word_text}！できたね！", f"audio/words/{word_id}.m4a")
  make_audio(f"{word_text}", f"audio/words/char_{word_id}.m4a")

# 3. フレーズ
for p_id, p_text in PHRASES:
  make_audio(p_text, f"audio/phrases/{p_id}.m4a")

print("All audio generated successfully!")
