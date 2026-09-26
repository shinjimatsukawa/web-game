// 4歳児向け知育ゲーム データ集（くるま・どうぶつ・たべもの 全75種類）

// 1. 「うごく！文字あつめ」データ（全75種類：絵文字すべて一意・恐竜削除済み）
const CHARACTERS_DATA = [
  {
    "id": "shobo",
    "category": "vehicle",
    "nameHira": "しょうぼう",
    "nameKata": "ショウボウ",
    "charsHira": [
      "し",
      "ょ",
      "う",
      "ぼ",
      "う"
    ],
    "charsKata": [
      "シ",
      "ョ",
      "ウ",
      "ボ",
      "ウ"
    ],
    "emoji": "🚒",
    "soundType": "horn",
    "soundText": "ウ〜カンカン！放水！",
    "themeColor": "#ff4d6d",
    "actionType": "zoom-dash",
    "bgDecor": "💦"
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
    "soundType": "horn",
    "soundText": "ウ〜〜！パトロール！",
    "themeColor": "#3a86ff",
    "actionType": "zoom-dash",
    "bgDecor": "🚨"
  },
  {
    "id": "resukyu",
    "category": "vehicle",
    "nameHira": "れすきゅー",
    "nameKata": "レスキュー",
    "charsHira": [
      "れ",
      "す",
      "き",
      "ゅ",
      "ー"
    ],
    "charsKata": [
      "レ",
      "ス",
      "キ",
      "ュ",
      "ー"
    ],
    "emoji": "🚑",
    "soundType": "horn",
    "soundText": "ピーポーピーポー！",
    "themeColor": "#ff758f",
    "actionType": "zoom-dash",
    "bgDecor": "🩹"
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
    "soundType": "vroom",
    "soundText": "ぷっぷー！乗ってね！",
    "themeColor": "#ffb703",
    "actionType": "dance-butt",
    "bgDecor": "🚏"
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
    "soundType": "vroom",
    "soundText": "どこへ行きますか？",
    "themeColor": "#ffd166",
    "actionType": "zoom-dash",
    "bgDecor": "🚖"
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
    "soundType": "vroom",
    "soundText": "荷物を運ぶよ！",
    "themeColor": "#06d6a0",
    "actionType": "zoom-dash",
    "bgDecor": "📦"
  },
  {
    "id": "danpu",
    "category": "vehicle",
    "nameHira": "だんぷ",
    "nameKata": "ダンプ",
    "charsHira": [
      "だ",
      "ん",
      "ぷ"
    ],
    "charsKata": [
      "ダ",
      "ン",
      "プ"
    ],
    "emoji": "🚛",
    "soundType": "vroom",
    "soundText": "荷台がガッターン！",
    "themeColor": "#fb8500",
    "actionType": "dance-butt",
    "bgDecor": "🪨"
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
    "soundType": "vroom",
    "soundText": "畑をたがやすよ！",
    "themeColor": "#ffbe0b",
    "actionType": "dance-butt",
    "bgDecor": "🌾"
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
    "soundType": "vroom",
    "soundText": "ウィーン！たかーい！",
    "themeColor": "#ff006e",
    "actionType": "super-jump",
    "bgDecor": "🧱"
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
    "soundType": "vroom",
    "soundText": "シュッシュッポッポー！",
    "themeColor": "#2b2d42",
    "actionType": "zoom-dash",
    "bgDecor": "💨"
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
    "soundType": "vroom",
    "soundText": "ガタゴトガタゴト！",
    "themeColor": "#52b788",
    "actionType": "zoom-dash",
    "bgDecor": "🛤️"
  },
  {
    "id": "chikatetsu",
    "category": "vehicle",
    "nameHira": "ちかてつ",
    "nameKata": "チカテツ",
    "charsHira": [
      "ち",
      "か",
      "て",
      "つ"
    ],
    "charsKata": [
      "チ",
      "カ",
      "テ",
      "ツ"
    ],
    "emoji": "🚇",
    "soundType": "vroom",
    "soundText": "地下をびゅーん！",
    "themeColor": "#4895ef",
    "actionType": "zoom-dash",
    "bgDecor": "🚇"
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
    "soundType": "jet",
    "soundText": "ビュイーーーッ！",
    "themeColor": "#caf0f8",
    "actionType": "zoom-dash",
    "bgDecor": "☁️"
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
    "soundType": "jet",
    "soundText": "パタパタ空をとぶ！",
    "themeColor": "#e76f51",
    "actionType": "high-jump",
    "bgDecor": "🌤️"
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
    "soundType": "jet",
    "soundText": "３・２・１発射！",
    "themeColor": "#ff758f",
    "actionType": "super-jump",
    "bgDecor": "⭐"
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
    "soundType": "horn",
    "soundText": "ボォーーッ！波スイスイ！",
    "themeColor": "#8ecae6",
    "actionType": "dance-butt",
    "bgDecor": "⚓"
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
    "soundType": "vroom",
    "soundText": "びゅんびゅん走る！",
    "themeColor": "#00b4d8",
    "actionType": "zoom-dash",
    "bgDecor": "🌊"
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
    "soundType": "vroom",
    "soundText": "風にのってスイスイ！",
    "themeColor": "#90e0ef",
    "actionType": "dance-butt",
    "bgDecor": "🌬️"
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
    "soundType": "vroom",
    "soundText": "ブルルン！はやい！",
    "themeColor": "#d90429",
    "actionType": "zoom-dash",
    "bgDecor": "🏁"
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
    "soundType": "vroom",
    "soundText": "ブーーン！ドライブ！",
    "themeColor": "#ef233c",
    "actionType": "zoom-dash",
    "bgDecor": "🚦"
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
    "soundType": "vroom",
    "soundText": "雪の上をシューッ！",
    "themeColor": "#8338ec",
    "actionType": "zoom-dash",
    "bgDecor": "❄️"
  },
  {
    "id": "jipu",
    "category": "vehicle",
    "nameHira": "じーぷ",
    "nameKata": "ジープ",
    "charsHira": [
      "じ",
      "ー",
      "ぷ"
    ],
    "charsKata": [
      "ジ",
      "ー",
      "プ"
    ],
    "emoji": "🚙",
    "soundType": "vroom",
    "soundText": "山道もへっちゃら！",
    "themeColor": "#2b9348",
    "actionType": "jump",
    "bgDecor": "🌲"
  },
  {
    "id": "nozomi",
    "category": "vehicle",
    "nameHira": "のぞみ",
    "nameKata": "ノゾミ",
    "charsHira": [
      "の",
      "ぞ",
      "み"
    ],
    "charsKata": [
      "ノ",
      "ゾ",
      "ミ"
    ],
    "emoji": "🚅",
    "soundType": "jet",
    "soundText": "新幹線ビュイーン！",
    "themeColor": "#0077b6",
    "actionType": "zoom-dash",
    "bgDecor": "🚄"
  },
  {
    "id": "hayabusa",
    "category": "vehicle",
    "nameHira": "はやぶさ",
    "nameKata": "ハヤブサ",
    "charsHira": [
      "は",
      "や",
      "ぶ",
      "さ"
    ],
    "charsKata": [
      "ハ",
      "ヤ",
      "ブ",
      "サ"
    ],
    "emoji": "🚄",
    "soundType": "jet",
    "soundText": "みどり色の新幹線！",
    "themeColor": "#55a630",
    "actionType": "zoom-dash",
    "bgDecor": "⚡"
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
    "soundType": "jet",
    "soundText": "ふわふわ空をとぶ！",
    "themeColor": "#e0aaff",
    "actionType": "high-jump",
    "bgDecor": "☁️"
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
    "soundType": "oink",
    "soundText": "ブヒブヒ〜♪",
    "themeColor": "#ffb3c6",
    "actionType": "dance-butt",
    "bgDecor": "🌸"
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
    "soundType": "bark",
    "soundText": "ワンワン！",
    "themeColor": "#ffd166",
    "actionType": "super-jump",
    "bgDecor": "🦴"
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
    "soundType": "meow",
    "soundText": "ニャオ〜ン♪",
    "themeColor": "#f8edeb",
    "actionType": "spin",
    "bgDecor": "🐟"
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
    "soundType": "moo",
    "soundText": "モ〜〜〜ッ！",
    "themeColor": "#e9ecef",
    "actionType": "dance-butt",
    "bgDecor": "🥛"
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
    "soundType": "ribbit",
    "soundText": "ケロケロ〜！",
    "themeColor": "#52b788",
    "actionType": "high-jump",
    "bgDecor": "💧"
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
    "soundType": "squeak",
    "soundText": "笹おいしいな〜",
    "themeColor": "#ced4da",
    "actionType": "dance-butt",
    "bgDecor": "🎋"
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
    "soundType": "roar",
    "soundText": "ガオオオーッ！",
    "themeColor": "#f39c12",
    "actionType": "super-jump",
    "bgDecor": "👑"
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
    "soundType": "roar",
    "soundText": "ガオッ！しましま！",
    "themeColor": "#e67e22",
    "actionType": "super-jump",
    "bgDecor": "🐾"
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
    "soundType": "trumpet",
    "soundText": "パオオーーン！",
    "themeColor": "#95a5a6",
    "actionType": "super-jump",
    "bgDecor": "🎪"
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
    "soundType": "chatter",
    "soundText": "ウキキキッ！",
    "themeColor": "#d35400",
    "actionType": "high-jump",
    "bgDecor": "🍌"
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
    "soundType": "growl",
    "soundText": "クマー！はちみつ！",
    "themeColor": "#795548",
    "actionType": "dance-butt",
    "bgDecor": "🍯"
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
    "soundType": "squeak",
    "soundText": "ぴょんぴょん！",
    "themeColor": "#ffcbf2",
    "actionType": "high-jump",
    "bgDecor": "🥕"
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
    "soundType": "chirp",
    "soundText": "ピピッ！パタパタ！",
    "themeColor": "#48cae4",
    "actionType": "high-jump",
    "bgDecor": "🌿"
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
    "soundType": "neigh",
    "soundText": "ヒヒーン！パッカパッカ！",
    "themeColor": "#a0522d",
    "actionType": "zoom-dash",
    "bgDecor": "🌾"
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
    "soundType": "squeak",
    "soundText": "首がたかーい！",
    "themeColor": "#ffb703",
    "actionType": "super-jump",
    "bgDecor": "🍃"
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
    "soundType": "snap",
    "soundText": "ガブガブッ！",
    "themeColor": "#2d6a4f",
    "actionType": "dance-butt",
    "bgDecor": "🌊"
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
    "soundType": "squeak",
    "soundText": "ピョンピョン走る！",
    "themeColor": "#bc6c25",
    "actionType": "high-jump",
    "bgDecor": "🍁"
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
    "soundType": "squeak",
    "soundText": "どんぐりカリカリ！",
    "themeColor": "#dda15e",
    "actionType": "spin",
    "bgDecor": "🌰"
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
    "soundType": "baa",
    "soundText": "メェ〜〜メェ〜〜",
    "themeColor": "#f8f9fa",
    "actionType": "dance-butt",
    "bgDecor": "☁️"
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
    "soundType": "baa",
    "soundText": "メェ〜！お手紙モグモグ",
    "themeColor": "#e9ecef",
    "actionType": "jump",
    "bgDecor": "📜"
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
    "soundType": "squeak",
    "soundText": "木にギューッ！",
    "themeColor": "#adb5bd",
    "actionType": "dance-butt",
    "bgDecor": "🐨"
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
    "soundType": "growl",
    "soundText": "ウホウホ！ドラミング！",
    "themeColor": "#343a40",
    "actionType": "super-jump",
    "bgDecor": "💪"
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
    "soundType": "growl",
    "soundText": "ツノがかっこいい！",
    "themeColor": "#6c757d",
    "actionType": "zoom-dash",
    "bgDecor": "🛡️"
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
    "soundType": "growl",
    "soundText": "大あくび！ア〜ン！",
    "themeColor": "#495057",
    "actionType": "dance-butt",
    "bgDecor": "💦"
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
    "soundType": "growl",
    "soundText": "コブがポコッ！",
    "themeColor": "#d4a373",
    "actionType": "dance-butt",
    "bgDecor": "🏜️"
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
    "soundType": "bark",
    "soundText": "コンコン♪",
    "themeColor": "#f77f00",
    "actionType": "spin",
    "bgDecor": "🌾"
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
    "soundType": "chirp",
    "soundText": "ヨチヨチ歩き！",
    "themeColor": "#003049",
    "actionType": "dance-butt",
    "bgDecor": "🧊"
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
    "soundType": "whistle",
    "soundText": "キュイ〜ン！ジャンプ！",
    "themeColor": "#48cae4",
    "actionType": "high-jump",
    "bgDecor": "🌊"
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
    "soundType": "horn",
    "soundText": "プシューッ！潮吹き！",
    "themeColor": "#0077b6",
    "actionType": "super-jump",
    "bgDecor": "💦"
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
    "soundType": "growl",
    "soundText": "するどい歯！スイスイ！",
    "themeColor": "#1d3557",
    "actionType": "zoom-dash",
    "bgDecor": "🌊"
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
    "soundType": "cheer",
    "soundText": "シャキシャキ甘い！",
    "themeColor": "#ff4d6d",
    "actionType": "jump",
    "bgDecor": "🍏"
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
    "soundType": "cheer",
    "soundText": "ジューシーおいしい！",
    "themeColor": "#ff9e00",
    "actionType": "jump",
    "bgDecor": "🍊"
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
    "soundType": "cheer",
    "soundText": "もぐもぐあまい！",
    "themeColor": "#ffd166",
    "actionType": "dance-butt",
    "bgDecor": "🍌"
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
    "soundType": "cheer",
    "soundText": "夏はすいか！シャキッ！",
    "themeColor": "#06d6a0",
    "actionType": "jump",
    "bgDecor": "🍉"
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
    "soundType": "cheer",
    "soundText": "つぶつぶジューシー！",
    "themeColor": "#7209b7",
    "actionType": "spin",
    "bgDecor": "🍇"
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
    "soundType": "cheer",
    "soundText": "あまくておいしい！",
    "themeColor": "#e63946",
    "actionType": "jump",
    "bgDecor": "🍓"
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
    "soundType": "cheer",
    "soundText": "あみあみ高級メロン！",
    "themeColor": "#99d98c",
    "actionType": "jump",
    "bgDecor": "🍈"
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
    "soundType": "cheer",
    "soundText": "真っ赤なトマト！",
    "themeColor": "#ef233c",
    "actionType": "jump",
    "bgDecor": "🍅"
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
    "soundType": "cheer",
    "soundText": "焼きたてふかふか！",
    "themeColor": "#f4a261",
    "actionType": "jump",
    "bgDecor": "🥐"
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
    "soundType": "cheer",
    "soundText": "ハッピーバースデー！",
    "themeColor": "#ffb4a2",
    "actionType": "super-jump",
    "bgDecor": "🎉"
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
    "soundType": "cheer",
    "soundText": "つめたくておいしい！",
    "themeColor": "#a2d2ff",
    "actionType": "spin",
    "bgDecor": "🍦"
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
    "soundType": "cheer",
    "soundText": "ぷるぷるおいしい！",
    "themeColor": "#ffe3a0",
    "actionType": "dance-butt",
    "bgDecor": "🍮"
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
    "soundType": "cheer",
    "soundText": "あまーいキャンディ！",
    "themeColor": "#ffc6ff",
    "actionType": "jump",
    "bgDecor": "🍭"
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
    "soundType": "cheer",
    "soundText": "もぐもぐおいしい！",
    "themeColor": "#f8f9fa",
    "actionType": "jump",
    "bgDecor": "🍙"
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
    "soundType": "cheer",
    "soundText": "へい、おまち！",
    "themeColor": "#f72585",
    "actionType": "jump",
    "bgDecor": "🍣"
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
    "soundType": "cheer",
    "soundText": "おいしいカレーライス！",
    "themeColor": "#e76f51",
    "actionType": "jump",
    "bgDecor": "🍛"
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
    "soundType": "cheer",
    "soundText": "お月さま、ピカピカ！",
    "themeColor": "#ffd166",
    "actionType": "spin",
    "bgDecor": "✨"
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
    "soundType": "cheer",
    "soundText": "きらきらお星さま！",
    "themeColor": "#ffbe0b",
    "actionType": "super-jump",
    "bgDecor": "🌟"
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
    "soundType": "cheer",
    "soundText": "きれいな七色の虹！",
    "themeColor": "#b5179e",
    "actionType": "super-jump",
    "bgDecor": "☀️"
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
    "soundType": "cheer",
    "soundText": "ポカポカお日さま！",
    "themeColor": "#f77f00",
    "actionType": "spin",
    "bgDecor": "✨"
  }
];

const RANDOM_DISTRACTORS_HIRA = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', 'み', 'り', 'も', 'す', 'き'];
const RANDOM_DISTRACTORS_KATA = ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', 'ミ', 'リ', 'モ', 'ス', 'キ'];

// 2. 「おしゃべり 50おんずかん」50音表データ
const KANA_TABLE_DATA = [
  // あ行
  { id: 'a', hira: 'あ', kata: 'ア', word: 'アイス', emoji: '🍦', sound: 'アイスクリーム！' },
  { id: 'i', hira: 'い', kata: 'イ', word: 'いぬ', emoji: '🐶', sound: 'いぬ！ワンワン！' },
  { id: 'u', hira: 'う', kata: 'ウ', word: 'うさぎ', emoji: '🐰', sound: 'うさぎ！ピョンピョン！' },
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
  { id: 'shi', hira: 'し', kata: 'シ', word: 'しんかんせん', emoji: '🚄', sound: 'しんかんせん！はやーい！' },
  { id: 'su', hira: 'す', kata: 'ス', word: 'すいか', emoji: '🍉', sound: 'すいか！あまーい！' },
  { id: 'se', hira: 'せ', kata: 'セ', word: 'せみ', emoji: '🪲', sound: 'せみ！ミーンミーン！' },
  { id: 'so', hira: 'そ', kata: 'ソ', word: 'そら', emoji: '🌈', sound: 'にじの そら！きれいだね！' },

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
  { id: 'no', hira: 'の', kata: 'ノ', word: 'のりまき', emoji: '🍣', sound: 'のりまき！パクッ！' },

  // は行
  { id: 'ha', hira: 'は', kata: 'ハ', word: 'はな', emoji: '🌸', sound: 'おはな！いいにおい！' },
  { id: 'hi', hira: 'ひ', kata: 'ヒ', word: 'ひこうき', emoji: '✈️', sound: 'ひこうき！ビュイーン！' },
  { id: 'fu', hira: 'ふ', kata: 'フ', word: 'ふうせん', emoji: '🎈', sound: 'ふうせん！ふわふわ！' },
  { id: 'he', hira: 'へ', kata: 'ヘ', word: 'へび', emoji: '🐍', sound: 'へび！ニョロニョロ！' },
  { id: 'ho', hira: 'ほ', kata: 'ホ', word: 'ほし', emoji: '⭐', sound: 'きらきら おほしさま！' },

  // ま行
  { id: 'ma', hira: 'ま', kata: 'マ', word: 'マイク', emoji: '🎤', sound: 'マイク！ラララ〜♪' },
  { id: 'mi', hira: 'み', kata: 'ミ', word: 'みかん', emoji: '🍊', sound: 'みかん！おいしいね！' },
  { id: 'mu', hira: 'む', kata: 'ム', word: 'むしば', emoji: '🦷', sound: 'はみがき シャカシャカ！' },
  { id: 'me', hira: 'め', kata: 'メ', word: 'めがね', emoji: '👓', sound: 'めがね！よくみえる！' },
  { id: 'mo', hira: 'も', kata: 'モ', word: 'もも', emoji: '🍑', sound: 'もも！ピンクいろ！' },

  // や行
  { id: 'ya', hira: 'や', kata: 'ヤ', word: 'やま', emoji: '⛰️', sound: 'おやま！たかーい！' },
  { id: 'yu', hira: 'ゆ', kata: 'ユ', word: 'ゆきだるま', emoji: '⛄', sound: 'ゆきだるま！コロコロ！' },
  { id: 'yo', hira: 'よ', kata: 'ヨ', word: 'ようちえん', emoji: '🏫', sound: 'ようちえん！たのしいね！' },

  // ら行
  { id: 'ra', hira: 'ら', kata: 'ラ', word: 'ライオン', emoji: '🦁', sound: 'ライオン！ガオ〜ッ！' },
  { id: 'ri', hira: 'り', kata: 'リ', word: 'りんご', emoji: '🍎', sound: 'まっかな りんご！' },
  { id: 'ru', hira: 'る', kata: 'ル', word: 'ルビー', emoji: '💎', sound: 'ルビー！キラキラ！' },
  { id: 're', hira: 'れ', kata: 'レ', word: 'レモン', emoji: '🍋', sound: 'レモン！すっぱーい！' },
  { id: 'ro', hira: 'ろ', kata: 'ロ', word: 'ロケット', emoji: '🚀', sound: 'ロケット！３・２・１発射！' },

  // わ行
  { id: 'wa', hira: 'わ', kata: 'ワ', word: 'わに', emoji: '🐊', sound: 'わに！ガブガブ！' },
  { id: 'wo', hira: 'を', kata: 'ヲ', word: '「手を洗う」のを', emoji: '🖐️', sound: 'てをあらうの を！キレイキレイ！' },
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
