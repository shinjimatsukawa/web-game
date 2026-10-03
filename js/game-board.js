// 「おしゃべり 50おんずかん」ゲームエンジン
// 日本伝統の縦並び五十音表（右1列が「あいうえお」、iPad 11インチ最適化）

class BoardGame {
  constructor() {
    this.container = null;
    this.currentMode = 'hira'; // 'hira' | 'kata'
    this.activeItemId = null;

    // 五十音図マトリクス（行 = あ段〜お段, 列 = 左の「わ行」から右の「あ行」へ）
    // これにより一番右の列が上から「あ、い、う、え、お」になる！
    this.matrix = [
      // あ段 (row 0)
      ['わ', 'ら', 'や', 'ま', 'は', 'な', 'た', 'さ', 'か', 'あ'],
      // い段 (row 1)
      [null, 'り', null, 'み', 'ひ', 'に', 'ち', 'し', 'き', 'い'],
      // う段 (row 2)
      ['を', 'る', 'ゆ', 'む', 'ふ', 'ぬ', 'つ', 'す', 'く', 'う'],
      // え段 (row 3)
      [null, 'れ', null, 'め', 'へ', 'ね', 'て', 'せ', 'け', 'え'],
      // お段 (row 4)
      ['ん', 'ろ', 'よ', 'も', 'ほ', 'の', 'と', 'そ', 'こ', 'お']
    ];
  }

  init(container, mode = 'hira') {
    this.container = container;
    this.currentMode = mode;
    this.activeItemId = null;
    this.render();
  }

  setKanaMode(mode) {
    this.currentMode = mode;
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const boardWrapper = document.createElement('div');
    boardWrapper.className = 'board-traditional-wrapper';

    // 1. 上部のリアルタイムおしゃべりプレビューバー
    const previewBar = document.createElement('div');
    previewBar.className = 'board-preview-bar';
    previewBar.id = 'board-preview-bar';
    previewBar.innerHTML = `
      <div class="preview-placeholder">👆 すきな もじを タッチしてみてね！</div>
    `;
    boardWrapper.appendChild(previewBar);

    // 2. 伝統の五十音図グリッド（10列 × 5行、右端が「あいうえお」）
    const gridContainer = document.createElement('div');
    gridContainer.className = 'board-traditional-grid';

    // 5段 × 10列を展開
    this.matrix.forEach(row => {
      row.forEach(char => {
        if (!char) {
          // 空白マス（や行・わ行の空き）
          const emptyCell = document.createElement('div');
          emptyCell.className = 'traditional-empty-cell';
          gridContainer.appendChild(emptyCell);
          return;
        }

        const data = KANA_TABLE_DATA.find(k => k.hira === char);
        if (!data) return;

        const displayChar = this.currentMode === 'hira' ? data.hira : data.kata;

        const card = document.createElement('button');
        card.className = 'traditional-board-card';
        card.id = `board-card-${data.id}`;
        const visualHtml = data.imageSrc
          ? `<img src="${data.imageSrc}" class="trad-svg-img" alt="${data.word}" draggable="false">`
          : `<span class="trad-emoji">${data.emoji}</span>`;

        card.innerHTML = `
          <span class="trad-char">${displayChar}</span>
          ${visualHtml}
          <span class="trad-word">${data.word}</span>
        `;

        card.addEventListener('click', () => {
          this.handleCardClick(data, card);
        });

        gridContainer.appendChild(card);
      });
    });

    boardWrapper.appendChild(gridContainer);
    this.container.appendChild(boardWrapper);
  }

  handleCardClick(data, card) {
    this.activeItemId = data.id;

    // 前のアクティブカード解除
    document.querySelectorAll('.traditional-board-card.card-active').forEach(c => {
      c.classList.remove('card-active', 'card-bounce-anim');
    });

    // 今回のカードをハイライト＆バウンド
    card.classList.add('card-active', 'card-bounce-anim');
    setTimeout(() => card.classList.remove('card-bounce-anim'), 400);

    // ポップ音 ＋ お姉さんの自然な高音質音声（「あ。アイスクリーム。」）
    soundManager.playBubblePop();
    soundManager.playTableItem(data.id);

    // プレビューバーを更新
    this.updatePreviewBar(data);
  }

  updatePreviewBar(data) {
    const previewBar = document.getElementById('board-preview-bar');
    if (!previewBar) return;

    const displayChar = this.currentMode === 'hira' ? data.hira : data.kata;
    const subChar = this.currentMode === 'hira' ? data.kata : data.hira;
    const previewVisualHtml = data.imageSrc
      ? `<img src="${data.imageSrc}" class="preview-svg-img" alt="${data.word}" draggable="false">`
      : `<div class="preview-emoji">${data.emoji}</div>`;

    previewBar.innerHTML = `
      <div class="preview-content pop-in">
        <div class="preview-char">${displayChar}</div>
        ${previewVisualHtml}
        <div class="preview-text-group">
          <div class="preview-word">${data.word}</div>
          <div class="preview-sound-desc">「${data.sound}」</div>
        </div>
        <div class="preview-sub-char">（${subChar}）</div>
        <button class="preview-replay-btn" id="preview-replay-btn">🔊 もういっかい</button>
      </div>
    `;

    previewBar.querySelector('#preview-replay-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      soundManager.playBubblePop();
      soundManager.playTableItem(data.id);
    });
  }
}

const boardGame = new BoardGame();
window.boardGame = boardGame;
