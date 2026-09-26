// 4歳児向け知育ゲーム データ集

// 1. 「うごく！どうぶつ・のりもの 文字あつめ」データ
const CHARACTERS_DATA = [
  {
    id: 'buta',
    nameHira: 'ぶた',
    nameKata: 'ブタ',
    charsHira: ['ぶ', 'た'],
    charsKata: ['ブ', 'タ'],
    emoji: '🐷',
    soundType: 'oink',
    soundText: 'ブヒブヒ〜ッ♪',
    themeColor: '#ffb3c6',
    actionType: 'dance-butt',
    bgDecor: '🌸'
  },
  {
    id: 'inu',
    nameHira: 'いぬ',
    nameKata: 'イヌ',
    charsHira: ['い', 'ぬ'],
    charsKata: ['イ', 'ヌ'],
    emoji: '🐶',
    soundType: 'bark',
    soundText: 'ワンワン！',
    themeColor: '#ffd166',
    actionType: 'jump',
    bgDecor: '🦴'
  },
  {
    id: 'neko',
    nameHira: 'ねこ',
    nameKata: 'ネコ',
    charsHira: ['ね', 'こ'],
    charsKata: ['ネ', 'コ'],
    emoji: '🐱',
    soundType: 'meow',
    soundText: 'ニャーオ♪',
    themeColor: '#cdb4db',
    actionType: 'spin',
    bgDecor: '🐟'
  },
  {
    id: 'ushi',
    nameHira: 'うし',
    nameKata: 'ウシ',
    charsHira: ['う', 'し'],
    charsKata: ['ウ', 'シ'],
    emoji: '🐮',
    soundType: 'moo',
    soundText: 'モ〜〜ッ！',
    themeColor: '#b7e4c7',
    actionType: 'dance-butt',
    bgDecor: '🍀'
  },
  {
    id: 'kuruma',
    nameHira: 'くるま',
    nameKata: 'クルマ',
    charsHira: ['く', 'る', 'ま'],
    charsKata: ['ク', 'ル', 'マ'],
    emoji: '🚗',
    soundType: 'vroom',
    soundText: 'ブーーン！💨',
    themeColor: '#90e0ef',
    actionType: 'zoom-dash',
    bgDecor: '🚦'
  },
  {
    id: 'kaeru',
    nameHira: 'かえる',
    nameKata: 'カエル',
    charsHira: ['か', 'え', 'る'],
    charsKata: ['カ', 'エ', 'ル'],
    emoji: '🐸',
    soundType: 'ribbit',
    soundText: 'ケロケロ〜♪',
    themeColor: '#a7c957',
    actionType: 'high-jump',
    bgDecor: '💧'
  },
  {
    id: 'panda',
    nameHira: 'ぱんだ',
    nameKata: 'パンダ',
    charsHira: ['ぱ', 'ん', 'だ'],
    charsKata: ['パ', 'ン', 'ダ'],
    emoji: '🐼',
    soundType: 'giggle',
    soundText: 'ヤッター！',
    themeColor: '#e0aaff',
    actionType: 'roll',
    bgDecor: '🎋'
  },
  {
    id: 'lion',
    nameHira: 'らいおん',
    nameKata: 'ライオン',
    charsHira: ['ら', 'い', 'お', 'ん'],
    charsKata: ['ラ', 'イ', 'オ', 'ン'],
    emoji: '🦁',
    soundType: 'roar',
    soundText: 'ガオ〜〜ッ！',
    themeColor: '#ffaa00',
    actionType: 'super-jump',
    bgDecor: '👑'
  },
  {
    id: 'roketto',
    nameHira: 'ろけっと',
    nameKata: 'ロケット',
    charsHira: ['ろ', 'け', 'っ', 'と'],
    charsKata: ['ロ', 'ケ', 'ッ', 'ト'],
    emoji: '🚀',
    soundType: 'rocket-fly',
    soundText: '発射ー！シューン！',
    themeColor: '#ff758f',
    actionType: 'launch',
    bgDecor: '⭐'
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
