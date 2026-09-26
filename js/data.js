// 4歳児向け ひらがな・カタカナ・単語データ集

const KANA_DATA = [
  // あ行
  { id: 'a', hira: 'あ', kata: 'ア', word: 'アイス', wordHira: 'あいす', emoji: '🍦', romaji: 'a' },
  { id: 'i', hira: 'い', kata: 'イ', word: 'いちご', wordHira: 'いちご', emoji: '🍓', romaji: 'i' },
  { id: 'u', hira: 'う', kata: 'ウ', word: 'うさぎ', wordHira: 'うさぎ', emoji: '🐰', romaji: 'u' },
  { id: 'e', hira: 'え', kata: 'エ', word: 'えんぴつ', wordHira: 'えんぴつ', emoji: '✏️', romaji: 'e' },
  { id: 'o', hira: 'お', kata: 'オ', word: 'おにぎり', wordHira: 'おにぎり', emoji: '🍙', romaji: 'o' },

  // か行
  { id: 'ka', hira: 'か', kata: 'カ', word: 'かめ', wordHira: 'かめ', emoji: '🐢', romaji: 'ka' },
  { id: 'ki', hira: 'き', kata: 'キ', word: 'きりん', wordHira: 'きりん', emoji: '🦒', romaji: 'ki' },
  { id: 'ku', hira: 'く', kata: 'ク', word: 'くるま', wordHira: 'くるま', emoji: '🚗', romaji: 'ku' },
  { id: 'ke', hira: 'け', kata: 'ケ', word: 'けーき', wordHira: 'けーき', emoji: '🎂', romaji: 'ke' },
  { id: 'ko', hira: 'こ', kata: 'コ', word: 'こあら', wordHira: 'こあら', emoji: '🐨', romaji: 'ko' },

  // さ行
  { id: 'sa', hira: 'さ', kata: 'サ', word: 'さかな', wordHira: 'さかな', emoji: '🐟', romaji: 'sa' },
  { id: 'shi', hira: 'し', kata: 'シ', word: 'しんかんせん', wordHira: 'しんかんせん', emoji: '🚄', romaji: 'shi' },
  { id: 'su', hira: 'す', kata: 'ス', word: 'すいか', wordHira: 'すいか', emoji: '🍉', romaji: 'su' },
  { id: 'se', hira: 'せ', kata: 'セ', word: 'せみ', wordHira: 'せみ', emoji: '🪲', romaji: 'se' },
  { id: 'so', hira: 'そ', kata: 'ソ', word: 'そら', wordHira: 'そら', emoji: '🌈', romaji: 'so' },

  // た行
  { id: 'ta', hira: 'た', kata: 'タ', word: 'たいよう', wordHira: 'たいよう', emoji: '☀️', romaji: 'ta' },
  { id: 'chi', hira: 'ち', kata: 'チ', word: 'ちゅうりっぷ', wordHira: 'ちゅうりっぷ', emoji: '🌷', romaji: 'chi' },
  { id: 'tsu', hira: 'つ', kata: 'ツ', word: 'つき', wordHira: 'つき', emoji: '🌙', romaji: 'tsu' },
  { id: 'te', hira: 'て', kata: 'テ', word: 'てんとうむし', wordHira: 'てんとうむし', emoji: '🐞', romaji: 'te' },
  { id: 'to', hira: 'と', kata: 'ト', word: 'とまと', wordHira: 'とまと', emoji: '🍅', romaji: 'to' },

  // な行
  { id: 'na', hira: 'な', kata: 'ナ', word: 'なす', wordHira: 'なす', emoji: '🍆', romaji: 'na' },
  { id: 'ni', hira: 'に', kata: 'ニ', word: 'にじ', wordHira: 'にじ', emoji: '🌈', romaji: 'ni' },
  { id: 'nu', hira: 'ぬ', kata: 'ヌ', word: 'ぬいぐるみ', wordHira: 'ぬいぐるみ', emoji: '🧸', romaji: 'nu' },
  { id: 'ne', hira: 'ね', kata: 'ネ', word: 'ねこ', wordHira: 'ねこ', emoji: '🐱', romaji: 'ne' },
  { id: 'no', hira: 'の', kata: 'ノ', word: 'のりまき', wordHira: 'のりまき', emoji: '🍣', romaji: 'no' },

  // は行
  { id: 'ha', hira: 'は', kata: 'ハ', word: 'はな', wordHira: 'はな', emoji: '🌸', romaji: 'ha' },
  { id: 'hi', hira: 'ひ', kata: 'ヒ', word: 'ひこうき', wordHira: 'ひこうき', emoji: '✈️', romaji: 'hi' },
  { id: 'fu', hira: 'ふ', kata: 'フ', word: 'ふうせん', wordHira: 'ふうせん', emoji: '🎈', romaji: 'fu' },
  { id: 'he', hira: 'へ', kata: 'ヘ', word: 'へび', wordHira: 'へび', emoji: '🐍', romaji: 'he' },
  { id: 'ho', hira: 'ほ', kata: 'ホ', word: 'ほし', wordHira: 'ほし', emoji: '⭐', romaji: 'ho' },

  // ま行
  { id: 'ma', hira: 'ま', kata: 'マ', word: 'まいく', wordHira: 'まいく', emoji: '🎤', romaji: 'ma' },
  { id: 'mi', hira: 'み', kata: 'ミ', word: 'みかん', wordHira: 'みかん', emoji: '🍊', romaji: 'mi' },
  { id: 'mu', hira: 'む', kata: 'ム', word: 'むしば', wordHira: 'むしば', emoji: '🦷', romaji: 'mu' },
  { id: 'me', hira: 'め', kata: 'メ', word: 'めがね', wordHira: 'めがね', emoji: '👓', romaji: 'me' },
  { id: 'mo', hira: 'も', kata: 'モ', word: 'もも', wordHira: 'もも', emoji: '🍑', romaji: 'mo' },

  // や行
  { id: 'ya', hira: 'や', kata: 'ヤ', word: 'やま', wordHira: 'やま', emoji: '⛰️', romaji: 'ya' },
  { id: 'yu', hira: 'ゆ', kata: 'ユ', word: 'ゆきだるま', wordHira: 'ゆきだるま', emoji: '⛄', romaji: 'yu' },
  { id: 'yo', hira: 'よ', kata: 'ヨ', word: 'ようちえん', wordHira: 'ようちえん', emoji: '🏫', romaji: 'yo' },

  // ら行
  { id: 'ra', hira: 'ら', kata: 'ラ', word: 'らいおん', wordHira: 'らいおん', emoji: '🦁', romaji: 'ra' },
  { id: 'ri', hira: 'り', kata: 'リ', word: 'りんご', wordHira: 'りんご', emoji: '🍎', romaji: 'ri' },
  { id: 'ru', hira: 'る', kata: 'ル', word: 'るびー', wordHira: 'るびー', emoji: '💎', romaji: 'ru' },
  { id: 're', hira: 'れ', kata: 'レ', word: 'れもん', wordHira: 'れもん', emoji: '🍋', romaji: 're' },
  { id: 'ro', hira: 'ろ', kata: 'ロ', word: 'ろけっと', wordHira: 'ろけっと', emoji: '🚀', romaji: 'ro' },

  // わ行
  { id: 'wa', hira: 'わ', kata: 'ワ', word: 'わに', wordHira: 'わに', emoji: '🐊', romaji: 'wa' },
  { id: 'wo', hira: 'を', kata: 'ヲ', word: '「てをあらう」の を', wordHira: 'を', emoji: '🖐️', romaji: 'wo' },
  { id: 'nn', hira: 'ん', kata: 'ン', word: 'ぱんだの ん', wordHira: 'ん', emoji: '🐼', romaji: 'nn' }
];

// 行ごとのグループ定義（あいうえお表タブ用）
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

// ことばパズル用のお題データ（幼児に親しみやすい2〜3文字の言葉）
const PUZZLE_WORDS = [
  { hira: ['い', 'ぬ'], kata: ['イ', 'ヌ'], emoji: '🐶', name: 'いぬ' },
  { hira: ['ね', 'こ'], kata: ['ネ', 'コ'], emoji: '🐱', name: 'ねこ' },
  { hira: ['と', 'り'], kata: ['ト', 'リ'], emoji: '🐦', name: 'とり' },
  { hira: ['く', 'ま'], kata: ['ク', 'マ'], emoji: '🐻', name: 'くま' },
  { hira: ['う', 'し'], kata: ['ウ', 'シ'], emoji: '🐮', name: 'うし' },
  { hira: ['ぶ', 'た'], kata: ['ブ', 'タ'], emoji: '🐷', name: 'ぶた' },
  { hira: ['さ', 'る'], kata: ['サ', 'ル'], emoji: '🐵', name: 'さる' },
  { hira: ['か', 'に'], kata: ['カ', 'ニ'], emoji: '🦀', name: 'かに' },
  { hira: ['ほ', 'し'], kata: ['ホ', 'シ'], emoji: '⭐', name: 'ほし' },
  { hira: ['あ', 'め'], kata: ['ア', 'メ'], emoji: '🍬', name: 'あめ' },
  { hira: ['は', 'な'], kata: ['ハ', 'ナ'], emoji: '🌸', name: 'はな' },
  { hira: ['や', 'ま'], kata: ['ヤ', 'マ'], emoji: '⛰️', name: 'やま' },
  { hira: ['く', 'る', 'ま'], kata: ['ク', 'ル', 'マ'], emoji: '🚗', name: 'くるま' },
  { hira: ['り', 'ん', 'ご'], kata: ['リ', 'ン', 'ゴ'], emoji: '🍎', name: 'りんご' },
  { hira: ['す', 'い', 'か'], kata: ['ス', 'イ', 'カ'], emoji: '🍉', name: 'すいか' },
  { hira: ['み', 'か', 'ん'], kata: ['ミ', 'カ', 'ン'], emoji: '🍊', name: 'みかん' },
  { hira: ['と', 'ま', 'と'], kata: ['ト', 'マ', 'ト'], emoji: '🍅', name: 'とまと' },
  { hira: ['ば', 'な', 'な'], kata: ['バ', 'ナ', 'ナ'], emoji: '🍌', name: 'ばなな' },
  { hira: ['う', 'さ', 'ぎ'], kata: ['ウ', 'サ', 'ギ'], emoji: '🐰', name: 'うさぎ' },
  { hira: ['き', 'り', 'ん'], kata: ['キ', 'リ', 'ン'], emoji: '🦒', name: 'きりん' },
  { hira: ['ろ', 'け', 'っ', 'と'], kata: ['ロ', 'ケ', 'ッ', 'ト'], emoji: '🚀', name: 'ろけっと' },
  { hira: ['ひ', 'こ', 'う', 'き'], kata: ['ヒ', 'コ', 'ウ', 'キ'], emoji: '✈️', name: 'ひこうき' }
];

// ごほうびシールデータ
const STICKERS_DATA = [
  { id: 'lion', name: 'らいおん', emoji: '🦁' },
  { id: 'tiger', name: 'とら', emoji: '🐯' },
  { id: 'panda', name: 'ぱんだ', emoji: '🐼' },
  { id: 'koala', name: 'こあら', emoji: '🐨' },
  { id: 'penguin', name: 'ぺんぎん', emoji: '🐧' },
  { id: 'dolphin', name: 'いるか', emoji: '🐬' },
  { id: 'dino', name: 'きょうりゅう', emoji: '🦖' },
  { id: 'crown', name: 'おうかん', emoji: '👑' },
  { id: 'medal', name: 'きんめだる', emoji: '🥇' },
  { id: 'rocket', name: 'ろけっと', emoji: '🚀' },
  { id: 'train', name: 'でんしゃ', emoji: '🚅' },
  { id: 'fire_truck', name: 'しょうぼうしゃ', emoji: '🚒' },
  { id: 'rainbow', name: 'にじ', emoji: '🌈' },
  { id: 'sun', name: 'たいよう', emoji: '🌞' },
  { id: 'cake', name: 'けーき', emoji: '🎂' },
  { id: 'balloon', name: 'ふうせん', emoji: '🎈' }
];
