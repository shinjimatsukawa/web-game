# -*- coding: utf-8 -*-
"""
恐竜を完全削除し、絵文字重複をゼロにした綺麗なデータセット（全75種類）を作成して js/data.js を更新するスクリプト
"""
import json
import asyncio
import os
import edge_tts

# ----------------------------------------------------
# 🚒 はたらくくるま・乗り物（25種類、絵文字すべて一意）
# ----------------------------------------------------
VEHICLES = [
  {
    "id": "shobo",
    "category": "vehicle",
    "nameHira": "しょうぼう",
    "nameKata": "ショウボウ",
    "charsHira": ["し", "ょ", "う", "ぼ", "う"],
    "charsKata": ["シ", "ョ", "ウ", "ボ", "ウ"],
    "emoji": "🚒",
    "soundType": "horn",
    "soundText": "ウ〜カンカン！放水！",
    "themeColor": "#ff4d6d",
    "actionType": "zoom-dash",
    "bgDecor": "💦",
    "praiseText": "しょうぼう！できたー！ウ〜〜カンカンカン！放水ー！"
  },
  {
    "id": "patoka",
    "category": "vehicle",
    "nameHira": "ぱとかー",
    "nameKata": "パトカー",
    "charsHira": ["ぱ", "と", "か", "ー"],
    "charsKata": ["パ", "ト", "カ", "ー"],
    "emoji": "🚓",
    "soundType": "horn",
    "soundText": "ウ〜〜！パトロール！",
    "themeColor": "#3a86ff",
    "actionType": "zoom-dash",
    "bgDecor": "🚨",
    "praiseText": "パトカー！できたー！ウ〜〜！パトロールしゅっぱつ！"
  },
  {
    "id": "resukyu",
    "category": "vehicle",
    "nameHira": "れすきゅー",
    "nameKata": "レスキュー",
    "charsHira": ["れ", "す", "き", "ゅ", "ー"],
    "charsKata": ["レ", "ス", "キ", "ュ", "ー"],
    "emoji": "🚑",
    "soundType": "horn",
    "soundText": "ピーポーピーポー！",
    "themeColor": "#ff758f",
    "actionType": "zoom-dash",
    "bgDecor": "🩹",
    "praiseText": "レスキュー！できたー！たすけにいくぞー！"
  },
  {
    "id": "basu",
    "category": "vehicle",
    "nameHira": "ばす",
    "nameKata": "バス",
    "charsHira": ["ば", "す"],
    "charsKata": ["バ", "ス"],
    "emoji": "🚌",
    "soundType": "vroom",
    "soundText": "ぷっぷー！乗ってね！",
    "themeColor": "#ffb703",
    "actionType": "dance-butt",
    "bgDecor": "🚏",
    "praiseText": "バス！できたー！ぷっぷー！お客さん乗せてね！"
  },
  {
    "id": "takushi",
    "category": "vehicle",
    "nameHira": "たくしー",
    "nameKata": "タクシー",
    "charsHira": ["た", "く", "し", "ー"],
    "charsKata": ["タ", "ク", "シ", "ー"],
    "emoji": "🚕",
    "soundType": "vroom",
    "soundText": "どこへ行きますか？",
    "themeColor": "#ffd166",
    "actionType": "zoom-dash",
    "bgDecor": "🚖",
    "praiseText": "タクシー！できたー！はい、どうぞ！どこへ行きますか？"
  },
  {
    "id": "torakku",
    "category": "vehicle",
    "nameHira": "とらっく",
    "nameKata": "トラック",
    "charsHira": ["と", "ら", "っ", "く"],
    "charsKata": ["ト", "ラ", "ッ", "ク"],
    "emoji": "🚚",
    "soundType": "vroom",
    "soundText": "荷物を運ぶよ！",
    "themeColor": "#06d6a0",
    "actionType": "zoom-dash",
    "bgDecor": "📦",
    "praiseText": "トラック！できたー！荷物をいっぱい運ぶよ！"
  },
  {
    "id": "danpu",
    "category": "vehicle",
    "nameHira": "だんぷ",
    "nameKata": "ダンプ",
    "charsHira": ["だ", "ん", "ぷ"],
    "charsKata": ["ダ", "ン", "プ"],
    "emoji": "🚛",
    "soundType": "vroom",
    "soundText": "荷台がガッターン！",
    "themeColor": "#fb8500",
    "actionType": "dance-butt",
    "bgDecor": "🪨",
    "praiseText": "ダンプ！できたー！荷台がガッターン！"
  },
  {
    "id": "torakuta",
    "category": "vehicle",
    "nameHira": "とらくたー",
    "nameKata": "トラクター",
    "charsHira": ["と", "ら", "く", "た", "ー"],
    "charsKata": ["ト", "ラ", "ク", "タ", "ー"],
    "emoji": "🚜",
    "soundType": "vroom",
    "soundText": "畑をたがやすよ！",
    "themeColor": "#ffbe0b",
    "actionType": "dance-butt",
    "bgDecor": "🌾",
    "praiseText": "トラクター！できたー！力持ちのトラクター！"
  },
  {
    "id": "kuren",
    "category": "vehicle",
    "nameHira": "くれーん",
    "nameKata": "クレーン",
    "charsHira": ["く", "れ", "ー", "ん"],
    "charsKata": ["ク", "レ", "ー", "ン"],
    "emoji": "🏗️",
    "soundType": "vroom",
    "soundText": "ウィーン！たかーい！",
    "themeColor": "#ff006e",
    "actionType": "super-jump",
    "bgDecor": "🧱",
    "praiseText": "クレーン！できたー！ウィーン！高く持ち上げるよ！"
  },
  {
    "id": "kisha",
    "category": "vehicle",
    "nameHira": "きしゃ",
    "nameKata": "キシャ",
    "charsHira": ["き", "し", "ゃ"],
    "charsKata": ["キ", "シ", "ャ"],
    "emoji": "🚂",
    "soundType": "vroom",
    "soundText": "シュッシュッポッポー！",
    "themeColor": "#2b2d42",
    "actionType": "zoom-dash",
    "bgDecor": "💨",
    "praiseText": "きしゃ！できたー！シュッシュッポッポー！"
  },
  {
    "id": "densha",
    "category": "vehicle",
    "nameHira": "でんしゃ",
    "nameKata": "デンシャ",
    "charsHira": ["で", "ん", "し", "ゃ"],
    "charsKata": ["デ", "ン", "シ", "ャ"],
    "emoji": "🚃",
    "soundType": "vroom",
    "soundText": "ガタゴトガタゴト！",
    "themeColor": "#52b788",
    "actionType": "zoom-dash",
    "bgDecor": "🛤️",
    "praiseText": "でんしゃ！できたー！ガタゴトガタゴト！"
  },
  {
    "id": "chikatetsu",
    "category": "vehicle",
    "nameHira": "ちかてつ",
    "nameKata": "チカテツ",
    "charsHira": ["ち", "か", "て", "つ"],
    "charsKata": ["チ", "カ", "テ", "ツ"],
    "emoji": "🚇",
    "soundType": "vroom",
    "soundText": "地下をびゅーん！",
    "themeColor": "#4895ef",
    "actionType": "zoom-dash",
    "bgDecor": "🚇",
    "praiseText": "ちかてつ！できたー！地下をびゅーんと走るよ！"
  },
  {
    "id": "hikoki",
    "category": "vehicle",
    "nameHira": "ひこうき",
    "nameKata": "ヒコウキ",
    "charsHira": ["ひ", "こ", "う", "き"],
    "charsKata": ["ヒ", "コ", "ウ", "キ"],
    "emoji": "✈️",
    "soundType": "jet",
    "soundText": "ビュイーーーッ！",
    "themeColor": "#caf0f8",
    "actionType": "zoom-dash",
    "bgDecor": "☁️",
    "praiseText": "ひこうき！できたー！キラーン！ビュイーーッ！"
  },
  {
    "id": "heri",
    "category": "vehicle",
    "nameHira": "へり",
    "nameKata": "ヘリ",
    "charsHira": ["へ", "り"],
    "charsKata": ["ヘ", "リ"],
    "emoji": "🚁",
    "soundType": "jet",
    "soundText": "パタパタ空をとぶ！",
    "themeColor": "#e76f51",
    "actionType": "high-jump",
    "bgDecor": "🌤️",
    "praiseText": "ヘリ！できたー！パタパタパタ！空をとぶよ！"
  },
  {
    "id": "roketto",
    "category": "vehicle",
    "nameHira": "ろけっと",
    "nameKata": "ロケット",
    "charsHira": ["ろ", "け", "っ", "と"],
    "charsKata": ["ロ", "ケ", "ッ", "ト"],
    "emoji": "🚀",
    "soundType": "jet",
    "soundText": "３・２・１発射！",
    "themeColor": "#ff758f",
    "actionType": "super-jump",
    "bgDecor": "⭐",
    "praiseText": "ロケット！できたー！さん、に、いち、発射〜！"
  },
  {
    "id": "fune",
    "category": "vehicle",
    "nameHira": "ふね",
    "nameKata": "フネ",
    "charsHira": ["ふ", "ね"],
    "charsKata": ["フ", "ネ"],
    "emoji": "🚢",
    "soundType": "horn",
    "soundText": "ボォーーッ！波スイスイ！",
    "themeColor": "#8ecae6",
    "actionType": "dance-butt",
    "bgDecor": "⚓",
    "praiseText": "ふね！できたー！ボォーーッ！波をスイスイ！"
  },
  {
    "id": "boto",
    "category": "vehicle",
    "nameHira": "ぼーと",
    "nameKata": "ボート",
    "charsHira": ["ぼ", "ー", "と"],
    "charsKata": ["ボ", "ー", "ト"],
    "emoji": "🚤",
    "soundType": "vroom",
    "soundText": "びゅんびゅん走る！",
    "themeColor": "#00b4d8",
    "actionType": "zoom-dash",
    "bgDecor": "🌊",
    "praiseText": "ボート！できたー！びゅんびゅん走るよ！"
  },
  {
    "id": "yotto",
    "category": "vehicle",
    "nameHira": "よっと",
    "nameKata": "ヨット",
    "charsHira": ["よ", "っ", "と"],
    "charsKata": ["ヨ", "ッ", "ト"],
    "emoji": "⛵",
    "soundType": "vroom",
    "soundText": "風にのってスイスイ！",
    "themeColor": "#90e0ef",
    "actionType": "dance-butt",
    "bgDecor": "🌬️",
    "praiseText": "ヨット！できたー！風をうけてスイスイ！"
  },
  {
    "id": "baiku",
    "category": "vehicle",
    "nameHira": "ばいく",
    "nameKata": "バイク",
    "charsHira": ["ば", "い", "く"],
    "charsKata": ["バ", "イ", "ク"],
    "emoji": "🏍️",
    "soundType": "vroom",
    "soundText": "ブルルン！はやい！",
    "themeColor": "#d90429",
    "actionType": "zoom-dash",
    "bgDecor": "🏁",
    "praiseText": "バイク！できたー！ブルルン！かっこいいね！"
  },
  {
    "id": "kuruma",
    "category": "vehicle",
    "nameHira": "くるま",
    "nameKata": "クルマ",
    "charsHira": ["く", "る", "ま"],
    "charsKata": ["ク", "ル", "マ"],
    "emoji": "🚗",
    "soundType": "vroom",
    "soundText": "ブーーン！ドライブ！",
    "themeColor": "#ef233c",
    "actionType": "zoom-dash",
    "bgDecor": "🚦",
    "praiseText": "くるま！できたー！ブッブー！おでかけしよう！"
  },
  {
    "id": "sori",
    "category": "vehicle",
    "nameHira": "そり",
    "nameKata": "ソリ",
    "charsHira": ["そ", "り"],
    "charsKata": ["ソ", "リ"],
    "emoji": "🛷",
    "soundType": "vroom",
    "soundText": "雪の上をシューッ！",
    "themeColor": "#8338ec",
    "actionType": "zoom-dash",
    "bgDecor": "❄️",
    "praiseText": "そり！できたー！雪の上をシューッ！"
  },
  {
    "id": "jipu",
    "category": "vehicle",
    "nameHira": "じーぷ",
    "nameKata": "ジープ",
    "charsHira": ["じ", "ー", "ぷ"],
    "charsKata": ["ジ", "ー", "プ"],
    "emoji": "🚙",
    "soundType": "vroom",
    "soundText": "山道もへっちゃら！",
    "themeColor": "#2b9348",
    "actionType": "jump",
    "bgDecor": "🌲",
    "praiseText": "ジープ！できたー！山道もへっちゃら！"
  },
  {
    "id": "nozomi",
    "category": "vehicle",
    "nameHira": "のぞみ",
    "nameKata": "ノゾミ",
    "charsHira": ["の", "ぞ", "み"],
    "charsKata": ["ノ", "ゾ", "ミ"],
    "emoji": "🚅",
    "soundType": "jet",
    "soundText": "新幹線ビュイーン！",
    "themeColor": "#0077b6",
    "actionType": "zoom-dash",
    "bgDecor": "🚄",
    "praiseText": "のぞみ！できたー！白い新幹線ビュイーン！"
  },
  {
    "id": "hayabusa",
    "category": "vehicle",
    "nameHira": "はやぶさ",
    "nameKata": "ハヤブサ",
    "charsHira": ["は", "や", "ぶ", "さ"],
    "charsKata": ["ハ", "ヤ", "ブ", "サ"],
    "emoji": "🚄",
    "soundType": "jet",
    "soundText": "みどり色の新幹線！",
    "themeColor": "#55a630",
    "actionType": "zoom-dash",
    "bgDecor": "⚡",
    "praiseText": "はやぶさ！できたー！緑の新幹線かっこいい！"
  },
  {
    "id": "kikyu",
    "category": "vehicle",
    "nameHira": "ききゅう",
    "nameKata": "キキュウ",
    "charsHira": ["き", "き", "ゅ", "う"],
    "charsKata": ["キ", "キ", "ュ", "ウ"],
    "emoji": "🎈",
    "soundType": "jet",
    "soundText": "ふわふわ空をとぶ！",
    "themeColor": "#e0aaff",
    "actionType": "high-jump",
    "bgDecor": "☁️",
    "praiseText": "ききゅう！できたー！ふわふわ空をとぶよ！"
  }
]

# ----------------------------------------------------
# 🐶 どうぶつ（30種類、絵文字すべて一意）
# ----------------------------------------------------
ANIMALS = [
  {"id": "buta", "nameHira": "ぶた", "nameKata": "ブタ", "charsHira": ["ぶ", "た"], "charsKata": ["ブ", "タ"], "emoji": "🐷", "soundType": "oink", "soundText": "ブヒブヒ〜♪", "themeColor": "#ffb3c6", "actionType": "dance-butt", "bgDecor": "🌸", "praiseText": "ブタさん！できたー！ブヒブヒ〜！かわいいね！"},
  {"id": "inu", "nameHira": "いぬ", "nameKata": "イヌ", "charsHira": ["い", "ぬ"], "charsKata": ["イ", "ヌ"], "emoji": "🐶", "soundType": "bark", "soundText": "ワンワン！", "themeColor": "#ffd166", "actionType": "super-jump", "bgDecor": "🦴", "praiseText": "ワンちゃん！できたー！ワンワン！しっぽフリフリ！"},
  {"id": "neko", "nameHira": "ねこ", "nameKata": "ネコ", "charsHira": ["ね", "こ"], "charsKata": ["ネ", "コ"], "emoji": "🐱", "soundType": "meow", "soundText": "ニャオ〜ン♪", "themeColor": "#f8edeb", "actionType": "spin", "bgDecor": "🐟", "praiseText": "ネコちゃん！できたー！ニャオ〜ン！ごろごろにゃん！"},
  {"id": "ushi", "nameHira": "うし", "nameKata": "ウシ", "charsHira": ["う", "し"], "charsKata": ["ウ", "シ"], "emoji": "🐮", "soundType": "moo", "soundText": "モ〜〜〜ッ！", "themeColor": "#e9ecef", "actionType": "dance-butt", "bgDecor": "🥛", "praiseText": "ウシさん！できたー！モ〜〜〜！ミルクいっぱい！"},
  {"id": "kaeru", "nameHira": "かえる", "nameKata": "カエル", "charsHira": ["か", "え", "る"], "charsKata": ["カ", "エ", "ル"], "emoji": "🐸", "soundType": "ribbit", "soundText": "ケロケロ〜！", "themeColor": "#52b788", "actionType": "high-jump", "bgDecor": "💧", "praiseText": "カエルさん！できたー！ケロケロピョンピョン！"},
  {"id": "panda", "nameHira": "ぱんだ", "nameKata": "パンダ", "charsHira": ["ぱ", "ん", "だ"], "charsKata": ["パ", "ン", "ダ"], "emoji": "🐼", "soundType": "squeak", "soundText": "笹おいしいな〜", "themeColor": "#ced4da", "actionType": "dance-butt", "bgDecor": "🎋", "praiseText": "パンダさん！できたー！笹の葉モグモグ！"},
  {"id": "lion", "nameHira": "らいおん", "nameKata": "ライオン", "charsHira": ["ら", "い", "お", "ん"], "charsKata": ["ラ", "イ", "オ", "ン"], "emoji": "🦁", "soundType": "roar", "soundText": "ガオオオーッ！", "themeColor": "#f39c12", "actionType": "super-jump", "bgDecor": "👑", "praiseText": "ライオン！できたー！百獣の王、ガオー！"},
  {"id": "tora", "nameHira": "とら", "nameKata": "トラ", "charsHira": ["と", "ら"], "charsKata": ["ト", "ラ"], "emoji": "🐯", "soundType": "roar", "soundText": "ガオッ！しましま！", "themeColor": "#e67e22", "actionType": "super-jump", "bgDecor": "🐾", "praiseText": "トラさん！できたー！かっこいいシマシマ！"},
  {"id": "zou", "nameHira": "ぞう", "nameKata": "ゾウ", "charsHira": ["ぞ", "う"], "charsKata": ["ゾ", "ウ"], "emoji": "🐘", "soundType": "trumpet", "soundText": "パオオーーン！", "themeColor": "#95a5a6", "actionType": "super-jump", "bgDecor": "🎪", "praiseText": "ゾウさん！できたー！お鼻が長ーい！パオーン！"},
  {"id": "saru", "nameHira": "さる", "nameKata": "サル", "charsHira": ["さ", "る"], "charsKata": ["サ", "ル"], "emoji": "🐵", "soundType": "chatter", "soundText": "ウキキキッ！", "themeColor": "#d35400", "actionType": "high-jump", "bgDecor": "🍌", "praiseText": "おサルさん！できたー！ウキキキッ！バナナ大好き！"},
  {"id": "kuma", "nameHira": "くま", "nameKata": "クマ", "charsHira": ["く", "ま"], "charsKata": ["ク", "マ"], "emoji": "🐻", "soundType": "growl", "soundText": "クマー！はちみつ！", "themeColor": "#795548", "actionType": "dance-butt", "bgDecor": "🍯", "praiseText": "クマさん！できたー！はちみつ大好き！"},
  {"id": "usagi", "nameHira": "うさぎ", "nameKata": "ウサギ", "charsHira": ["う", "さ", "ぎ"], "charsKata": ["ウ", "サ", "ギ"], "emoji": "🐰", "soundType": "squeak", "soundText": "ぴょんぴょん！", "themeColor": "#ffcbf2", "actionType": "high-jump", "bgDecor": "🥕", "praiseText": "うさぎさん！できたー！お耳がながーい！ぴょんぴょん！"},
  {"id": "tori", "nameHira": "とり", "nameKata": "トリ", "charsHira": ["と", "り"], "charsKata": ["ト", "リ"], "emoji": "🐦", "soundType": "chirp", "soundText": "ピピッ！パタパタ！", "themeColor": "#48cae4", "actionType": "high-jump", "bgDecor": "🌿", "praiseText": "小鳥さん！できたー！ピピピッと歌うよ！"},
  {"id": "uma", "nameHira": "うま", "nameKata": "ウマ", "charsHira": ["う", "ま"], "charsKata": ["ウ", "マ"], "emoji": "🐴", "soundType": "neigh", "soundText": "ヒヒーン！パッカパッカ！", "themeColor": "#a0522d", "actionType": "zoom-dash", "bgDecor": "🌾", "praiseText": "お馬さん！できたー！ヒヒーン！パッカパッカ！"},
  {"id": "kirin", "nameHira": "きりん", "nameKata": "キリン", "charsHira": ["き", "り", "ん"], "charsKata": ["キ", "リ", "ン"], "emoji": "🦒", "soundType": "squeak", "soundText": "首がたかーい！", "themeColor": "#ffb703", "actionType": "super-jump", "bgDecor": "🍃", "praiseText": "キリンさん！できたー！首が長ーい！背が高いね！"},
  {"id": "wani", "nameHira": "わに", "nameKata": "ワニ", "charsHira": ["わ", "に"], "charsKata": ["ワ", "ニ"], "emoji": "🐊", "soundType": "snap", "soundText": "ガブガブッ！", "themeColor": "#2d6a4f", "actionType": "dance-butt", "bgDecor": "🌊", "praiseText": "ワニさん！できたー！おおきなお口でガブッ！"},
  {"id": "shika", "nameHira": "しか", "nameKata": "シカ", "charsHira": ["し", "か"], "charsKata": ["シ", "カ"], "emoji": "🦌", "soundType": "squeak", "soundText": "ピョンピョン走る！", "themeColor": "#bc6c25", "actionType": "high-jump", "bgDecor": "🍁", "praiseText": "シカさん！できたー！きれいなツノがあるね！"},
  {"id": "risu", "nameHira": "りす", "nameKata": "リス", "charsHira": ["り", "す"], "charsKata": ["リ", "ス"], "emoji": "🐿️", "soundType": "squeak", "soundText": "どんぐりカリカリ！", "themeColor": "#dda15e", "actionType": "spin", "bgDecor": "🌰", "praiseText": "リスさん！できたー！どんぐりカリカリ！"},
  {"id": "hitsuji", "nameHira": "ひつじ", "nameKata": "ヒツジ", "charsHira": ["ひ", "つ", "じ"], "charsKata": ["ヒ", "ツ", "ジ"], "emoji": "🐑", "soundType": "baa", "soundText": "メェ〜〜メェ〜〜", "themeColor": "#f8f9fa", "actionType": "dance-butt", "bgDecor": "☁️", "praiseText": "ヒツジさん！できたー！もこもこメェ〜！"},
  {"id": "yagi", "nameHira": "やぎ", "nameKata": "ヤギ", "charsHira": ["や", "ぎ"], "charsKata": ["ヤ", "ギ"], "emoji": "🐐", "soundType": "baa", "soundText": "メェ〜！お手紙モグモグ", "themeColor": "#e9ecef", "actionType": "jump", "bgDecor": "📜", "praiseText": "ヤギさん！できたー！高いところもピョンピョン！"},
  {"id": "koara", "nameHira": "こあら", "nameKata": "コアラ", "charsHira": ["こ", "あ", "ら"], "charsKata": ["コ", "ア", "ラ"], "emoji": "🐨", "soundType": "squeak", "soundText": "木にギューッ！", "themeColor": "#adb5bd", "actionType": "dance-butt", "bgDecor": "🐨", "praiseText": "コアラさん！できたー！ユーカリの葉っぱ大好き！"},
  {"id": "gorira", "nameHira": "ごりら", "nameKata": "ゴリラ", "charsHira": ["ご", "り", "ら"], "charsKata": ["ゴ", "リ", "ラ"], "emoji": "🦍", "soundType": "growl", "soundText": "ウホウホ！ドラミング！", "themeColor": "#343a40", "actionType": "super-jump", "bgDecor": "💪", "praiseText": "ゴリラさん！できたー！ウホウホ！胸をトントン！"},
  {"id": "sai", "nameHira": "さい", "nameKata": "サイ", "charsHira": ["さ", "い"], "charsKata": ["サ", "イ"], "emoji": "🦏", "soundType": "growl", "soundText": "ツノがかっこいい！", "themeColor": "#6c757d", "actionType": "zoom-dash", "bgDecor": "🛡️", "praiseText": "サイさん！できたー！つよいツノがあるね！"},
  {"id": "kaba", "nameHira": "かば", "nameKata": "カバ", "charsHira": ["か", "ば"], "charsKata": ["カ", "バ"], "emoji": "🦛", "soundType": "growl", "soundText": "大あくび！ア〜ン！", "themeColor": "#495057", "actionType": "dance-butt", "bgDecor": "💦", "praiseText": "カバさん！できたー！おおきなお口をアーン！"},
  {"id": "rakuda", "nameHira": "らくだ", "nameKata": "ラクダ", "charsHira": ["ら", "く", "だ"], "charsKata": ["ラ", "ク", "ダ"], "emoji": "🐪", "soundType": "growl", "soundText": "コブがポコッ！", "themeColor": "#d4a373", "actionType": "dance-butt", "bgDecor": "🏜️", "praiseText": "ラクダさん！できたー！お背中にコブがあるね！"},
  {"id": "kitsune", "nameHira": "きつね", "nameKata": "キツネ", "charsHira": ["き", "つ", "ね"], "charsKata": ["キ", "ツ", "ネ"], "emoji": "🦊", "soundType": "bark", "soundText": "コンコン♪", "themeColor": "#f77f00", "actionType": "spin", "bgDecor": "🌾", "praiseText": "キツネさん！できたー！コンコン！お耳がピン！"},
  {"id": "penguin", "nameHira": "ぺんぎん", "nameKata": "ペンギン", "charsHira": ["ぺ", "ん", "ぎ", "ん"], "charsKata": ["ペ", "ン", "ギ", "ン"], "emoji": "🐧", "soundType": "chirp", "soundText": "ヨチヨチ歩き！", "themeColor": "#003049", "actionType": "dance-butt", "bgDecor": "🧊", "praiseText": "ペンギンさん！できたー！よちよち歩きがかわいい！"},
  {"id": "iruka", "nameHira": "いるか", "nameKata": "イルカ", "charsHira": ["い", "る", "か"], "charsKata": ["イ", "ル", "カ"], "emoji": "🐬", "soundType": "whistle", "soundText": "キュイ〜ン！ジャンプ！", "themeColor": "#48cae4", "actionType": "high-jump", "bgDecor": "🌊", "praiseText": "イルカさん！できたー！海をスイスイ大ジャンプ！"},
  {"id": "kujira", "nameHira": "くじら", "nameKata": "クジラ", "charsHira": ["く", "じ", "ら"], "charsKata": ["ク", "ジ", "ラ"], "emoji": "🐳", "soundType": "horn", "soundText": "プシューッ！潮吹き！", "themeColor": "#0077b6", "actionType": "super-jump", "bgDecor": "💦", "praiseText": "クジラさん！できたー！潮をプシューッ！大きいね！"},
  {"id": "same", "nameHira": "さめ", "nameKata": "サメ", "charsHira": ["さ", "め"], "charsKata": ["サ", "メ"], "emoji": "🦈", "soundType": "growl", "soundText": "するどい歯！スイスイ！", "themeColor": "#1d3557", "actionType": "zoom-dash", "bgDecor": "🌊", "praiseText": "サメさん！できたー！かっこいいヒレでスイスイ！"}
]

# ----------------------------------------------------
# 🍎 たべもの・しぜん（20種類、絵文字すべて一意）
# ----------------------------------------------------
FOODS = [
  {"id": "ringo", "nameHira": "りんご", "nameKata": "リンゴ", "charsHira": ["り", "ん", "ご"], "charsKata": ["リ", "ン", "ゴ"], "emoji": "🍎", "soundType": "cheer", "soundText": "シャキシャキ甘い！", "themeColor": "#ff4d6d", "actionType": "jump", "bgDecor": "🍏", "praiseText": "りんご！できたー！あかくて甘いりんご！"},
  {"id": "mikan", "nameHira": "みかん", "nameKata": "ミカン", "charsHira": ["み", "か", "ん"], "charsKata": ["ミ", "カ", "ン"], "emoji": "🍊", "soundType": "cheer", "soundText": "ジューシーおいしい！", "themeColor": "#ff9e00", "actionType": "jump", "bgDecor": "🍊", "praiseText": "みかん！できたー！オレンジ色でおいしいね！"},
  {"id": "banana", "nameHira": "ばなな", "nameKata": "バナナ", "charsHira": ["ば", "な", "な"], "charsKata": ["バ", "ナ", "ナ"], "emoji": "🍌", "soundType": "cheer", "soundText": "もぐもぐあまい！", "themeColor": "#ffd166", "actionType": "dance-butt", "bgDecor": "🍌", "praiseText": "バナナ！できたー！あまーいバナナ！"},
  {"id": "suika", "nameHira": "すいか", "nameKata": "スイカ", "charsHira": ["す", "い", "か"], "charsKata": ["ス", "イ", "カ"], "emoji": "🍉", "soundType": "cheer", "soundText": "夏はすいか！シャキッ！", "themeColor": "#06d6a0", "actionType": "jump", "bgDecor": "🍉", "praiseText": "スイカ！できたー！シャキシャキおいしい！"},
  {"id": "budo", "nameHira": "ぶどう", "nameKata": "ブドウ", "charsHira": ["ぶ", "ど", "う"], "charsKata": ["ブ", "ド", "ウ"], "emoji": "🍇", "soundType": "cheer", "soundText": "つぶつぶジューシー！", "themeColor": "#7209b7", "actionType": "spin", "bgDecor": "🍇", "praiseText": "ぶどう！できたー！紫のつぶつぶ！"},
  {"id": "ichigo", "nameHira": "いちご", "nameKata": "イチゴ", "charsHira": ["い", "ち", "ご"], "charsKata": ["イ", "チ", "ゴ"], "emoji": "🍓", "soundType": "cheer", "soundText": "あまくておいしい！", "themeColor": "#e63946", "actionType": "jump", "bgDecor": "🍓", "praiseText": "いちご！できたー！あまくておいしいね！"},
  {"id": "meron", "nameHira": "めろん", "nameKata": "メロン", "charsHira": ["め", "ろ", "ん"], "charsKata": ["メ", "ロ", "ン"], "emoji": "🍈", "soundType": "cheer", "soundText": "あみあみ高級メロン！", "themeColor": "#99d98c", "actionType": "jump", "bgDecor": "🍈", "praiseText": "メロン！できたー！あまーい高級メロン！"},
  {"id": "tomato", "nameHira": "とまと", "nameKata": "トマト", "charsHira": ["と", "ま", "と"], "charsKata": ["ト", "マ", "ト"], "emoji": "🍅", "soundType": "cheer", "soundText": "真っ赤なトマト！", "themeColor": "#ef233c", "actionType": "jump", "bgDecor": "🍅", "praiseText": "トマト！できたー！真っ赤でおいしい！"},
  {"id": "pan", "nameHira": "ぱん", "nameKata": "パン", "charsHira": ["ぱ", "ん"], "charsKata": ["パ", "ン"], "emoji": "🍞", "soundType": "cheer", "soundText": "焼きたてふかふか！", "themeColor": "#f4a261", "actionType": "jump", "bgDecor": "🥐", "praiseText": "パン！できたー！ふかふかでおいしいね！"},
  {"id": "keki", "nameHira": "けーき", "nameKata": "ケーキ", "charsHira": ["け", "ー", "き"], "charsKata": ["ケ", "ー", "キ"], "emoji": "🎂", "soundType": "cheer", "soundText": "ハッピーバースデー！", "themeColor": "#ffb4a2", "actionType": "super-jump", "bgDecor": "🎉", "praiseText": "ケーキ！できたー！あまーいお祝いケーキ！"},
  {"id": "aisu", "nameHira": "あいす", "nameKata": "アイス", "charsHira": ["あ", "い", "す"], "charsKata": ["ア", "イ", "ス"], "emoji": "🍨", "soundType": "cheer", "soundText": "つめたくておいしい！", "themeColor": "#a2d2ff", "actionType": "spin", "bgDecor": "🍦", "praiseText": "アイス！できたー！つめたくておいしいね！"},
  {"id": "purin", "nameHira": "ぷりん", "nameKata": "プリン", "charsHira": ["ぷ", "り", "ん"], "charsKata": ["プ", "リ", "ン"], "emoji": "🍮", "soundType": "cheer", "soundText": "ぷるぷるおいしい！", "themeColor": "#ffe3a0", "actionType": "dance-butt", "bgDecor": "🍮", "praiseText": "プリン！できたー！ぷるぷるプリン！"},
  {"id": "ame", "nameHira": "あめ", "nameKata": "アメ", "charsHira": ["あ", "め"], "charsKata": ["ア", "メ"], "emoji": "🍬", "soundType": "cheer", "soundText": "あまーいキャンディ！", "themeColor": "#ffc6ff", "actionType": "jump", "bgDecor": "🍭", "praiseText": "あめ！できたー！あまーいキャンディ！"},
  {"id": "onigiri", "nameHira": "おにぎり", "nameKata": "オニギリ", "charsHira": ["お", "に", "ぎ", "り"], "charsKata": ["オ", "ニ", "ギ", "リ"], "emoji": "🍙", "soundType": "cheer", "soundText": "もぐもぐおいしい！", "themeColor": "#f8f9fa", "actionType": "jump", "bgDecor": "🍙", "praiseText": "おにぎり！できたー！もぐもぐおいしいね！"},
  {"id": "sushi", "nameHira": "すし", "nameKata": "スシ", "charsHira": ["す", "し"], "charsKata": ["ス", "シ"], "emoji": "🍣", "soundType": "cheer", "soundText": "へい、おまち！", "themeColor": "#f72585", "actionType": "jump", "bgDecor": "🍣", "praiseText": "すし！できたー！へい、おまち！"},
  {"id": "kare", "nameHira": "かれー", "nameKata": "カレー", "charsHira": ["か", "れ", "ー"], "charsKata": ["カ", "レ", "ー"], "emoji": "🍛", "soundType": "cheer", "soundText": "おいしいカレーライス！", "themeColor": "#e76f51", "actionType": "jump", "bgDecor": "🍛", "praiseText": "カレー！できたー！おいしいカレーライス！"},
  {"id": "tsuki", "nameHira": "つき", "nameKata": "ツキ", "charsHira": ["つ", "き"], "charsKata": ["ツ", "キ"], "emoji": "🌙", "soundType": "cheer", "soundText": "お月さま、ピカピカ！", "themeColor": "#ffd166", "actionType": "spin", "bgDecor": "✨", "praiseText": "つき！できたー！お月さま、ピカピカ！"},
  {"id": "hoshi", "nameHira": "ほし", "nameKata": "ホシ", "charsHira": ["ほ", "し"], "charsKata": ["ホ", "シ"], "emoji": "⭐", "soundType": "cheer", "soundText": "きらきらお星さま！", "themeColor": "#ffbe0b", "actionType": "super-jump", "bgDecor": "🌟", "praiseText": "ほし！できたー！きらきらお星さま！"},
  {"id": "niji", "nameHira": "にじ", "nameKata": "ニジ", "charsHira": ["に", "じ"], "charsKata": ["ニ", "ジ"], "emoji": "🌈", "soundType": "cheer", "soundText": "きれいな七色の虹！", "themeColor": "#b5179e", "actionType": "super-jump", "bgDecor": "☀️", "praiseText": "にじ！できたー！きれいな七色の虹！"},
  {"id": "taiyo", "nameHira": "たいよう", "nameKata": "タイヨウ", "charsHira": ["た", "い", "よ", "う"], "charsKata": ["タ", "イ", "ヨ", "ウ"], "emoji": "☀️", "soundType": "cheer", "soundText": "ポカポカお日さま！", "themeColor": "#f77f00", "actionType": "spin", "bgDecor": "✨", "praiseText": "たいよう！できたー！ポカポカお日さま！"}
]

# 全データをまとめる
for item in ANIMALS:
  item["category"] = "animal"
for item in FOODS:
  item["category"] = "food"

ALL_ITEMS = VEHICLES + ANIMALS + FOODS

async def main():
  print(f"Total clean items: {len(ALL_ITEMS)}")
  
  # 絵文字重複チェック
  emojis = [x["emoji"] for x in ALL_ITEMS]
  from collections import Counter
  counts = Counter(emojis)
  dups = {k: v for k, v in counts.items() if v > 1}
  if dups:
    print("ERROR: Duplicate emojis found!", dups)
    for x in ALL_ITEMS:
      if x["emoji"] in dups:
        print(f"  {x['id']} ({x['nameHira']}): {x['emoji']}")
    return
  else:
    print("SUCCESS: All emojis are 100% unique!")

  # 音声生成（不足分）
  VOICE = "ja-JP-NanamiNeural"
  os.makedirs('audio/neural/praises', exist_ok=True)
  os.makedirs('audio/neural/letters', exist_ok=True)

  for item in ALL_ITEMS:
    out = f"audio/neural/praises/{item['id']}.mp3"
    if not os.path.exists(out):
      print(f"Generating praise audio for {item['id']}: {item['praiseText']}")
      comm = edge_tts.Communicate(item["praiseText"], VOICE)
      await comm.save(out)

  # js/data.js 生成
  js_chars = []
  for item in ALL_ITEMS:
    clean_dict = {
      "id": item["id"],
      "category": item["category"],
      "nameHira": item["nameHira"],
      "nameKata": item["nameKata"],
      "charsHira": item["charsHira"],
      "charsKata": item["charsKata"],
      "emoji": item["emoji"],
      "soundType": item["soundType"],
      "soundText": item["soundText"],
      "themeColor": item["themeColor"],
      "actionType": item["actionType"],
      "bgDecor": item["bgDecor"]
    }
    js_chars.append(clean_dict)

  # 50音表（AIUEO_DATA）を維持
  with open("js/data.js", "r", encoding="utf-8") as f:
    orig_content = f.read()

  # AIUEO_DATA の部分を取り出す
  aiueo_idx = orig_content.find("const AIUEO_DATA =")
  if aiueo_idx != -1:
    aiueo_part = orig_content[aiueo_idx:]
  else:
    aiueo_part = ""

  new_js = "// 4歳児向け知育ゲーム データ集（くるま・どうぶつ・たべもの 全75種類）\n\n"
  new_js += "// 1. 「うごく！文字あつめ」データ（全75種類：絵文字すべて一意・恐竜削除済み）\n"
  new_js += "const CHARACTERS_DATA = " + json.dumps(js_chars, ensure_ascii=False, indent=2) + ";\n\n"
  new_js += aiueo_part

  with open("js/data.js", "w", encoding="utf-8") as f:
    f.write(new_js)

  print("Updated js/data.js successfully!")

if __name__ == "__main__":
  asyncio.run(main())
