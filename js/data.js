// 4歳児向け知育ゲーム データ集（くるま・どうぶつ・たべもの 全75種類）

// 1. 「うごく！文字あつめ」データ（出題クイズ questionText つき）
const CHARACTERS_DATA = [
  {
    "id": "shobo",
    "category": "vehicle",
    "nameHira": "しょうぼうしゃ",
    "nameKata": "ショウボウシャ",
    "charsHira": [
      "し",
      "ょ",
      "う",
      "ぼ",
      "う",
      "し",
      "ゃ"
    ],
    "charsKata": [
      "シ",
      "ョ",
      "ウ",
      "ボ",
      "ウ",
      "シ",
      "ャ"
    ],
    "emoji": "🚒",
    "imageSrc": "/images/characters/shobo.svg",
    "soundType": "horn",
    "soundText": "ウ〜カンカン！放水！",
    "themeColor": "#ff4d6d",
    "actionType": "zoom-dash",
    "bgDecor": "💦",
    "questionText": "ウ〜カンカン！火をけす この くるまは？"
  },
  {
    "id": "patoka",
    "category": "vehicle",
    "nameHira": "ぱとかー",
    "nameKata": "パトカー",
    "charsHira": [
      "ぱ",
      "と",
      "か",
      "ー"
    ],
    "charsKata": [
      "パ",
      "ト",
      "カ",
      "ー"
    ],
    "emoji": "🚓",
    "imageSrc": "/images/characters/patoka.svg",
    "soundType": "horn",
    "soundText": "ウ〜〜！パトロール！",
    "themeColor": "#3a86ff",
    "actionType": "zoom-dash",
    "bgDecor": "🚨",
    "questionText": "パトロールしゅっぱつ！この くるまは？"
  },
  {
    "id": "kyukyusha",
    "category": "vehicle",
    "nameHira": "きゅうきゅうしゃ",
    "nameKata": "キュウキュウシャ",
    "charsHira": [
      "き",
      "ゅ",
      "う",
      "き",
      "ゅ",
      "う",
      "し",
      "ゃ"
    ],
    "charsKata": [
      "キ",
      "ュ",
      "ウ",
      "キ",
      "ュ",
      "ウ",
      "シ",
      "ャ"
    ],
    "emoji": "🚑",
    "imageSrc": "/images/characters/kyukyusha.svg",
    "soundType": "horn",
    "soundText": "ピーポーピーポー！",
    "themeColor": "#ff758f",
    "actionType": "zoom-dash",
    "bgDecor": "🩹",
    "questionText": "ピーポーピーポー！病院へ急ぐ この くるまは？"
  },
  {
    "id": "basu",
    "category": "vehicle",
    "nameHira": "ばす",
    "nameKata": "バス",
    "charsHira": [
      "ば",
      "す"
    ],
    "charsKata": [
      "バ",
      "ス"
    ],
    "emoji": "🚌",
    "imageSrc": "/images/characters/basu.svg",
    "soundType": "vroom",
    "soundText": "ぷっぷー！乗ってね！",
    "themeColor": "#ffb703",
    "actionType": "dance-butt",
    "bgDecor": "🚏",
    "questionText": "ぷっぷー！みんなを乗せる この くるまは？"
  },
  {
    "id": "takushi",
    "category": "vehicle",
    "nameHira": "たくしー",
    "nameKata": "タクシー",
    "charsHira": [
      "た",
      "く",
      "し",
      "ー"
    ],
    "charsKata": [
      "タ",
      "ク",
      "シ",
      "ー"
    ],
    "emoji": "🚕",
    "imageSrc": "/images/characters/takushi.svg",
    "soundType": "vroom",
    "soundText": "どこへ行きますか？",
    "themeColor": "#ffd166",
    "actionType": "zoom-dash",
    "bgDecor": "🚖",
    "questionText": "どこへ行きますか？この くるまは？"
  },
  {
    "id": "torakku",
    "category": "vehicle",
    "nameHira": "とらっく",
    "nameKata": "トラック",
    "charsHira": [
      "と",
      "ら",
      "っ",
      "く"
    ],
    "charsKata": [
      "ト",
      "ラ",
      "ッ",
      "ク"
    ],
    "emoji": "🚚",
    "imageSrc": "/images/characters/torakku.svg",
    "soundType": "vroom",
    "soundText": "荷物を運ぶよ！",
    "themeColor": "#06d6a0",
    "actionType": "zoom-dash",
    "bgDecor": "📦",
    "questionText": "お荷物をいっぱい積んで運ぶ この くるまは？"
  },
  {
    "id": "danpu",
    "category": "vehicle",
    "nameHira": "だんぷかー",
    "nameKata": "ダンプカー",
    "charsHira": [
      "だ",
      "ん",
      "ぷ",
      "か",
      "ー"
    ],
    "charsKata": [
      "ダ",
      "ン",
      "プ",
      "カ",
      "ー"
    ],
    "emoji": "🚛",
    "imageSrc": "/images/characters/danpu.svg",
    "soundType": "vroom",
    "soundText": "荷台がガッターン！土をザーッ！",
    "themeColor": "#fb8500",
    "actionType": "dance-butt",
    "bgDecor": "🪨",
    "questionText": "荷台を上げて土をザーッと落とす この くるまは？"
  },
  {
    "id": "torakuta",
    "category": "vehicle",
    "nameHira": "とらくたー",
    "nameKata": "トラクター",
    "charsHira": [
      "と",
      "ら",
      "く",
      "た",
      "ー"
    ],
    "charsKata": [
      "ト",
      "ラ",
      "ク",
      "タ",
      "ー"
    ],
    "emoji": "🚜",
    "imageSrc": "/images/characters/torakuta.svg",
    "soundType": "vroom",
    "soundText": "畑をたがやすよ！",
    "themeColor": "#ffbe0b",
    "actionType": "dance-butt",
    "bgDecor": "🌾",
    "questionText": "畑をたがやす 力持ちの この くるまは？"
  },
  {
    "id": "kuren",
    "category": "vehicle",
    "nameHira": "くれーん",
    "nameKata": "クレーン",
    "charsHira": [
      "く",
      "れ",
      "ー",
      "ん"
    ],
    "charsKata": [
      "ク",
      "レ",
      "ー",
      "ン"
    ],
    "emoji": "🏗️",
    "imageSrc": "/images/characters/kuren.svg",
    "soundType": "vroom",
    "soundText": "ウィーン！たかーい！",
    "themeColor": "#ff006e",
    "actionType": "super-jump",
    "bgDecor": "🧱",
    "questionText": "工事現場で ウィーン！重いものを 高く持ち上げる これは？"
  },
  {
    "id": "kisha",
    "category": "vehicle",
    "nameHira": "きしゃ",
    "nameKata": "キシャ",
    "charsHira": [
      "き",
      "し",
      "ゃ"
    ],
    "charsKata": [
      "キ",
      "シ",
      "ャ"
    ],
    "emoji": "🚂",
    "imageSrc": "/images/characters/kisha.svg",
    "soundType": "vroom",
    "soundText": "シュッシュッポッポー！",
    "themeColor": "#2b2d42",
    "actionType": "zoom-dash",
    "bgDecor": "💨",
    "questionText": "シュッシュッポッポー！煙を出す この 乗り物は？"
  },
  {
    "id": "densha",
    "category": "vehicle",
    "nameHira": "でんしゃ",
    "nameKata": "デンシャ",
    "charsHira": [
      "で",
      "ん",
      "し",
      "ゃ"
    ],
    "charsKata": [
      "デ",
      "ン",
      "シ",
      "ャ"
    ],
    "emoji": "🚃",
    "imageSrc": "/images/characters/densha.svg",
    "soundType": "vroom",
    "soundText": "ガタゴトガタゴト！",
    "themeColor": "#52b788",
    "actionType": "zoom-dash",
    "bgDecor": "🛤️",
    "questionText": "線路をガタゴト走る この 乗り物は？"
  },
  {
    "id": "hikoki",
    "category": "vehicle",
    "nameHira": "ひこうき",
    "nameKata": "ヒコウキ",
    "charsHira": [
      "ひ",
      "こ",
      "う",
      "き"
    ],
    "charsKata": [
      "ヒ",
      "コ",
      "ウ",
      "キ"
    ],
    "emoji": "✈️",
    "imageSrc": "/images/characters/hikoki.svg",
    "soundType": "jet",
    "soundText": "ビュイーーーッ！",
    "themeColor": "#caf0f8",
    "actionType": "zoom-dash",
    "bgDecor": "☁️",
    "questionText": "お空をビュイーーッ！この 乗り物は？"
  },
  {
    "id": "heri",
    "category": "vehicle",
    "nameHira": "へり",
    "nameKata": "ヘリ",
    "charsHira": [
      "へ",
      "り"
    ],
    "charsKata": [
      "ヘ",
      "リ"
    ],
    "emoji": "🚁",
    "imageSrc": "/images/characters/heri.svg",
    "soundType": "jet",
    "soundText": "パタパタ空をとぶ！",
    "themeColor": "#e76f51",
    "actionType": "high-jump",
    "bgDecor": "🌤️",
    "questionText": "プロペラパタパタ！この 乗り物は？"
  },
  {
    "id": "roketto",
    "category": "vehicle",
    "nameHira": "ろけっと",
    "nameKata": "ロケット",
    "charsHira": [
      "ろ",
      "け",
      "っ",
      "と"
    ],
    "charsKata": [
      "ロ",
      "ケ",
      "ッ",
      "ト"
    ],
    "emoji": "🚀",
    "imageSrc": "/images/characters/roketto.svg",
    "soundType": "jet",
    "soundText": "３・２・１発射！",
    "themeColor": "#ff758f",
    "actionType": "super-jump",
    "bgDecor": "⭐",
    "questionText": "３・２・１発射！宇宙へ行く この 乗り物は？"
  },
  {
    "id": "fune",
    "category": "vehicle",
    "nameHira": "ふね",
    "nameKata": "フネ",
    "charsHira": [
      "ふ",
      "ね"
    ],
    "charsKata": [
      "フ",
      "ネ"
    ],
    "emoji": "🚢",
    "imageSrc": "/images/characters/fune.svg",
    "soundType": "horn",
    "soundText": "ボォーーッ！波スイスイ！",
    "themeColor": "#8ecae6",
    "actionType": "dance-butt",
    "bgDecor": "⚓",
    "questionText": "ボォーーッ！海をスイスイ進む この 乗り物は？"
  },
  {
    "id": "boto",
    "category": "vehicle",
    "nameHira": "ぼーと",
    "nameKata": "ボート",
    "charsHira": [
      "ぼ",
      "ー",
      "と"
    ],
    "charsKata": [
      "ボ",
      "ー",
      "ト"
    ],
    "emoji": "🚤",
    "imageSrc": "/images/characters/boto.svg",
    "soundType": "vroom",
    "soundText": "びゅんびゅん走る！",
    "themeColor": "#00b4d8",
    "actionType": "zoom-dash",
    "bgDecor": "🌊",
    "questionText": "波をビュンビュン走る この 乗り物は？"
  },
  {
    "id": "yotto",
    "category": "vehicle",
    "nameHira": "よっと",
    "nameKata": "ヨット",
    "charsHira": [
      "よ",
      "っ",
      "と"
    ],
    "charsKata": [
      "ヨ",
      "ッ",
      "ト"
    ],
    "emoji": "⛵",
    "imageSrc": "/images/characters/yotto.svg",
    "soundType": "vroom",
    "soundText": "風にのってスイスイ！",
    "themeColor": "#90e0ef",
    "actionType": "dance-butt",
    "bgDecor": "🌬️",
    "questionText": "風をうけてスイスイ進む この 乗り物は？"
  },
  {
    "id": "baiku",
    "category": "vehicle",
    "nameHira": "ばいく",
    "nameKata": "バイク",
    "charsHira": [
      "ば",
      "い",
      "く"
    ],
    "charsKata": [
      "バ",
      "イ",
      "ク"
    ],
    "emoji": "🏍️",
    "imageSrc": "/images/characters/baiku.svg",
    "soundType": "vroom",
    "soundText": "ブルルン！はやい！",
    "themeColor": "#d90429",
    "actionType": "zoom-dash",
    "bgDecor": "🏁",
    "questionText": "ブルルン！２つのタイヤの この 乗り物は？"
  },
  {
    "id": "kuruma",
    "category": "vehicle",
    "nameHira": "くるま",
    "nameKata": "クルマ",
    "charsHira": [
      "く",
      "る",
      "ま"
    ],
    "charsKata": [
      "ク",
      "ル",
      "マ"
    ],
    "emoji": "🚗",
    "imageSrc": "/images/characters/kuruma.svg",
    "soundType": "vroom",
    "soundText": "ブーーン！ドライブ！",
    "themeColor": "#ef233c",
    "actionType": "zoom-dash",
    "bgDecor": "🚦",
    "questionText": "タイヤが４つで ブーーンと走る この 乗り物は？"
  },
  {
    "id": "sori",
    "category": "vehicle",
    "nameHira": "そり",
    "nameKata": "ソリ",
    "charsHira": [
      "そ",
      "り"
    ],
    "charsKata": [
      "ソ",
      "リ"
    ],
    "emoji": "🛷",
    "imageSrc": "/images/characters/sori.svg",
    "soundType": "vroom",
    "soundText": "雪の上をシューッ！",
    "themeColor": "#8338ec",
    "actionType": "zoom-dash",
    "bgDecor": "❄️",
    "questionText": "雪の上をシューッ！この 乗り物は？"
  },
  {
    "id": "jitensha",
    "category": "vehicle",
    "nameHira": "じてんしゃ",
    "nameKata": "ジテンシャ",
    "charsHira": [
      "じ",
      "て",
      "ん",
      "し",
      "ゃ"
    ],
    "charsKata": [
      "ジ",
      "テ",
      "ン",
      "シ",
      "ャ"
    ],
    "emoji": "🚲",
    "imageSrc": "/images/characters/jitensha.svg",
    "soundType": "vroom",
    "soundText": "チリンチリン！",
    "themeColor": "#2b9348",
    "actionType": "zoom-dash",
    "bgDecor": "🔔",
    "questionText": "チリンチリン！ペダルをこぐ この 乗り物は？"
  },
  {
    "id": "shinkansen",
    "category": "vehicle",
    "nameHira": "しんかんせん",
    "nameKata": "シンカンセン",
    "charsHira": [
      "し",
      "ん",
      "か",
      "ん",
      "せ",
      "ん"
    ],
    "charsKata": [
      "シ",
      "ン",
      "カ",
      "ン",
      "セ",
      "ン"
    ],
    "emoji": "🚅",
    "imageSrc": "/images/characters/shinkansen.svg",
    "soundType": "jet",
    "soundText": "新幹線ビュイーン！",
    "themeColor": "#0077b6",
    "actionType": "zoom-dash",
    "bgDecor": "🚄",
    "questionText": "白くて速い！線路をビュンビュン走る この 乗り物は？"
  },
  {
    "id": "kikyu",
    "category": "vehicle",
    "nameHira": "ききゅう",
    "nameKata": "キキュウ",
    "charsHira": [
      "き",
      "き",
      "ゅ",
      "う"
    ],
    "charsKata": [
      "キ",
      "キ",
      "ュ",
      "ウ"
    ],
    "emoji": "🎈",
    "imageSrc": "/images/characters/kikyu.svg",
    "soundType": "jet",
    "soundText": "ふわふわ空をとぶ！",
    "themeColor": "#e0aaff",
    "actionType": "high-jump",
    "bgDecor": "☁️",
    "questionText": "ふわふわお空をとぶ この 乗り物は？"
  },
  {
    "id": "buta",
    "category": "animal",
    "nameHira": "ぶた",
    "nameKata": "ブタ",
    "charsHira": [
      "ぶ",
      "た"
    ],
    "charsKata": [
      "ブ",
      "タ"
    ],
    "emoji": "🐷",
    "imageSrc": "/images/characters/buta.svg",
    "soundType": "oink",
    "soundText": "ブヒブヒ〜♪",
    "themeColor": "#ffb3c6",
    "actionType": "dance-butt",
    "bgDecor": "🌸",
    "questionText": "ブヒブヒお鼻の この どうぶつは？"
  },
  {
    "id": "inu",
    "category": "animal",
    "nameHira": "いぬ",
    "nameKata": "イヌ",
    "charsHira": [
      "い",
      "ぬ"
    ],
    "charsKata": [
      "イ",
      "ヌ"
    ],
    "emoji": "🐶",
    "imageSrc": "/images/characters/inu.svg",
    "soundType": "bark",
    "soundText": "ワンワン！",
    "themeColor": "#ffd166",
    "actionType": "super-jump",
    "bgDecor": "🦴",
    "questionText": "ワンワンほえるよ！この どうぶつは？"
  },
  {
    "id": "neko",
    "category": "animal",
    "nameHira": "ねこ",
    "nameKata": "ネコ",
    "charsHira": [
      "ね",
      "こ"
    ],
    "charsKata": [
      "ネ",
      "コ"
    ],
    "emoji": "🐱",
    "imageSrc": "/images/characters/neko.svg",
    "soundType": "meow",
    "soundText": "ニャオ〜ン♪",
    "themeColor": "#f8edeb",
    "actionType": "spin",
    "bgDecor": "🐟",
    "questionText": "ニャオ〜ンと鳴く この どうぶつは？"
  },
  {
    "id": "ushi",
    "category": "animal",
    "nameHira": "うし",
    "nameKata": "ウシ",
    "charsHira": [
      "う",
      "し"
    ],
    "charsKata": [
      "ウ",
      "シ"
    ],
    "emoji": "🐮",
    "imageSrc": "/images/characters/ushi.svg",
    "soundType": "moo",
    "soundText": "モ〜〜〜ッ！",
    "themeColor": "#e9ecef",
    "actionType": "dance-butt",
    "bgDecor": "🥛",
    "questionText": "モ〜〜！ミルクをくれる この どうぶつは？"
  },
  {
    "id": "kaeru",
    "category": "animal",
    "nameHira": "かえる",
    "nameKata": "カエル",
    "charsHira": [
      "か",
      "え",
      "る"
    ],
    "charsKata": [
      "カ",
      "エ",
      "ル"
    ],
    "emoji": "🐸",
    "imageSrc": "/images/characters/kaeru.svg",
    "soundType": "ribbit",
    "soundText": "ケロケロ〜！",
    "themeColor": "#52b788",
    "actionType": "high-jump",
    "bgDecor": "💧",
    "questionText": "ケロケロピョンピョン！この 生き物は？"
  },
  {
    "id": "panda",
    "category": "animal",
    "nameHira": "ぱんだ",
    "nameKata": "パンダ",
    "charsHira": [
      "ぱ",
      "ん",
      "だ"
    ],
    "charsKata": [
      "パ",
      "ン",
      "ダ"
    ],
    "emoji": "🐼",
    "imageSrc": "/images/characters/panda.svg",
    "soundType": "squeak",
    "soundText": "笹おいしいな〜",
    "themeColor": "#ced4da",
    "actionType": "dance-butt",
    "bgDecor": "🎋",
    "questionText": "白黒もようで笹モグモグ！この どうぶつは？"
  },
  {
    "id": "lion",
    "category": "animal",
    "nameHira": "らいおん",
    "nameKata": "ライオン",
    "charsHira": [
      "ら",
      "い",
      "お",
      "ん"
    ],
    "charsKata": [
      "ラ",
      "イ",
      "オ",
      "ン"
    ],
    "emoji": "🦁",
    "imageSrc": "/images/characters/lion.svg",
    "soundType": "roar",
    "soundText": "ガオオオーッ！",
    "themeColor": "#f39c12",
    "actionType": "super-jump",
    "bgDecor": "👑",
    "questionText": "ガオ〜〜！たてがみが かっこいい この どうぶつは？"
  },
  {
    "id": "tora",
    "category": "animal",
    "nameHira": "とら",
    "nameKata": "トラ",
    "charsHira": [
      "と",
      "ら"
    ],
    "charsKata": [
      "ト",
      "ラ"
    ],
    "emoji": "🐯",
    "imageSrc": "/images/characters/tora.svg",
    "soundType": "roar",
    "soundText": "ガオッ！しましま！",
    "themeColor": "#e67e22",
    "actionType": "super-jump",
    "bgDecor": "🐾",
    "questionText": "かっこいいシマシマ！強い この どうぶつは？"
  },
  {
    "id": "zou",
    "category": "animal",
    "nameHira": "ぞう",
    "nameKata": "ゾウ",
    "charsHira": [
      "ぞ",
      "う"
    ],
    "charsKata": [
      "ゾ",
      "ウ"
    ],
    "emoji": "🐘",
    "imageSrc": "/images/characters/zou.svg",
    "soundType": "trumpet",
    "soundText": "パオオーーン！",
    "themeColor": "#95a5a6",
    "actionType": "super-jump",
    "bgDecor": "🎪",
    "questionText": "お鼻がながーい！この どうぶつは？"
  },
  {
    "id": "saru",
    "category": "animal",
    "nameHira": "さる",
    "nameKata": "サル",
    "charsHira": [
      "さ",
      "る"
    ],
    "charsKata": [
      "サ",
      "ル"
    ],
    "emoji": "🐵",
    "imageSrc": "/images/characters/saru.svg",
    "soundType": "chatter",
    "soundText": "ウキキキッ！",
    "themeColor": "#d35400",
    "actionType": "high-jump",
    "bgDecor": "🍌",
    "questionText": "ウキキキッ！バナナが大好きな この どうぶつは？"
  },
  {
    "id": "kuma",
    "category": "animal",
    "nameHira": "くま",
    "nameKata": "クマ",
    "charsHira": [
      "く",
      "ま"
    ],
    "charsKata": [
      "ク",
      "マ"
    ],
    "emoji": "🐻",
    "imageSrc": "/images/characters/kuma.svg",
    "soundType": "growl",
    "soundText": "クマー！はちみつ！",
    "themeColor": "#795548",
    "actionType": "dance-butt",
    "bgDecor": "🍯",
    "questionText": "はちみつがだいすき！力持ちの この どうぶつは？"
  },
  {
    "id": "usagi",
    "category": "animal",
    "nameHira": "うさぎ",
    "nameKata": "ウサギ",
    "charsHira": [
      "う",
      "さ",
      "ぎ"
    ],
    "charsKata": [
      "ウ",
      "サ",
      "ギ"
    ],
    "emoji": "🐰",
    "imageSrc": "/images/characters/usagi.svg",
    "soundType": "squeak",
    "soundText": "ぴょんぴょん！",
    "themeColor": "#ffcbf2",
    "actionType": "high-jump",
    "bgDecor": "🥕",
    "questionText": "お耳がながくて ピョンピョン！この どうぶつは？"
  },
  {
    "id": "tori",
    "category": "animal",
    "nameHira": "とり",
    "nameKata": "トリ",
    "charsHira": [
      "と",
      "り"
    ],
    "charsKata": [
      "ト",
      "リ"
    ],
    "emoji": "🐦",
    "imageSrc": "/images/characters/tori.svg",
    "soundType": "chirp",
    "soundText": "ピピッ！パタパタ！",
    "themeColor": "#48cae4",
    "actionType": "high-jump",
    "bgDecor": "🌿",
    "questionText": "パタパタお空をとぶ この 生き物は？"
  },
  {
    "id": "uma",
    "category": "animal",
    "nameHira": "うま",
    "nameKata": "ウマ",
    "charsHira": [
      "う",
      "ま"
    ],
    "charsKata": [
      "ウ",
      "マ"
    ],
    "emoji": "🐴",
    "imageSrc": "/images/characters/uma.svg",
    "soundType": "neigh",
    "soundText": "ヒヒーン！パッカパッカ！",
    "themeColor": "#a0522d",
    "actionType": "zoom-dash",
    "bgDecor": "🌾",
    "questionText": "ヒヒーン！パッカパッカ走る この どうぶつは？"
  },
  {
    "id": "kirin",
    "category": "animal",
    "nameHira": "きりん",
    "nameKata": "キリン",
    "charsHira": [
      "き",
      "り",
      "ん"
    ],
    "charsKata": [
      "キ",
      "リ",
      "ン"
    ],
    "emoji": "🦒",
    "imageSrc": "/images/characters/kirin.svg",
    "soundType": "squeak",
    "soundText": "首がたかーい！",
    "themeColor": "#ffb703",
    "actionType": "super-jump",
    "bgDecor": "🍃",
    "questionText": "首が長くて背が高い！この どうぶつは？"
  },
  {
    "id": "wani",
    "category": "animal",
    "nameHira": "わに",
    "nameKata": "ワニ",
    "charsHira": [
      "わ",
      "に"
    ],
    "charsKata": [
      "ワ",
      "ニ"
    ],
    "emoji": "🐊",
    "imageSrc": "/images/characters/wani.svg",
    "soundType": "snap",
    "soundText": "ガブガブッ！",
    "themeColor": "#2d6a4f",
    "actionType": "dance-butt",
    "bgDecor": "🌊",
    "questionText": "大きなお口でガブッ！この 生き物は？"
  },
  {
    "id": "shika",
    "category": "animal",
    "nameHira": "しか",
    "nameKata": "シカ",
    "charsHira": [
      "し",
      "か"
    ],
    "charsKata": [
      "シ",
      "カ"
    ],
    "emoji": "🦌",
    "imageSrc": "/images/characters/shika.svg",
    "soundType": "squeak",
    "soundText": "ピョンピョン走る！",
    "themeColor": "#bc6c25",
    "actionType": "high-jump",
    "bgDecor": "🍁",
    "questionText": "きれいなツノがある この どうぶつは？"
  },
  {
    "id": "risu",
    "category": "animal",
    "nameHira": "りす",
    "nameKata": "リス",
    "charsHira": [
      "り",
      "す"
    ],
    "charsKata": [
      "リ",
      "ス"
    ],
    "emoji": "🐿️",
    "imageSrc": "/images/characters/risu.svg",
    "soundType": "squeak",
    "soundText": "どんぐりカリカリ！",
    "themeColor": "#dda15e",
    "actionType": "spin",
    "bgDecor": "🌰",
    "questionText": "どんぐり だいすき！この どうぶつは？"
  },
  {
    "id": "hitsuji",
    "category": "animal",
    "nameHira": "ひつじ",
    "nameKata": "ヒツジ",
    "charsHira": [
      "ひ",
      "つ",
      "じ"
    ],
    "charsKata": [
      "ヒ",
      "ツ",
      "ジ"
    ],
    "emoji": "🐑",
    "imageSrc": "/images/characters/hitsuji.svg",
    "soundType": "baa",
    "soundText": "メェ〜〜メェ〜〜",
    "themeColor": "#f8f9fa",
    "actionType": "dance-butt",
    "bgDecor": "☁️",
    "questionText": "もこもこ毛糸の この どうぶつは？"
  },
  {
    "id": "yagi",
    "category": "animal",
    "nameHira": "やぎ",
    "nameKata": "ヤギ",
    "charsHira": [
      "や",
      "ぎ"
    ],
    "charsKata": [
      "ヤ",
      "ギ"
    ],
    "emoji": "🐐",
    "imageSrc": "/images/characters/yagi.svg",
    "soundType": "baa",
    "soundText": "メェ〜！お手紙モグモグ",
    "themeColor": "#e9ecef",
    "actionType": "jump",
    "bgDecor": "📜",
    "questionText": "高いところもピョンピョン！この どうぶつは？"
  },
  {
    "id": "koara",
    "category": "animal",
    "nameHira": "こあら",
    "nameKata": "コアラ",
    "charsHira": [
      "こ",
      "あ",
      "ら"
    ],
    "charsKata": [
      "コ",
      "ア",
      "ラ"
    ],
    "emoji": "🐨",
    "imageSrc": "/images/characters/koara.svg",
    "soundType": "squeak",
    "soundText": "木にギューッ！",
    "themeColor": "#adb5bd",
    "actionType": "dance-butt",
    "bgDecor": "🐨",
    "questionText": "ユーカリの木にギューッ！この どうぶつは？"
  },
  {
    "id": "gorira",
    "category": "animal",
    "nameHira": "ごりら",
    "nameKata": "ゴリラ",
    "charsHira": [
      "ご",
      "り",
      "ら"
    ],
    "charsKata": [
      "ゴ",
      "リ",
      "ラ"
    ],
    "emoji": "🦍",
    "imageSrc": "/images/characters/gorira.svg",
    "soundType": "growl",
    "soundText": "ウホウホ！ドラミング！",
    "themeColor": "#343a40",
    "actionType": "super-jump",
    "bgDecor": "💪",
    "questionText": "胸をトントンたたく！強い この どうぶつは？"
  },
  {
    "id": "sai",
    "category": "animal",
    "nameHira": "さい",
    "nameKata": "サイ",
    "charsHira": [
      "さ",
      "い"
    ],
    "charsKata": [
      "サ",
      "イ"
    ],
    "emoji": "🦏",
    "imageSrc": "/images/characters/sai.svg",
    "soundType": "growl",
    "soundText": "ツノがかっこいい！",
    "themeColor": "#6c757d",
    "actionType": "zoom-dash",
    "bgDecor": "🛡️",
    "questionText": "鼻の上に強いツノ！この どうぶつは？"
  },
  {
    "id": "kaba",
    "category": "animal",
    "nameHira": "かば",
    "nameKata": "カバ",
    "charsHira": [
      "か",
      "ば"
    ],
    "charsKata": [
      "カ",
      "バ"
    ],
    "emoji": "🦛",
    "imageSrc": "/images/characters/kaba.svg",
    "soundType": "growl",
    "soundText": "大あくび！ア〜ン！",
    "themeColor": "#495057",
    "actionType": "dance-butt",
    "bgDecor": "💦",
    "questionText": "大きなお口をアーン！この どうぶつは？"
  },
  {
    "id": "rakuda",
    "category": "animal",
    "nameHira": "らくだ",
    "nameKata": "ラクダ",
    "charsHira": [
      "ら",
      "く",
      "だ"
    ],
    "charsKata": [
      "ラ",
      "ク",
      "ダ"
    ],
    "emoji": "🐪",
    "imageSrc": "/images/characters/rakuda.svg",
    "soundType": "growl",
    "soundText": "コブがポコッ！",
    "themeColor": "#d4a373",
    "actionType": "dance-butt",
    "bgDecor": "🏜️",
    "questionText": "お背中にコブがある この どうぶつは？"
  },
  {
    "id": "kitsune",
    "category": "animal",
    "nameHira": "きつね",
    "nameKata": "キツネ",
    "charsHira": [
      "き",
      "つ",
      "ね"
    ],
    "charsKata": [
      "キ",
      "ツ",
      "ネ"
    ],
    "emoji": "🦊",
    "imageSrc": "/images/characters/kitsune.svg",
    "soundType": "bark",
    "soundText": "コンコン♪",
    "themeColor": "#f77f00",
    "actionType": "spin",
    "bgDecor": "🌾",
    "questionText": "コンコン！お耳がピン！この どうぶつは？"
  },
  {
    "id": "penguin",
    "category": "animal",
    "nameHira": "ぺんぎん",
    "nameKata": "ペンギン",
    "charsHira": [
      "ぺ",
      "ん",
      "ぎ",
      "ん"
    ],
    "charsKata": [
      "ペ",
      "ン",
      "ギ",
      "ン"
    ],
    "emoji": "🐧",
    "imageSrc": "/images/characters/penguin.svg",
    "soundType": "chirp",
    "soundText": "ヨチヨチ歩き！",
    "themeColor": "#003049",
    "actionType": "dance-butt",
    "bgDecor": "🧊",
    "questionText": "よちよち歩き！氷の上の この 鳥は？"
  },
  {
    "id": "iruka",
    "category": "animal",
    "nameHira": "いるか",
    "nameKata": "イルカ",
    "charsHira": [
      "い",
      "る",
      "か"
    ],
    "charsKata": [
      "イ",
      "ル",
      "カ"
    ],
    "emoji": "🐬",
    "imageSrc": "/images/characters/iruka.svg",
    "soundType": "whistle",
    "soundText": "キュイ〜ン！ジャンプ！",
    "themeColor": "#48cae4",
    "actionType": "high-jump",
    "bgDecor": "🌊",
    "questionText": "海をスイスイ大ジャンプ！この 生き物は？"
  },
  {
    "id": "kujira",
    "category": "animal",
    "nameHira": "くじら",
    "nameKata": "クジラ",
    "charsHira": [
      "く",
      "じ",
      "ら"
    ],
    "charsKata": [
      "ク",
      "ジ",
      "ラ"
    ],
    "emoji": "🐳",
    "imageSrc": "/images/characters/kujira.svg",
    "soundType": "horn",
    "soundText": "プシューッ！潮吹き！",
    "themeColor": "#0077b6",
    "actionType": "super-jump",
    "bgDecor": "💦",
    "questionText": "潮をプシューッ！海で一番大きな この 生き物は？"
  },
  {
    "id": "same",
    "category": "animal",
    "nameHira": "さめ",
    "nameKata": "サメ",
    "charsHira": [
      "さ",
      "め"
    ],
    "charsKata": [
      "サ",
      "メ"
    ],
    "emoji": "🦈",
    "imageSrc": "/images/characters/same.svg",
    "soundType": "growl",
    "soundText": "するどい歯！スイスイ！",
    "themeColor": "#1d3557",
    "actionType": "zoom-dash",
    "bgDecor": "🌊",
    "questionText": "するどい歯でスイスイ！この 生き物は？"
  },
  {
    "id": "ringo",
    "category": "food",
    "nameHira": "りんご",
    "nameKata": "リンゴ",
    "charsHira": [
      "り",
      "ん",
      "ご"
    ],
    "charsKata": [
      "リ",
      "ン",
      "ゴ"
    ],
    "emoji": "🍎",
    "imageSrc": "/images/characters/ringo.svg",
    "soundType": "cheer",
    "soundText": "シャキシャキ甘い！",
    "themeColor": "#ff4d6d",
    "actionType": "jump",
    "bgDecor": "🍏",
    "questionText": "赤くて甘くてシャキシャキ！この くだものは？"
  },
  {
    "id": "mikan",
    "category": "food",
    "nameHira": "みかん",
    "nameKata": "ミカン",
    "charsHira": [
      "み",
      "か",
      "ん"
    ],
    "charsKata": [
      "ミ",
      "カ",
      "ン"
    ],
    "emoji": "🍊",
    "imageSrc": "/images/characters/mikan.svg",
    "soundType": "cheer",
    "soundText": "ジューシーおいしい！",
    "themeColor": "#ff9e00",
    "actionType": "jump",
    "bgDecor": "🍊",
    "questionText": "オレンジ色でジューシー！この くだものは？"
  },
  {
    "id": "banana",
    "category": "food",
    "nameHira": "ばなな",
    "nameKata": "バナナ",
    "charsHira": [
      "ば",
      "な",
      "な"
    ],
    "charsKata": [
      "バ",
      "ナ",
      "ナ"
    ],
    "emoji": "🍌",
    "imageSrc": "/images/characters/banana.svg",
    "soundType": "cheer",
    "soundText": "もぐもぐあまい！",
    "themeColor": "#ffd166",
    "actionType": "dance-butt",
    "bgDecor": "🍌",
    "questionText": "黄色くてあまーい！この くだものは？"
  },
  {
    "id": "suika",
    "category": "food",
    "nameHira": "すいか",
    "nameKata": "スイカ",
    "charsHira": [
      "す",
      "い",
      "か"
    ],
    "charsKata": [
      "ス",
      "イ",
      "カ"
    ],
    "emoji": "🍉",
    "imageSrc": "/images/characters/suika.svg",
    "soundType": "cheer",
    "soundText": "夏はすいか！シャキッ！",
    "themeColor": "#06d6a0",
    "actionType": "jump",
    "bgDecor": "🍉",
    "questionText": "緑と黒のしましま！この たべものは？"
  },
  {
    "id": "budo",
    "category": "food",
    "nameHira": "ぶどう",
    "nameKata": "ブドウ",
    "charsHira": [
      "ぶ",
      "ど",
      "う"
    ],
    "charsKata": [
      "ブ",
      "ド",
      "ウ"
    ],
    "emoji": "🍇",
    "imageSrc": "/images/characters/budo.svg",
    "soundType": "cheer",
    "soundText": "つぶつぶジューシー！",
    "themeColor": "#7209b7",
    "actionType": "spin",
    "bgDecor": "🍇",
    "questionText": "紫のつぶつぶ！この くだものは？"
  },
  {
    "id": "ichigo",
    "category": "food",
    "nameHira": "いちご",
    "nameKata": "イチゴ",
    "charsHira": [
      "い",
      "ち",
      "ご"
    ],
    "charsKata": [
      "イ",
      "チ",
      "ゴ"
    ],
    "emoji": "🍓",
    "imageSrc": "/images/characters/ichigo.svg",
    "soundType": "cheer",
    "soundText": "あまくておいしい！",
    "themeColor": "#e63946",
    "actionType": "jump",
    "bgDecor": "🍓",
    "questionText": "赤くてつぶつぶかわいい！この くだものは？"
  },
  {
    "id": "meron",
    "category": "food",
    "nameHira": "めろん",
    "nameKata": "メロン",
    "charsHira": [
      "め",
      "ろ",
      "ん"
    ],
    "charsKata": [
      "メ",
      "ロ",
      "ン"
    ],
    "emoji": "🍈",
    "imageSrc": "/images/characters/meron.svg",
    "soundType": "cheer",
    "soundText": "あみあみ高級メロン！",
    "themeColor": "#99d98c",
    "actionType": "jump",
    "bgDecor": "🍈",
    "questionText": "あまくてジューシー！みどりの この くだものは？"
  },
  {
    "id": "tomato",
    "category": "food",
    "nameHira": "とまと",
    "nameKata": "トマト",
    "charsHira": [
      "と",
      "ま",
      "と"
    ],
    "charsKata": [
      "ト",
      "マ",
      "ト"
    ],
    "emoji": "🍅",
    "imageSrc": "/images/characters/tomato.svg",
    "soundType": "cheer",
    "soundText": "真っ赤なトマト！",
    "themeColor": "#ef233c",
    "actionType": "jump",
    "bgDecor": "🍅",
    "questionText": "真っ赤でまあるい この お野菜は？"
  },
  {
    "id": "pan",
    "category": "food",
    "nameHira": "ぱん",
    "nameKata": "パン",
    "charsHira": [
      "ぱ",
      "ん"
    ],
    "charsKata": [
      "パ",
      "ン"
    ],
    "emoji": "🍞",
    "imageSrc": "/images/characters/pan.svg",
    "soundType": "cheer",
    "soundText": "焼きたてふかふか！",
    "themeColor": "#f4a261",
    "actionType": "jump",
    "bgDecor": "🥐",
    "questionText": "焼きたてふかふか！この たべものは？"
  },
  {
    "id": "keki",
    "category": "food",
    "nameHira": "けーき",
    "nameKata": "ケーキ",
    "charsHira": [
      "け",
      "ー",
      "き"
    ],
    "charsKata": [
      "ケ",
      "ー",
      "キ"
    ],
    "emoji": "🎂",
    "imageSrc": "/images/characters/keki.svg",
    "soundType": "cheer",
    "soundText": "ハッピーバースデー！",
    "themeColor": "#ffb4a2",
    "actionType": "super-jump",
    "bgDecor": "🎉",
    "questionText": "お誕生日のあまーい この たべものは？"
  },
  {
    "id": "aisu",
    "category": "food",
    "nameHira": "あいす",
    "nameKata": "アイス",
    "charsHira": [
      "あ",
      "い",
      "す"
    ],
    "charsKata": [
      "ア",
      "イ",
      "ス"
    ],
    "emoji": "🍨",
    "imageSrc": "/images/characters/aisu.svg",
    "soundType": "cheer",
    "soundText": "つめたくておいしい！",
    "themeColor": "#a2d2ff",
    "actionType": "spin",
    "bgDecor": "🍦",
    "questionText": "つめたくておいしい！この おやつは？"
  },
  {
    "id": "purin",
    "category": "food",
    "nameHira": "ぷりん",
    "nameKata": "プリン",
    "charsHira": [
      "ぷ",
      "り",
      "ん"
    ],
    "charsKata": [
      "プ",
      "リ",
      "ン"
    ],
    "emoji": "🍮",
    "imageSrc": "/images/characters/purin.svg",
    "soundType": "cheer",
    "soundText": "ぷるぷるおいしい！",
    "themeColor": "#ffe3a0",
    "actionType": "dance-butt",
    "bgDecor": "🍮",
    "questionText": "ぷるぷるカラメル！この おやつは？"
  },
  {
    "id": "ame",
    "category": "food",
    "nameHira": "あめ",
    "nameKata": "アメ",
    "charsHira": [
      "あ",
      "め"
    ],
    "charsKata": [
      "ア",
      "メ"
    ],
    "emoji": "🍬",
    "imageSrc": "/images/characters/ame.svg",
    "soundType": "cheer",
    "soundText": "あまーいキャンディ！",
    "themeColor": "#ffc6ff",
    "actionType": "jump",
    "bgDecor": "🍭",
    "questionText": "お口でペロペロ！あま〜い この おやつは？"
  },
  {
    "id": "onigiri",
    "category": "food",
    "nameHira": "おにぎり",
    "nameKata": "オニギリ",
    "charsHira": [
      "お",
      "に",
      "ぎ",
      "り"
    ],
    "charsKata": [
      "オ",
      "ニ",
      "ギ",
      "リ"
    ],
    "emoji": "🍙",
    "imageSrc": "/images/characters/onigiri.svg",
    "soundType": "cheer",
    "soundText": "もぐもぐおいしい！",
    "themeColor": "#f8f9fa",
    "actionType": "jump",
    "bgDecor": "🍙",
    "questionText": "さんかく海苔をまいた ぎゅっぎゅっ この ごはんは？"
  },
  {
    "id": "sushi",
    "category": "food",
    "nameHira": "すし",
    "nameKata": "スシ",
    "charsHira": [
      "す",
      "し"
    ],
    "charsKata": [
      "ス",
      "シ"
    ],
    "emoji": "🍣",
    "imageSrc": "/images/characters/sushi.svg",
    "soundType": "cheer",
    "soundText": "へい、おまち！",
    "themeColor": "#f72585",
    "actionType": "jump",
    "bgDecor": "🍣",
    "questionText": "へい、おまち！魚をのせた この たべものは？"
  },
  {
    "id": "kare",
    "category": "food",
    "nameHira": "かれー",
    "nameKata": "カレー",
    "charsHira": [
      "か",
      "れ",
      "ー"
    ],
    "charsKata": [
      "カ",
      "レ",
      "ー"
    ],
    "emoji": "🍛",
    "imageSrc": "/images/characters/kare.svg",
    "soundType": "cheer",
    "soundText": "おいしいカレーライス！",
    "themeColor": "#e76f51",
    "actionType": "jump",
    "bgDecor": "🍛",
    "questionText": "お肉や お野菜 ゴロゴロ！ごはんと食べる この ごはんは？"
  },
  {
    "id": "tsuki",
    "category": "food",
    "nameHira": "つき",
    "nameKata": "ツキ",
    "charsHira": [
      "つ",
      "き"
    ],
    "charsKata": [
      "ツ",
      "キ"
    ],
    "emoji": "🌙",
    "imageSrc": "/images/characters/tsuki.svg",
    "soundType": "cheer",
    "soundText": "お月さま、ピカピカ！",
    "themeColor": "#ffd166",
    "actionType": "spin",
    "bgDecor": "✨",
    "questionText": "夜のお空でピカピカ！これは なーんだ？"
  },
  {
    "id": "hoshi",
    "category": "food",
    "nameHira": "ほし",
    "nameKata": "ホシ",
    "charsHira": [
      "ほ",
      "し"
    ],
    "charsKata": [
      "ホ",
      "シ"
    ],
    "emoji": "⭐",
    "imageSrc": "/images/characters/hoshi.svg",
    "soundType": "cheer",
    "soundText": "きらきらお星さま！",
    "themeColor": "#ffbe0b",
    "actionType": "super-jump",
    "bgDecor": "🌟",
    "questionText": "夜のお空できらきら！これは なーんだ？"
  },
  {
    "id": "niji",
    "category": "food",
    "nameHira": "にじ",
    "nameKata": "ニジ",
    "charsHira": [
      "に",
      "じ"
    ],
    "charsKata": [
      "ニ",
      "ジ"
    ],
    "emoji": "🌈",
    "imageSrc": "/images/characters/niji.svg",
    "soundType": "cheer",
    "soundText": "きれいな七色の虹！",
    "themeColor": "#b5179e",
    "actionType": "super-jump",
    "bgDecor": "☀️",
    "questionText": "雨上がりの空に七色！これは なーんだ？"
  },
  {
    "id": "taiyo",
    "category": "food",
    "nameHira": "たいよう",
    "nameKata": "タイヨウ",
    "charsHira": [
      "た",
      "い",
      "よ",
      "う"
    ],
    "charsKata": [
      "タ",
      "イ",
      "ヨ",
      "ウ"
    ],
    "emoji": "☀️",
    "imageSrc": "/images/characters/taiyo.svg",
    "soundType": "cheer",
    "soundText": "ポカポカお日さま！",
    "themeColor": "#f77f00",
    "actionType": "spin",
    "bgDecor": "✨",
    "questionText": "お空でポカポカ！これは なーんだ？"
  }
];

const RANDOM_DISTRACTORS_HIRA = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', 'み', 'り', 'も', 'す', 'き'];
const RANDOM_DISTRACTORS_KATA = ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', 'ミ', 'リ', 'モ', 'ス', 'キ'];

// 2. 「おしゃべり 50おんずかん」50音表データ
const KANA_TABLE_DATA = [
  // あ行
  { id: 'a', hira: 'あ', kata: 'ア', word: 'アイス', emoji: '🍦', sound: 'アイスクリーム！' },
  { id: 'i', hira: 'い', kata: 'イ', word: 'いぬ', emoji: '🐶', sound: 'いぬ！ワンワン！' },
  { id: 'u', hira: 'う', kata: 'ウ', word: 'うさぎ', emoji: '🐰', imageSrc: '/images/table/usagi.svg', sound: 'うさぎ！ピョンピョン！' },
  { id: 'e', hira: 'え', kata: 'エ', word: 'えんぴつ', emoji: '✏️', sound: 'えんぴつ！カキカキ！' },
  { id: 'o', hira: 'お', kata: 'オ', word: 'おにぎり', emoji: '🍙', sound: 'おにぎり！モグモグ！' },

  // か行
  { id: 'ka', hira: 'か', kata: 'カ', word: 'かめ', emoji: '🐢', sound: 'かめ！のっしのっし！' },
  { id: 'ki', hira: 'き', kata: 'キ', word: 'きりん', emoji: '🦒', sound: 'きりん！首がながいね！' },
  { id: 'ku', hira: 'く', kata: 'ク', word: 'くるま', emoji: '🚗', sound: 'くるま！ブーーン！' },
  { id: 'ke', hira: 'け', kata: 'ケ', word: 'ケーキ', emoji: '🎂', sound: 'ケーキ！おいしそう！' },
  { id: 'ko', hira: 'こ', kata: 'コ', word: 'コアラ', emoji: '🐨', sound: 'コアラ！ユーカリだいすき！' },

  // さ行
  { id: 'sa', hira: 'さ', kata: 'サ', word: 'さかな', emoji: '🐟', sound: 'さかな！スイスイ！' },
  { id: 'shi', hira: 'し', kata: 'シ', word: 'しんごう', emoji: '🚦', imageSrc: '/images/table/shingo.svg', sound: 'しんごうき！あおは すすめ！' },
  { id: 'su', hira: 'す', kata: 'ス', word: 'すいか', emoji: '🍉', sound: 'すいか！あまーい！' },
  { id: 'se', hira: 'せ', kata: 'セ', word: 'せんぷうき', emoji: '🌀', imageSrc: '/images/table/sempuki.svg', sound: 'せんぷうき！すずしいね〜！' },
  { id: 'so', hira: 'そ', kata: 'ソ', word: 'そり', emoji: '🛷', imageSrc: '/images/table/sori.svg', sound: 'そり！シューッとはしるよ！' },

  // た行
  { id: 'ta', hira: 'た', kata: 'タ', word: 'たいよう', emoji: '☀️', sound: 'たいよう！ポカポカ！' },
  { id: 'chi', hira: 'ち', kata: 'チ', word: 'チューリップ', emoji: '🌷', sound: 'チューリップ！かわいいね！' },
  { id: 'tsu', hira: 'つ', kata: 'ツ', word: 'つき', emoji: '🌙', sound: 'おつきさま！ピカピカ！' },
  { id: 'te', hira: 'て', kata: 'テ', word: 'てんとうむし', emoji: '🐞', sound: 'てんとうむし！てくてく！' },
  { id: 'to', hira: 'と', kata: 'ト', word: 'トマト', emoji: '🍅', sound: 'トマト！まあるいね！' },

  // な行
  { id: 'na', hira: 'な', kata: 'ナ', word: 'なす', emoji: '🍆', sound: 'なすび！むらさきいろ！' },
  { id: 'ni', hira: 'に', kata: 'ニ', word: 'にじ', emoji: '🌈', sound: 'にじ！７色だね！' },
  { id: 'nu', hira: 'ぬ', kata: 'ヌ', word: 'ぬいぐるみ', emoji: '🧸', sound: 'ぬいぐるみ！ふわふわ！' },
  { id: 'ne', hira: 'ね', kata: 'ネ', word: 'ねこ', emoji: '🐱', sound: 'ねこ！ニャーオ！' },
  { id: 'no', hira: 'の', kata: 'ノ', word: 'ノート', emoji: '📓', imageSrc: '/images/table/noto.svg', sound: 'ノート！おえかきしよう！' },

  // は行
  { id: 'ha', hira: 'は', kata: 'ハ', word: 'はな', emoji: '🌸', sound: 'おはな！いいにおい！' },
  { id: 'hi', hira: 'ひ', kata: 'ヒ', word: 'ひこうき', emoji: '✈️', sound: 'ひこうき！ビュイーン！' },
  { id: 'fu', hira: 'ふ', kata: 'フ', word: 'ふうせん', emoji: '🎈', sound: 'ふうせん！ふわふわ！' },
  { id: 'he', hira: 'へ', kata: 'ヘ', word: 'へび', emoji: '🐍', sound: 'へび！ニョロニョロ！' },
  { id: 'ho', hira: 'ほ', kata: 'ホ', word: 'ほし', emoji: '⭐', sound: 'きらきら おほしさま！' },

  // ま行
  { id: 'ma', hira: 'ま', kata: 'マ', word: 'マイク', emoji: '🎤', sound: 'マイク！ラララ〜♪' },
  { id: 'mi', hira: 'み', kata: 'ミ', word: 'みかん', emoji: '🍊', sound: 'みかん！おいしいね！' },
  { id: 'mu', hira: 'む', kata: 'ム', word: 'むらさき', emoji: '🟣', imageSrc: '/images/table/murasaki.svg', sound: 'むらさき！きれいな いろだね！' },
  { id: 'me', hira: 'め', kata: 'メ', word: 'めがね', emoji: '👓', sound: 'めがね！よくみえる！' },
  { id: 'mo', hira: 'も', kata: 'モ', word: 'もも', emoji: '🍑', sound: 'もも！ピンクいろ！' },

  // や行
  { id: 'ya', hira: 'や', kata: 'ヤ', word: 'やま', emoji: '⛰️', sound: 'おやま！たかーい！' },
  { id: 'yu', hira: 'ゆ', kata: 'ユ', word: 'ゆきだるま', emoji: '⛄', sound: 'ゆきだるま！コロコロ！' },
  { id: 'yo', hira: 'よ', kata: 'ヨ', word: 'ヨット', emoji: '⛵', imageSrc: '/images/table/yotto.svg', sound: 'ヨット！風にのってスイスイ！' },

  // ら行
  { id: 'ra', hira: 'ら', kata: 'ラ', word: 'ライオン', emoji: '🦁', sound: 'ライオン！ガオ〜ッ！' },
  { id: 'ri', hira: 'り', kata: 'リ', word: 'りんご', emoji: '🍎', sound: 'まっかな りんご！' },
  { id: 'ru', hira: 'る', kata: 'ル', word: 'ルビー', emoji: '💎', imageSrc: '/images/table/ruby.svg', sound: 'ルビー！あかいほうせき！' },
  { id: 're', hira: 'れ', kata: 'レ', word: 'レモン', emoji: '🍋', sound: 'レモン！すっぱーい！' },
  { id: 'ro', hira: 'ろ', kata: 'ロ', word: 'ロケット', emoji: '🚀', sound: 'ロケット！３・２・１発射！' },

  // わ行
  { id: 'wa', hira: 'わ', kata: 'ワ', word: 'わに', emoji: '🐊', sound: 'わに！ガブガブ！' },
  { id: 'wo', hira: 'を', kata: 'ヲ', word: 'ほんをよむ', emoji: '📖', imageSrc: '/images/table/hon_wo_yomu.svg', sound: 'ほんをよむの、を！たのしいね！' },
  { id: 'nn', hira: 'ん', kata: 'ン', word: 'パンダのん', emoji: '🐼', sound: 'パンダの ん！' }
];

// 行ごとのグループ（タブ表示用）
const KANA_ROWS = [
  { name: 'あ〜お', chars: ['あ', 'い', 'う', 'え', 'お'] },
  { name: 'か〜こ', chars: ['か', 'き', 'く', 'け', 'こ'] },
  { name: 'さ〜そ', chars: ['さ', 'し', 'す', 'せ', 'そ'] },
  { name: 'た〜と', chars: ['た', 'ち', 'つ', 'て', 'と'] },
  { name: 'な〜の', chars: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { name: 'は〜ほ', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { name: 'ま〜も', chars: ['ま', 'み', 'む', 'め', 'も'] },
  { name: 'や・ゆ・よ', chars: ['や', 'ゆ', 'よ'] },
  { name: 'ら〜ろ', chars: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { name: 'わ・を・ん', chars: ['わ', 'を', 'ん'] }
];
