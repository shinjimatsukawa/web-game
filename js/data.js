// 4歳児向け「動く！どうぶつ・のりもの 文字あつめ」データ集

const CHARACTERS_DATA = [
  {
    id: 'buta',
    nameHira: 'ぶた',
    nameKata: 'ブタ',
    charsHira: ['ぶ', 'た'],
    charsKata: ['ブ', 'タ'],
    emoji: '🐷',
    soundType: 'oink', // ブヒブヒ
    soundText: 'ブヒブヒ〜ッ♪',
    themeColor: '#ffb3c6',
    actionType: 'dance-butt', // お尻フリフリ
    bgDecor: '🌸'
  },
  {
    id: 'inu',
    nameHira: 'いぬ',
    nameKata: 'イヌ',
    charsHira: ['い', 'ぬ'],
    charsKata: ['イ', 'ヌ'],
    emoji: '🐶',
    soundType: 'bark', // ワンワン
    soundText: 'ワンワン！',
    themeColor: '#ffd166',
    actionType: 'jump', // ピョンピョン
    bgDecor: '🦴'
  },
  {
    id: 'neko',
    nameHira: 'ねこ',
    nameKata: 'ネコ',
    charsHira: ['ね', 'こ'],
    charsKata: ['ネ', 'コ'],
    emoji: '🐱',
    soundType: 'meow', // ニャーオ
    soundText: 'ニャーオ♪',
    themeColor: '#cdb4db',
    actionType: 'spin', // くるっと回転
    bgDecor: '🐟'
  },
  {
    id: 'ushi',
    nameHira: 'うし',
    nameKata: 'ウシ',
    charsHira: ['う', 'し'],
    charsKata: ['ウ', 'シ'],
    emoji: '🐮',
    soundType: 'moo', // モー
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
    soundType: 'vroom', // ブーン
    soundText: 'ブーーン！💨',
    themeColor: '#90e0ef',
    actionType: 'zoom-dash', // 画面を走り抜ける
    bgDecor: '🚦'
  },
  {
    id: 'kaeru',
    nameHira: 'かえる',
    nameKata: 'カエル',
    charsHira: ['か', 'え', 'る'],
    charsKata: ['カ', 'エ', 'ル'],
    emoji: '🐸',
    soundType: 'ribbit', // ケロケロ
    soundText: 'ケロケロ〜♪',
    themeColor: '#a7c957',
    actionType: 'high-jump', // 大ジャンプ
    bgDecor: '💧'
  },
  {
    id: 'panda',
    nameHira: 'ぱんだ',
    nameKata: 'パンダ',
    charsHira: ['ぱ', 'ん', 'だ'],
    charsKata: ['パ', 'ン', 'ダ'],
    emoji: '🐼',
    soundType: 'giggle', // クスクス
    soundText: 'ヤッター！',
    themeColor: '#e0aaff',
    actionType: 'roll', // ゴロゴロ転がる
    bgDecor: '🎋'
  },
  {
    id: 'lion',
    nameHira: 'らいおん',
    nameKata: 'ライオン',
    charsHira: ['ら', 'い', 'お', 'ん'],
    charsKata: ['ラ', 'イ', 'オ', 'ン'],
    emoji: '🦁',
    soundType: 'roar', // ガオ〜
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
    soundType: 'rocket-fly', // シューン
    soundText: '発射ー！シューン！',
    themeColor: '#ff758f',
    actionType: 'launch', // 宇宙へ飛び出す
    bgDecor: '⭐'
  }
];

// ダミー文字プール（シャボン玉に混ぜる文字）
const RANDOM_DISTRACTORS_HIRA = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', 'み', 'り', 'も', 'す', 'き'];
const RANDOM_DISTRACTORS_KATA = ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', 'ミ', 'リ', 'モ', 'ス', 'キ'];
