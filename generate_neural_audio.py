import asyncio
import os
import edge_tts

VOICE = "ja-JP-NanamiNeural"

# 50音図鑑（句読点を適切に使い、自然で落ち着いた優しいイントネーションにする）
KANA_TABLE = [
  ('a', 'あ。アイスクリーム。'),
  ('i', 'い。いぬ、ワンワン！'),
  ('u', 'う。うさぎ、ピョンピョン！'),
  ('e', 'え。えんぴつ、カキカキ！'),
  ('o', 'お。おにぎり、モグモグ！'),
  ('ka', 'か。かめ、のっしのっし！'),
  ('ki', 'き。きりん、首がながいね！'),
  ('ku', 'く。くるま、ブーーン！'),
  ('ke', 'け。ケーキ、おいしそう！'),
  ('ko', 'こ。コアラ、ユーカリだいすき！'),
  ('sa', 'さ。さかな、スイスイ！'),
  ('shi', 'し。しんかんせん、はやーい！'),
  ('su', 'す。すいか、あまーい！'),
  ('se', 'せ。せみ、ミーンミーン！'),
  ('so', 'そ。にじのそら、きれいだね！'),
  ('ta', 'た。たいよう、ポカポカ！'),
  ('chi', 'ち。チューリップ、かわいいね！'),
  ('tsu', 'つ。おつきさま、ピカピカ！'),
  ('te', 'て。てんとうむし、てくてく！'),
  ('to', 'と。トマト、まあるいね！'),
  ('na', 'な。なすび、おいしいね！'),
  ('ni', 'に。にじ、なないろだね！'),
  ('nu', 'ぬ。ぬいぐるみ、ふわふわ！'),
  ('ne', 'ね。ねこ、ニャーオ！'),
  ('no', 'の。のりまき、パクッ！'),
  ('ha', 'は。おはな、いいにおい！'),
  ('hi', 'ひ。ひこうき、ビュイーン！'),
  ('fu', 'ふ。ふうせん、ふわふわ！'),
  ('he', 'へ。へび、ニョロニョロ！'),
  ('ho', 'ほ。きらきら、おほしさま！'),
  ('ma', 'ま。マイク、ラララ〜♪'),
  ('mi', 'み。みかん、おいしいね！'),
  ('mu', 'む。むしばいきん、バイバイ！'),
  ('me', 'め。めがね、よくみえる！'),
  ('mo', 'も。もも、ピンクいろ！'),
  ('ya', 'や。おやま、たかーい！'),
  ('yu', 'ゆ。ゆきだるま、コロコロ！'),
  ('yo', 'よ。ようちえん、たのしいね！'),
  ('ra', 'ら。ライオン、ガオ〜ッ！'),
  ('ri', 'り。まっかなりんご！'),
  ('ru', 'る。ルビー、キラキラ！'),
  ('re', 'れ。レモン、すっぱーい！'),
  ('ro', 'ろ。ロケット、はっしゃー！'),
  ('wa', 'わ。わに、ガブガブ！'),
  ('wo', 'を。てをあらうの、を！'),
  ('nn', 'ん。パンダの、ん！')
]

# 単語完成褒め言葉
PRAISES = [
  ('buta', 'ぶた！できたー！ブヒブヒ〜♪すごーい！'),
  ('inu', 'いぬ！できたー！ワンワン！やったね！'),
  ('neko', 'ねこ！できたー！ニャーオ♪すごーい！'),
  ('ushi', 'うし！できたー！モ〜〜ッ！じょうずだね！'),
  ('kuruma', 'くるま！できたー！ブーーン！かっこいいね！'),
  ('kaeru', 'かえる！できたー！ケロケロ〜♪ピョンピョン！'),
  ('panda', 'ぱんだ！できたー！ヤッター！コロコロ〜♪'),
  ('lion', 'らいおん！できたー！ガオ〜〜ッ！かっこいい！'),
  ('roketto', 'ロケット！できたー！さん、に、いち、発射〜〜！')
]

# 1文字（シャボン玉）
LETTERS = [
  'あ', 'い', 'う', 'え', 'お',
  'か', 'き', 'く', 'け', 'こ',
  'さ', 'し', 'す', 'せ', 'そ',
  'た', 'ち', 'つ', 'て', 'と',
  'な', 'に', 'ぬ', 'ね', 'の',
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  'ま', 'み', 'む', 'め', 'も',
  'や', 'ゆ', 'よ',
  'ら', 'り', 'る', 'れ', 'ろ',
  'わ', 'を', 'ん',
  'ぶ', 'ぱ', 'だ', 'っ',
  # カタカナ
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヲ', 'ン',
  'ブ', 'パ', 'ダ', 'ッ'
]

# リアクション
REACTIONS = [
  ('wrong', 'ちがうよ〜？もういっかい！')
]

async def generate():
  os.makedirs('audio/neural/table', exist_ok=True)
  os.makedirs('audio/neural/praises', exist_ok=True)
  os.makedirs('audio/neural/letters', exist_ok=True)
  os.makedirs('audio/neural/reactions', exist_ok=True)

  # 1. 50音図鑑
  print("Generating 50-on table audio with natural tone...")
  for item_id, text in KANA_TABLE:
    out = f'audio/neural/table/{item_id}.mp3'
    # rate/pitch変更なしのナチュラル音声
    comm = edge_tts.Communicate(text, VOICE)
    await comm.save(out)

  # 2. 褒め言葉
  print("Generating praise audio...")
  for item_id, text in PRAISES:
    out = f'audio/neural/praises/{item_id}.mp3'
    comm = edge_tts.Communicate(text, VOICE)
    await comm.save(out)

  # 3. 1文字（「ぶ。」のように句点をつけて自然な単音アクセントにする）
  print("Generating letters audio with natural ending...")
  for char in LETTERS:
    out = f'audio/neural/letters/{char}.mp3'
    comm = edge_tts.Communicate(f"{char}。", VOICE)
    await comm.save(out)

  # 4. リアクション
  for r_id, text in REACTIONS:
    out = f'audio/neural/reactions/{r_id}.mp3'
    comm = edge_tts.Communicate(text, VOICE)
    await comm.save(out)

  print("All neural audio regenerated successfully!")

if __name__ == '__main__':
  asyncio.run(generate())
