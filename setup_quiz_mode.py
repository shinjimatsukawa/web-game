# -*- coding: utf-8 -*-
"""
出題クイズ音声（audio/neural/questions/{id}.mp3）と
短縮版の正解褒め音声（audio/neural/praises/{id}.mp3）を生成し、
js/data.js に questionText を追加するスクリプト
"""
import os
import json
import asyncio
import edge_tts

VOICE = "ja-JP-NanamiNeural"

ITEMS = [
  # ----------------------------------------------------
  # 🚒 はたらくくるま・乗り物（25種類）
  # ----------------------------------------------------
  {
    "id": "shobo", "category": "vehicle", "nameHira": "しょうぼうしゃ", "nameKata": "ショウボウシャ",
    "charsHira": ["し", "ょ", "う", "ぼ", "う", "し", "ゃ"], "charsKata": ["シ", "ョ", "ウ", "ボ", "ウ", "シ", "ャ"],
    "emoji": "🚒", "soundType": "horn", "soundText": "ウ〜カンカン！放水！", "themeColor": "#ff4d6d", "actionType": "zoom-dash", "bgDecor": "💦",
    "questionText": "ウ〜カンカン！火をけす この くるまは？",
    "praiseText": "せいかい！しょうぼうしゃ！すごーい！"
  },
  {
    "id": "patoka", "category": "vehicle", "nameHira": "ぱとかー", "nameKata": "パトカー",
    "charsHira": ["ぱ", "と", "か", "ー"], "charsKata": ["パ", "ト", "カ", "ー"],
    "emoji": "🚓", "soundType": "horn", "soundText": "ウ〜〜！パトロール！", "themeColor": "#3a86ff", "actionType": "zoom-dash", "bgDecor": "🚨",
    "questionText": "パトロールしゅっぱつ！この くるまは？",
    "praiseText": "せいかい！パトカー！すごーい！"
  },
  {
    "id": "kyukyusha", "category": "vehicle", "nameHira": "きゅうきゅうしゃ", "nameKata": "キュウキュウシャ",
    "charsHira": ["き", "ゅ", "う", "き", "ゅ", "う", "し", "ゃ"], "charsKata": ["キ", "ュ", "ウ", "キ", "ュ", "ウ", "シ", "ャ"],
    "emoji": "🚑", "soundType": "horn", "soundText": "ピーポーピーポー！", "themeColor": "#ff758f", "actionType": "zoom-dash", "bgDecor": "🩹",
    "questionText": "ピーポーピーポー！病院へ急ぐ この くるまは？",
    "praiseText": "せいかい！きゅうきゅうしゃ！すごーい！"
  },
  {
    "id": "basu", "category": "vehicle", "nameHira": "ばす", "nameKata": "バス",
    "charsHira": ["ば", "す"], "charsKata": ["バ", "ス"],
    "emoji": "🚌", "soundType": "vroom", "soundText": "ぷっぷー！乗ってね！", "themeColor": "#ffb703", "actionType": "dance-butt", "bgDecor": "🚏",
    "questionText": "ぷっぷー！みんなを乗せる この くるまは？",
    "praiseText": "せいかい！バス！すごーい！"
  },
  {
    "id": "takushi", "category": "vehicle", "nameHira": "たくしー", "nameKata": "タクシー",
    "charsHira": ["た", "く", "し", "ー"], "charsKata": ["タ", "ク", "シ", "ー"],
    "emoji": "🚕", "soundType": "vroom", "soundText": "どこへ行きますか？", "themeColor": "#ffd166", "actionType": "zoom-dash", "bgDecor": "🚖",
    "questionText": "どこへ行きますか？この くるまは？",
    "praiseText": "せいかい！タクシー！すごーい！"
  },
  {
    "id": "torakku", "category": "vehicle", "nameHira": "とらっく", "nameKata": "トラック",
    "charsHira": ["と", "ら", "っ", "く"], "charsKata": ["ト", "ラ", "ッ", "ク"],
    "emoji": "🚚", "soundType": "vroom", "soundText": "荷物を運ぶよ！", "themeColor": "#06d6a0", "actionType": "zoom-dash", "bgDecor": "📦",
    "questionText": "お荷物をいっぱい積んで運ぶ この くるまは？",
    "praiseText": "せいかい！トラック！すごーい！"
  },
  {
    "id": "danpu", "category": "vehicle", "nameHira": "だんぷかー", "nameKata": "ダンプカー",
    "charsHira": ["だ", "ん", "ぷ", "か", "ー"], "charsKata": ["ダ", "ン", "プ", "カ", "ー"],
    "emoji": "🚛", "soundType": "vroom", "soundText": "荷台がガッターン！", "themeColor": "#fb8500", "actionType": "dance-butt", "bgDecor": "🪨",
    "questionText": "荷台を上げて土をザーッと落とす この くるまは？",
    "praiseText": "せいかい！ダンプカー！すごーい！"
  },
  {
    "id": "torakuta", "category": "vehicle", "nameHira": "とらくたー", "nameKata": "トラクター",
    "charsHira": ["と", "ら", "く", "た", "ー"], "charsKata": ["ト", "ラ", "ク", "タ", "ー"],
    "emoji": "🚜", "soundType": "vroom", "soundText": "畑をたがやすよ！", "themeColor": "#ffbe0b", "actionType": "dance-butt", "bgDecor": "🌾",
    "questionText": "畑をたがやす 力持ちの この くるまは？",
    "praiseText": "せいかい！トラクター！すごーい！"
  },
  {
    "id": "kuren", "category": "vehicle", "nameHira": "くれーんしゃ", "nameKata": "クレーンシャ",
    "charsHira": ["く", "れ", "ー", "ん", "し", "ゃ"], "charsKata": ["ク", "レ", "ー", "ン", "シ", "ャ"],
    "emoji": "🏗️", "soundType": "vroom", "soundText": "ウィーン！たかーい！", "themeColor": "#ff006e", "actionType": "super-jump", "bgDecor": "🧱",
    "questionText": "重いものを高く持ち上げる この 工事の くるまは？",
    "praiseText": "せいかい！クレーン車！すごーい！"
  },
  {
    "id": "kisha", "category": "vehicle", "nameHira": "きしゃ", "nameKata": "キシャ",
    "charsHira": ["き", "し", "ゃ"], "charsKata": ["キ", "シ", "ャ"],
    "emoji": "🚂", "soundType": "vroom", "soundText": "シュッシュッポッポー！", "themeColor": "#2b2d42", "actionType": "zoom-dash", "bgDecor": "💨",
    "questionText": "シュッシュッポッポー！煙を出す この 乗り物は？",
    "praiseText": "せいかい！きしゃ！すごーい！"
  },
  {
    "id": "densha", "category": "vehicle", "nameHira": "でんしゃ", "nameKata": "デンシャ",
    "charsHira": ["で", "ん", "し", "ゃ"], "charsKata": ["デ", "ン", "シ", "ャ"],
    "emoji": "🚃", "soundType": "vroom", "soundText": "ガタゴトガタゴト！", "themeColor": "#52b788", "actionType": "zoom-dash", "bgDecor": "🛤️",
    "questionText": "線路をガタゴト走る この 乗り物は？",
    "praiseText": "せいかい！でんしゃ！すごーい！"
  },
  {
  {
    "id": "hikoki", "category": "vehicle", "nameHira": "ひこうき", "nameKata": "ヒコウキ",
    "charsHira": ["ひ", "こ", "う", "き"], "charsKata": ["ヒ", "コ", "ウ", "キ"],
    "emoji": "✈️", "soundType": "jet", "soundText": "ビュイーーーッ！", "themeColor": "#caf0f8", "actionType": "zoom-dash", "bgDecor": "☁️",
    "questionText": "お空をビュイーーッ！この 乗り物は？",
    "praiseText": "せいかい！ひこうき！すごーい！"
  },
  {
    "id": "heri", "category": "vehicle", "nameHira": "へり", "nameKata": "ヘリ",
    "charsHira": ["へ", "り"], "charsKata": ["ヘ", "リ"],
    "emoji": "🚁", "soundType": "jet", "soundText": "パタパタ空をとぶ！", "themeColor": "#e76f51", "actionType": "high-jump", "bgDecor": "🌤️",
    "questionText": "プロペラパタパタ！この 乗り物は？",
    "praiseText": "せいかい！ヘリコプター！すごーい！"
  },
  {
    "id": "roketto", "category": "vehicle", "nameHira": "ろけっと", "nameKata": "ロケット",
    "charsHira": ["ろ", "け", "っ", "と"], "charsKata": ["ロ", "ケ", "ッ", "ト"],
    "emoji": "🚀", "soundType": "jet", "soundText": "３・２・１発射！", "themeColor": "#ff758f", "actionType": "super-jump", "bgDecor": "⭐",
    "questionText": "３・２・１発射！宇宙へ行く この 乗り物は？",
    "praiseText": "せいかい！ロケット！すごーい！"
  },
  {
    "id": "fune", "category": "vehicle", "nameHira": "ふね", "nameKata": "フネ",
    "charsHira": ["ふ", "ね"], "charsKata": ["フ", "ネ"],
    "emoji": "🚢", "soundType": "horn", "soundText": "ボォーーッ！波スイスイ！", "themeColor": "#8ecae6", "actionType": "dance-butt", "bgDecor": "⚓",
    "questionText": "ボォーーッ！海をスイスイ進む この 乗り物は？",
    "praiseText": "せいかい！ふね！すごーい！"
  },
  {
    "id": "boto", "category": "vehicle", "nameHira": "ぼーと", "nameKata": "ボート",
    "charsHira": ["ぼ", "ー", "と"], "charsKata": ["ボ", "ー", "ト"],
    "emoji": "🚤", "soundType": "vroom", "soundText": "びゅんびゅん走る！", "themeColor": "#00b4d8", "actionType": "zoom-dash", "bgDecor": "🌊",
    "questionText": "波をビュンビュン走る この 乗り物は？",
    "praiseText": "せいかい！ボート！すごーい！"
  },
  {
    "id": "yotto", "category": "vehicle", "nameHira": "よっと", "nameKata": "ヨット",
    "charsHira": ["よ", "っ", "と"], "charsKata": ["ヨ", "ッ", "ト"],
    "emoji": "⛵", "soundType": "vroom", "soundText": "風にのってスイスイ！", "themeColor": "#90e0ef", "actionType": "dance-butt", "bgDecor": "🌬️",
    "questionText": "風をうけてスイスイ進む この 乗り物は？",
    "praiseText": "せいかい！ヨット！すごーい！"
  },
  {
    "id": "baiku", "category": "vehicle", "nameHira": "ばいく", "nameKata": "バイク",
    "charsHira": ["ば", "い", "く"], "charsKata": ["バ", "イ", "ク"],
    "emoji": "🏍️", "soundType": "vroom", "soundText": "ブルルン！はやい！", "themeColor": "#d90429", "actionType": "zoom-dash", "bgDecor": "🏁",
    "questionText": "ブルルン！２つのタイヤの この 乗り物は？",
    "praiseText": "せいかい！バイク！すごーい！"
  },
  {
    "id": "kuruma", "category": "vehicle", "nameHira": "くるま", "nameKata": "クルマ",
    "charsHira": ["く", "る", "ま"], "charsKata": ["ク", "ル", "マ"],
    "emoji": "🚗", "soundType": "vroom", "soundText": "ブーーン！ドライブ！", "themeColor": "#ef233c", "actionType": "zoom-dash", "bgDecor": "🚦",
    "questionText": "タイヤが４つで ブーーンと走る この 乗り物は？",
    "praiseText": "せいかい！くるま！すごーい！"
  },
  {
    "id": "sori", "category": "vehicle", "nameHira": "そり", "nameKata": "ソリ",
    "charsHira": ["そ", "り"], "charsKata": ["ソ", "リ"],
    "emoji": "🛷", "soundType": "vroom", "soundText": "雪の上をシューッ！", "themeColor": "#8338ec", "actionType": "zoom-dash", "bgDecor": "❄️",
    "questionText": "雪の上をシューッ！この 乗り物は？",
    "praiseText": "せいかい！そり！すごーい！"
  },
  {
    "id": "jitensha", "category": "vehicle", "nameHira": "じてんしゃ", "nameKata": "ジテンシャ",
    "charsHira": ["じ", "て", "ん", "し", "ゃ"], "charsKata": ["ジ", "テ", "ン", "シ", "ャ"],
    "emoji": "🚲", "soundType": "vroom", "soundText": "チリンチリン！", "themeColor": "#2b9348", "actionType": "zoom-dash", "bgDecor": "🔔",
    "questionText": "チリンチリン！ペダルをこぐ この 乗り物は？",
    "praiseText": "せいかい！じてんしゃ！すごーい！"
  },
  {
    "id": "shinkansen", "category": "vehicle", "nameHira": "しんかんせん", "nameKata": "シンカンセン",
    "charsHira": ["し", "ん", "か", "ん", "せ", "ん"], "charsKata": ["シ", "ン", "カ", "ン", "セ", "ン"],
    "emoji": "🚅", "soundType": "jet", "soundText": "新幹線ビュイーン！", "themeColor": "#0077b6", "actionType": "zoom-dash", "bgDecor": "🚄",
    "questionText": "白くて速い！線路をビュンビュン走る この 乗り物は？",
    "praiseText": "せいかい！しんかんせん！すごーい！"
  },
  {
  {
    "id": "kikyu", "category": "vehicle", "nameHira": "ききゅう", "nameKata": "キキュウ",
    "charsHira": ["き", "き", "ゅ", "う"], "charsKata": ["キ", "キ", "ュ", "ウ"],
    "emoji": "🎈", "soundType": "jet", "soundText": "ふわふわ空をとぶ！", "themeColor": "#e0aaff", "actionType": "high-jump", "bgDecor": "☁️",
    "questionText": "ふわふわお空をとぶ この 乗り物は？",
    "praiseText": "せいかい！ききゅう！すごーい！"
  },

  # ----------------------------------------------------
  # 🐶 どうぶつ（30種類）
  # ----------------------------------------------------
  {
    "id": "buta", "category": "animal", "nameHira": "ぶた", "nameKata": "ブタ",
    "charsHira": ["ぶ", "た"], "charsKata": ["ブ", "タ"],
    "emoji": "🐷", "soundType": "oink", "soundText": "ブヒブヒ〜♪", "themeColor": "#ffb3c6", "actionType": "dance-butt", "bgDecor": "🌸",
    "questionText": "ブヒブヒお鼻の この どうぶつは？",
    "praiseText": "せいかい！ブタさん！すごーい！"
  },
  {
    "id": "inu", "category": "animal", "nameHira": "いぬ", "nameKata": "イヌ",
    "charsHira": ["い", "ぬ"], "charsKata": ["イ", "ヌ"],
    "emoji": "🐶", "soundType": "bark", "soundText": "ワンワン！", "themeColor": "#ffd166", "actionType": "super-jump", "bgDecor": "🦴",
    "questionText": "ワンワンほえるよ！この どうぶつは？",
    "praiseText": "せいかい！ワンちゃん！すごーい！"
  },
  {
    "id": "neko", "category": "animal", "nameHira": "ねこ", "nameKata": "ネコ",
    "charsHira": ["ね", "こ"], "charsKata": ["ネ", "コ"],
    "emoji": "🐱", "soundType": "meow", "soundText": "ニャオ〜ン♪", "themeColor": "#f8edeb", "actionType": "spin", "bgDecor": "🐟",
    "questionText": "ニャオ〜ンと鳴く この どうぶつは？",
    "praiseText": "せいかい！ネコちゃん！すごーい！"
  },
  {
    "id": "ushi", "category": "animal", "nameHira": "うし", "nameKata": "ウシ",
    "charsHira": ["う", "し"], "charsKata": ["ウ", "シ"],
    "emoji": "🐮", "soundType": "moo", "soundText": "モ〜〜〜ッ！", "themeColor": "#e9ecef", "actionType": "dance-butt", "bgDecor": "🥛",
    "questionText": "モ〜〜！ミルクをくれる この どうぶつは？",
    "praiseText": "せいかい！ウシさん！すごーい！"
  },
  {
    "id": "kaeru", "category": "animal", "nameHira": "かえる", "nameKata": "カエル",
    "charsHira": ["か", "え", "る"], "charsKata": ["カ", "エ", "ル"],
    "emoji": "🐸", "soundType": "ribbit", "soundText": "ケロケロ〜！", "themeColor": "#52b788", "actionType": "high-jump", "bgDecor": "💧",
    "questionText": "ケロケロピョンピョン！この 生き物は？",
    "praiseText": "せいかい！カエルさん！すごーい！"
  },
  {
    "id": "panda", "category": "animal", "nameHira": "ぱんだ", "nameKata": "パンダ",
    "charsHira": ["ぱ", "ん", "だ"], "charsKata": ["パ", "ン", "ダ"],
    "emoji": "🐼", "soundType": "squeak", "soundText": "笹おいしいな〜", "themeColor": "#ced4da", "actionType": "dance-butt", "bgDecor": "🎋",
    "questionText": "白黒もようで笹モグモグ！この どうぶつは？",
    "praiseText": "せいかい！パンダさん！すごーい！"
  },
  {
    "id": "lion", "category": "animal", "nameHira": "らいおん", "nameKata": "ライオン",
    "charsHira": ["ら", "い", "お", "ん"], "charsKata": ["ラ", "イ", "オ", "ン"],
    "emoji": "🦁", "soundType": "roar", "soundText": "ガオオオーッ！", "themeColor": "#f39c12", "actionType": "super-jump", "bgDecor": "👑",
    "questionText": "ガオ〜〜！たてがみが かっこいい この どうぶつは？",
    "praiseText": "せいかい！ライオン！すごーい！"
  },
  {
    "id": "tora", "category": "animal", "nameHira": "とら", "nameKata": "トラ",
    "charsHira": ["と", "ら"], "charsKata": ["ト", "ラ"],
    "emoji": "🐯", "soundType": "roar", "soundText": "ガオッ！しましま！", "themeColor": "#e67e22", "actionType": "super-jump", "bgDecor": "🐾",
    "questionText": "かっこいいシマシマ！強い この どうぶつは？",
    "praiseText": "せいかい！トラさん！すごーい！"
  },
  {
    "id": "zou", "category": "animal", "nameHira": "ぞう", "nameKata": "ゾウ",
    "charsHira": ["ぞ", "う"], "charsKata": ["ゾ", "ウ"],
    "emoji": "🐘", "soundType": "trumpet", "soundText": "パオオーーン！", "themeColor": "#95a5a6", "actionType": "super-jump", "bgDecor": "🎪",
    "questionText": "お鼻がながーい！この どうぶつは？",
    "praiseText": "せいかい！ゾウさん！すごーい！"
  },
  {
    "id": "saru", "category": "animal", "nameHira": "さる", "nameKata": "サル",
    "charsHira": ["さ", "る"], "charsKata": ["サ", "ル"],
    "emoji": "🐵", "soundType": "chatter", "soundText": "ウキキキッ！", "themeColor": "#d35400", "actionType": "high-jump", "bgDecor": "🍌",
    "questionText": "ウキキキッ！バナナが大好きな この どうぶつは？",
    "praiseText": "せいかい！おサルさん！すごーい！"
  },
  {
    "id": "kuma", "category": "animal", "nameHira": "くま", "nameKata": "クマ",
    "charsHira": ["く", "ま"], "charsKata": ["ク", "マ"],
    "emoji": "🐻", "soundType": "growl", "soundText": "クマー！はちみつ！", "themeColor": "#795548", "actionType": "dance-butt", "bgDecor": "🍯",
    "questionText": "はちみつがだいすき！力持ちの この どうぶつは？",
    "praiseText": "せいかい！クマさん！すごーい！"
  },
  {
    "id": "usagi", "category": "animal", "nameHira": "うさぎ", "nameKata": "ウサギ",
    "charsHira": ["う", "さ", "ぎ"], "charsKata": ["ウ", "サ", "ギ"],
    "emoji": "🐰", "soundType": "squeak", "soundText": "ぴょんぴょん！", "themeColor": "#ffcbf2", "actionType": "high-jump", "bgDecor": "🥕",
    "questionText": "お耳がながくて ピョンピョン！この どうぶつは？",
    "praiseText": "せいかい！うさぎさん！すごーい！"
  },
  {
    "id": "tori", "category": "animal", "nameHira": "とり", "nameKata": "トリ",
    "charsHira": ["と", "り"], "charsKata": ["ト", "リ"],
    "emoji": "🐦", "soundType": "chirp", "soundText": "ピピッ！パタパタ！", "themeColor": "#48cae4", "actionType": "high-jump", "bgDecor": "🌿",
    "questionText": "パタパタお空をとぶ この 生き物は？",
    "praiseText": "せいかい！小鳥さん！すごーい！"
  },
  {
    "id": "uma", "category": "animal", "nameHira": "うま", "nameKata": "ウマ",
    "charsHira": ["う", "ま"], "charsKata": ["ウ", "マ"],
    "emoji": "🐴", "soundType": "neigh", "soundText": "ヒヒーン！パッカパッカ！", "themeColor": "#a0522d", "actionType": "zoom-dash", "bgDecor": "🌾",
    "questionText": "ヒヒーン！パッカパッカ走る この どうぶつは？",
    "praiseText": "せいかい！お馬さん！すごーい！"
  },
  {
    "id": "kirin", "category": "animal", "nameHira": "きりん", "nameKata": "キリン",
    "charsHira": ["き", "り", "ん"], "charsKata": ["キ", "リ", "ン"],
    "emoji": "🦒", "soundType": "squeak", "soundText": "首がたかーい！", "themeColor": "#ffb703", "actionType": "super-jump", "bgDecor": "🍃",
    "questionText": "首が長くて背が高い！この どうぶつは？",
    "praiseText": "せいかい！キリンさん！すごーい！"
  },
  {
    "id": "wani", "category": "animal", "nameHira": "わに", "nameKata": "ワニ",
    "charsHira": ["わ", "に"], "charsKata": ["ワ", "ニ"],
    "emoji": "🐊", "soundType": "snap", "soundText": "ガブガブッ！", "themeColor": "#2d6a4f", "actionType": "dance-butt", "bgDecor": "🌊",
    "questionText": "大きなお口でガブッ！この 生き物は？",
    "praiseText": "せいかい！ワニさん！すごーい！"
  },
  {
    "id": "shika", "category": "animal", "nameHira": "しか", "nameKata": "シカ",
    "charsHira": ["し", "か"], "charsKata": ["シ", "カ"],
    "emoji": "🦌", "soundType": "squeak", "soundText": "ピョンピョン走る！", "themeColor": "#bc6c25", "actionType": "high-jump", "bgDecor": "🍁",
    "questionText": "きれいなツノがある この どうぶつは？",
    "praiseText": "せいかい！シカさん！すごーい！"
  },
  {
    "id": "risu", "category": "animal", "nameHira": "りす", "nameKata": "リス",
    "charsHira": ["り", "す"], "charsKata": ["リ", "ス"],
    "emoji": "🐿️", "soundType": "squeak", "soundText": "どんぐりカリカリ！", "themeColor": "#dda15e", "actionType": "spin", "bgDecor": "🌰",
    "questionText": "どんぐり だいすき！この どうぶつは？",
    "praiseText": "せいかい！リスさん！すごーい！"
  },
  {
    "id": "hitsuji", "category": "animal", "nameHira": "ひつじ", "nameKata": "ヒツジ",
    "charsHira": ["ひ", "つ", "じ"], "charsKata": ["ヒ", "ツ", "ジ"],
    "emoji": "🐑", "soundType": "baa", "soundText": "メェ〜〜メェ〜〜", "themeColor": "#f8f9fa", "actionType": "dance-butt", "bgDecor": "☁️",
    "questionText": "もこもこ毛糸の この どうぶつは？",
    "praiseText": "せいかい！ヒツジさん！すごーい！"
  },
  {
    "id": "yagi", "category": "animal", "nameHira": "やぎ", "nameKata": "ヤギ",
    "charsHira": ["や", "ぎ"], "charsKata": ["ヤ", "ギ"],
    "emoji": "🐐", "soundType": "baa", "soundText": "メェ〜！お手紙モグモグ", "themeColor": "#e9ecef", "actionType": "jump", "bgDecor": "📜",
    "questionText": "高いところもピョンピョン！この どうぶつは？",
    "praiseText": "せいかい！ヤギさん！すごーい！"
  },
  {
    "id": "koara", "category": "animal", "nameHira": "こあら", "nameKata": "コアラ",
    "charsHira": ["こ", "あ", "ら"], "charsKata": ["コ", "ア", "ラ"],
    "emoji": "🐨", "soundType": "squeak", "soundText": "木にギューッ！", "themeColor": "#adb5bd", "actionType": "dance-butt", "bgDecor": "🐨",
    "questionText": "ユーカリの木にギューッ！この どうぶつは？",
    "praiseText": "せいかい！コアラさん！すごーい！"
  },
  {
    "id": "gorira", "category": "animal", "nameHira": "ごりら", "nameKata": "ゴリラ",
    "charsHira": ["ご", "り", "ら"], "charsKata": ["ゴ", "リ", "ラ"],
    "emoji": "🦍", "soundType": "growl", "soundText": "ウホウホ！ドラミング！", "themeColor": "#343a40", "actionType": "super-jump", "bgDecor": "💪",
    "questionText": "胸をトントンたたく！強い この どうぶつは？",
    "praiseText": "せいかい！ゴリラさん！すごーい！"
  },
  {
    "id": "sai", "category": "animal", "nameHira": "さい", "nameKata": "サイ",
    "charsHira": ["さ", "い"], "charsKata": ["サ", "イ"],
    "emoji": "🦏", "soundType": "growl", "soundText": "ツノがかっこいい！", "themeColor": "#6c757d", "actionType": "zoom-dash", "bgDecor": "🛡️",
    "questionText": "鼻の上に強いツノ！この どうぶつは？",
    "praiseText": "せいかい！サイさん！すごーい！"
  },
  {
    "id": "kaba", "category": "animal", "nameHira": "かば", "nameKata": "カバ",
    "charsHira": ["か", "ば"], "charsKata": ["カ", "バ"],
    "emoji": "🦛", "soundType": "growl", "soundText": "大あくび！ア〜ン！", "themeColor": "#495057", "actionType": "dance-butt", "bgDecor": "💦",
    "questionText": "大きなお口をアーン！この どうぶつは？",
    "praiseText": "せいかい！カバさん！すごーい！"
  },
  {
    "id": "rakuda", "category": "animal", "nameHira": "らくだ", "nameKata": "ラクダ",
    "charsHira": ["ら", "く", "だ"], "charsKata": ["ラ", "ク", "ダ"],
    "emoji": "🐪", "soundType": "growl", "soundText": "コブがポコッ！", "themeColor": "#d4a373", "actionType": "dance-butt", "bgDecor": "🏜️",
    "questionText": "お背中にコブがある この どうぶつは？",
    "praiseText": "せいかい！ラクダさん！すごーい！"
  },
  {
    "id": "kitsune", "category": "animal", "nameHira": "きつね", "nameKata": "キツネ",
    "charsHira": ["き", "つ", "ね"], "charsKata": ["キ", "ツ", "ネ"],
    "emoji": "🦊", "soundType": "bark", "soundText": "コンコン♪", "themeColor": "#f77f00", "actionType": "spin", "bgDecor": "🌾",
    "questionText": "コンコン！お耳がピン！この どうぶつは？",
    "praiseText": "せいかい！キツネさん！すごーい！"
  },
  {
    "id": "penguin", "category": "animal", "nameHira": "ぺんぎん", "nameKata": "ペンギン",
    "charsHira": ["ぺ", "ん", "ぎ", "ん"], "charsKata": ["ペ", "ン", "ギ", "ン"],
    "emoji": "🐧", "soundType": "chirp", "soundText": "ヨチヨチ歩き！", "themeColor": "#003049", "actionType": "dance-butt", "bgDecor": "🧊",
    "questionText": "よちよち歩き！氷の上の この 鳥は？",
    "praiseText": "せいかい！ペンギンさん！すごーい！"
  },
  {
    "id": "iruka", "category": "animal", "nameHira": "いるか", "nameKata": "イルカ",
    "charsHira": ["い", "る", "か"], "charsKata": ["イ", "ル", "カ"],
    "emoji": "🐬", "soundType": "whistle", "soundText": "キュイ〜ン！ジャンプ！", "themeColor": "#48cae4", "actionType": "high-jump", "bgDecor": "🌊",
    "questionText": "海をスイスイ大ジャンプ！この 生き物は？",
    "praiseText": "せいかい！イルカさん！すごーい！"
  },
  {
    "id": "kujira", "category": "animal", "nameHira": "くじら", "nameKata": "クジラ",
    "charsHira": ["く", "じ", "ら"], "charsKata": ["ク", "ジ", "ラ"],
    "emoji": "🐳", "soundType": "horn", "soundText": "プシューッ！潮吹き！", "themeColor": "#0077b6", "actionType": "super-jump", "bgDecor": "💦",
    "questionText": "潮をプシューッ！海で一番大きな この 生き物は？",
    "praiseText": "せいかい！クジラさん！すごーい！"
  },
  {
    "id": "same", "category": "animal", "nameHira": "さめ", "nameKata": "サメ",
    "charsHira": ["さ", "め"], "charsKata": ["サ", "メ"],
    "emoji": "🦈", "soundType": "growl", "soundText": "するどい歯！スイスイ！", "themeColor": "#1d3557", "actionType": "zoom-dash", "bgDecor": "🌊",
    "questionText": "するどい歯でスイスイ！この 生き物は？",
    "praiseText": "せいかい！サメさん！すごーい！"
  },

  # ----------------------------------------------------
  # 🍎 たべもの・しぜん（20種類）
  # ----------------------------------------------------
  {
    "id": "ringo", "category": "food", "nameHira": "りんご", "nameKata": "リンゴ",
    "charsHira": ["り", "ん", "ご"], "charsKata": ["リ", "ン", "ゴ"],
    "emoji": "🍎", "soundType": "cheer", "soundText": "シャキシャキ甘い！", "themeColor": "#ff4d6d", "actionType": "jump", "bgDecor": "🍏",
    "questionText": "赤くて甘くてシャキシャキ！この くだものは？",
    "praiseText": "せいかい！りんご！すごーい！"
  },
  {
    "id": "mikan", "category": "food", "nameHira": "みかん", "nameKata": "ミカン",
    "charsHira": ["み", "か", "ん"], "charsKata": ["ミ", "カ", "ン"],
    "emoji": "🍊", "soundType": "cheer", "soundText": "ジューシーおいしい！", "themeColor": "#ff9e00", "actionType": "jump", "bgDecor": "🍊",
    "questionText": "オレンジ色でジューシー！この くだものは？",
    "praiseText": "せいかい！みかん！すごーい！"
  },
  {
    "id": "banana", "category": "food", "nameHira": "ばなな", "nameKata": "バナナ",
    "charsHira": ["ば", "な", "な"], "charsKata": ["バ", "ナ", "ナ"],
    "emoji": "🍌", "soundType": "cheer", "soundText": "もぐもぐあまい！", "themeColor": "#ffd166", "actionType": "dance-butt", "bgDecor": "🍌",
    "questionText": "黄色くてあまーい！この くだものは？",
    "praiseText": "せいかい！バナナ！すごーい！"
  },
  {
    "id": "suika", "category": "food", "nameHira": "すいか", "nameKata": "スイカ",
    "charsHira": ["す", "い", "か"], "charsKata": ["ス", "イ", "カ"],
    "emoji": "🍉", "soundType": "cheer", "soundText": "夏はすいか！シャキッ！", "themeColor": "#06d6a0", "actionType": "jump", "bgDecor": "🍉",
    "questionText": "緑と黒のしましま！この たべものは？",
    "praiseText": "せいかい！スイカ！すごーい！"
  },
  {
    "id": "budo", "category": "food", "nameHira": "ぶどう", "nameKata": "ブドウ",
    "charsHira": ["ぶ", "ど", "う"], "charsKata": ["ブ", "ド", "ウ"],
    "emoji": "🍇", "soundType": "cheer", "soundText": "つぶつぶジューシー！", "themeColor": "#7209b7", "actionType": "spin", "bgDecor": "🍇",
    "questionText": "紫のつぶつぶ！この くだものは？",
    "praiseText": "せいかい！ぶどう！すごーい！"
  },
  {
    "id": "ichigo", "category": "food", "nameHira": "いちご", "nameKata": "イチゴ",
    "charsHira": ["い", "ち", "ご"], "charsKata": ["イ", "チ", "ゴ"],
    "emoji": "🍓", "soundType": "cheer", "soundText": "あまくておいしい！", "themeColor": "#e63946", "actionType": "jump", "bgDecor": "🍓",
    "questionText": "赤くてつぶつぶかわいい！この くだものは？",
    "praiseText": "せいかい！いちご！すごーい！"
  },
  {
    "id": "meron", "category": "food", "nameHira": "めろん", "nameKata": "メロン",
    "charsHira": ["め", "ろ", "ん"], "charsKata": ["メ", "ロ", "ン"],
    "emoji": "🍈", "soundType": "cheer", "soundText": "あみあみ高級メロン！", "themeColor": "#99d98c", "actionType": "jump", "bgDecor": "🍈",
    "questionText": "あまくてジューシー！みどりの この くだものは？",
    "praiseText": "せいかい！メロン！すごーい！"
  },
  {
    "id": "tomato", "category": "food", "nameHira": "とまと", "nameKata": "トマト",
    "charsHira": ["と", "ま", "と"], "charsKata": ["ト", "マ", "ト"],
    "emoji": "🍅", "soundType": "cheer", "soundText": "真っ赤なトマト！", "themeColor": "#ef233c", "actionType": "jump", "bgDecor": "🍅",
    "questionText": "真っ赤でまあるい この お野菜は？",
    "praiseText": "せいかい！トマト！すごーい！"
  },
  {
    "id": "pan", "category": "food", "nameHira": "ぱん", "nameKata": "パン",
    "charsHira": ["ぱ", "ん"], "charsKata": ["パ", "ン"],
    "emoji": "🍞", "soundType": "cheer", "soundText": "焼きたてふかふか！", "themeColor": "#f4a261", "actionType": "jump", "bgDecor": "🥐",
    "questionText": "焼きたてふかふか！この たべものは？",
    "praiseText": "せいかい！パン！すごーい！"
  },
  {
    "id": "keki", "category": "food", "nameHira": "けーき", "nameKata": "ケーキ",
    "charsHira": ["け", "ー", "き"], "charsKata": ["ケ", "ー", "キ"],
    "emoji": "🎂", "soundType": "cheer", "soundText": "ハッピーバースデー！", "themeColor": "#ffb4a2", "actionType": "super-jump", "bgDecor": "🎉",
    "questionText": "お誕生日のあまーい この たべものは？",
    "praiseText": "せいかい！ケーキ！すごーい！"
  },
  {
    "id": "aisu", "category": "food", "nameHira": "あいす", "nameKata": "アイス",
    "charsHira": ["あ", "い", "す"], "charsKata": ["ア", "イ", "ス"],
    "emoji": "🍨", "soundType": "cheer", "soundText": "つめたくておいしい！", "themeColor": "#a2d2ff", "actionType": "spin", "bgDecor": "🍦",
    "questionText": "つめたくておいしい！この おやつは？",
    "praiseText": "せいかい！アイス！すごーい！"
  },
  {
    "id": "purin", "category": "food", "nameHira": "ぷりん", "nameKata": "プリン",
    "charsHira": ["ぷ", "り", "ん"], "charsKata": ["プ", "リ", "ン"],
    "emoji": "🍮", "soundType": "cheer", "soundText": "ぷるぷるおいしい！", "themeColor": "#ffe3a0", "actionType": "dance-butt", "bgDecor": "🍮",
    "questionText": "ぷるぷるカラメル！この おやつは？",
    "praiseText": "せいかい！プリン！すごーい！"
  },
  {
    "id": "ame", "category": "food", "nameHira": "あめ", "nameKata": "アメ",
    "charsHira": ["あ", "め"], "charsKata": ["ア", "メ"],
    "emoji": "🍬", "soundType": "cheer", "soundText": "あまーいキャンディ！", "themeColor": "#ffc6ff", "actionType": "jump", "bgDecor": "🍭",
    "questionText": "お口でペロペロ！あま〜い この おやつは？",
    "praiseText": "せいかい！あめ！すごーい！"
  },
  {
    "id": "onigiri", "category": "food", "nameHira": "おにぎり", "nameKata": "オニギリ",
    "charsHira": ["お", "に", "ぎ", "り"], "charsKata": ["オ", "ニ", "ギ", "リ"],
    "emoji": "🍙", "soundType": "cheer", "soundText": "もぐもぐおいしい！", "themeColor": "#f8f9fa", "actionType": "jump", "bgDecor": "🍙",
    "questionText": "さんかく海苔をまいた ぎゅっぎゅっ この ごはんは？",
    "praiseText": "せいかい！おにぎり！すごーい！"
  },
  {
    "id": "sushi", "category": "food", "nameHira": "すし", "nameKata": "スシ",
    "charsHira": ["す", "し"], "charsKata": ["ス", "シ"],
    "emoji": "🍣", "soundType": "cheer", "soundText": "へい、おまち！", "themeColor": "#f72585", "actionType": "jump", "bgDecor": "🍣",
    "questionText": "へい、おまち！魚をのせた この たべものは？",
    "praiseText": "せいかい！すし！すごーい！"
  },
  {
    "id": "kare", "category": "food", "nameHira": "かれー", "nameKata": "カレー",
    "charsHira": ["か", "れ", "ー"], "charsKata": ["カ", "レ", "ー"],
    "emoji": "🍛", "soundType": "cheer", "soundText": "おいしいカレーライス！", "themeColor": "#e76f51", "actionType": "jump", "bgDecor": "🍛",
    "questionText": "お肉や お野菜 ゴロゴロ！ごはんと食べる この ごはんは？",
    "praiseText": "せいかい！カレー！すごーい！"
  },
  {
    "id": "tsuki", "category": "food", "nameHira": "つき", "nameKata": "ツキ",
    "charsHira": ["つ", "き"], "charsKata": ["ツ", "キ"],
    "emoji": "🌙", "soundType": "cheer", "soundText": "お月さま、ピカピカ！", "themeColor": "#ffd166", "actionType": "spin", "bgDecor": "✨",
    "questionText": "夜のお空でピカピカ！これは なーんだ？",
    "praiseText": "せいかい！おつきさま！すごーい！"
  },
  {
    "id": "hoshi", "category": "food", "nameHira": "ほし", "nameKata": "ホシ",
    "charsHira": ["ほ", "し"], "charsKata": ["ホ", "シ"],
    "emoji": "⭐", "soundType": "cheer", "soundText": "きらきらお星さま！", "themeColor": "#ffbe0b", "actionType": "super-jump", "bgDecor": "🌟",
    "questionText": "夜のお空できらきら！これは なーんだ？",
    "praiseText": "せいかい！おほしさま！すごーい！"
  },
  {
    "id": "niji", "category": "food", "nameHira": "にじ", "nameKata": "ニジ",
    "charsHira": ["に", "じ"], "charsKata": ["ニ", "ジ"],
    "emoji": "🌈", "soundType": "cheer", "soundText": "きれいな七色の虹！", "themeColor": "#b5179e", "actionType": "super-jump", "bgDecor": "☀️",
    "questionText": "雨上がりの空に七色！これは なーんだ？",
    "praiseText": "せいかい！にじ！すごーい！"
  },
  {
    "id": "taiyo", "category": "food", "nameHira": "たいよう", "nameKata": "タイヨウ",
    "charsHira": ["た", "い", "よ", "う"], "charsKata": ["タ", "イ", "ヨ", "ウ"],
    "emoji": "☀️", "soundType": "cheer", "soundText": "ポカポカお日さま！", "themeColor": "#f77f00", "actionType": "spin", "bgDecor": "✨",
    "questionText": "お空でポカポカ！これは なーんだ？",
    "praiseText": "せいかい！たいよう！すごーい！"
  }
]

async def generate():
  os.makedirs('audio/neural/questions', exist_ok=True)
  os.makedirs('audio/neural/praises', exist_ok=True)

  print(f"Total items: {len(ITEMS)}")

  # 1. 出題クイズ音声の生成
  print("--- Generating Question Audios ---")
  for item in ITEMS:
    q_file = f"audio/neural/questions/{item['id']}.mp3"
    if not os.path.exists(q_file):
      print(f"Generating question: {item['id']} -> {item['questionText']}")
      comm = edge_tts.Communicate(item['questionText'], VOICE)
      await comm.save(q_file)

  # 2. 短縮版褒め音声の生成（上書きして短くテンポよく）
  print("--- Generating Shortened Praise Audios ---")
  for item in ITEMS:
    p_file = f"audio/neural/praises/{item['id']}.mp3"
    if not os.path.exists(p_file):
      print(f"Generating praise: {item['id']} -> {item['praiseText']}")
      comm = edge_tts.Communicate(item['praiseText'], VOICE)
      await comm.save(p_file)

  print("All audios generated successfully!")

  # 3. js/data.js の更新
  js_chars = []
  for item in ITEMS:
    clean_dict = {
      "id": item["id"],
      "category": item["category"],
      "nameHira": item["nameHira"],
      "nameKata": item["nameKata"],
      "charsHira": item["charsHira"],
      "charsKata": item["charsKata"],
      "emoji": item["emoji"],
      "imageSrc": f"/images/characters/{item['id']}.svg",
      "soundType": item["soundType"],
      "soundText": item["soundText"],
      "themeColor": item["themeColor"],
      "actionType": item["actionType"],
      "bgDecor": item["bgDecor"],
      "questionText": item["questionText"]
    }
    js_chars.append(clean_dict)

  # RANDOM_DISTRACTORS と 50音表を維持
  with open("js/data.js", "r", encoding="utf-8") as f:
    orig_content = f.read()

  distractor_idx = orig_content.find("const RANDOM_DISTRACTORS_HIRA =")
  if distractor_idx != -1:
    trailing_part = orig_content[distractor_idx:]
  else:
    print("Error: RANDOM_DISTRACTORS_HIRA not found!")
    return

  new_js = "// 4歳児向け知育ゲーム データ集（くるま・どうぶつ・たべもの 全75種類）\n\n"
  new_js += "// 1. 「うごく！文字あつめ」データ（出題クイズ questionText つき）\n"
  new_js += "const CHARACTERS_DATA = " + json.dumps(js_chars, ensure_ascii=False, indent=2) + ";\n\n"
  new_js += trailing_part

  with open("js/data.js", "w", encoding="utf-8") as f:
    f.write(new_js)

  print("Updated js/data.js with questionText successfully!")

if __name__ == '__main__':
  asyncio.run(generate())
