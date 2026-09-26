// 「おしゃべり 50おんずかん」ゲームエンジン
// 全文字一覧表示 ＆ タップ即座おしゃべり（モーダル不要・iPad 11インチ最適化）

class BoardGame {
  constructor() {
    this.container = null;
    this.currentMode = 'hira'; // 'hira' | 'kata'
    this.activeItemId = null;
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
    boardWrapper.className = 'board-full-wrapper';

    // 1. リアルタイムおしゃべりプレビューバー（画面上部）
    // タッチした文字とおしゃべりを大きく表示（モーダルを開かずに画面を塞がない）
    const previewBar = document.createElement('div');
    previewBar.className = 'board-preview-bar';
    previewBar.id = 'board-preview-bar';
    previewBar.innerHTML = `
      <div class="preview-placeholder">👆 すきな もじを タッチしてみてね！</div>
    `;
    boardWrapper.appendChild(previewBar);

    // 2. 50音 全文字グリッド（全46音をスクロールなし〜快適スクロールで一覧）
    const gridContainer = document.createElement('div');
    gridContainer.className = 'board-full-grid';

    KANA_TABLE_DATA.forEach(data => {
      const displayChar = this.currentMode === 'hira' ? data.hira : data.kata;
      const subChar = this.currentMode === 'hira' ? data.kata : data.hira;

      const card = document.createElement('button');
      card.className = 'full-board-card';
      card.id = `board-card-${data.id}`;
      card.innerHTML = `
        <span class="card-char-big">${displayChar}</span>
        <span class="card-emoji-icon">${data.emoji}</span>
        <span class="card-word-label">${data.word}</span>
      `;

      card.addEventListener('click', () => {
        this.handleCardClick(data, card);
      });

      gridContainer.appendChild(card);
    });

    boardWrapper.appendChild(gridContainer);
    this.container.appendChild(boardWrapper);
  }

  handleCardClick(data, card) {
    this.activeItemId = data.id;

    // 前のカードのアクティブ解除
    document.querySelectorAll('.full-board-card.card-active').forEach(c => {
      c.classList.remove('card-active', 'card-bounce-anim');
    });

    // 今回のカードをハイライト＆ポヨンとバウンド
    card.classList.add('card-active', 'card-bounce-anim');
    setTimeout(() => card.classList.remove('card-bounce-anim'), 400);

    // ポップ音 ＋ お姉さんの自然な高音質音声（「あ。アイスクリーム。」）
    soundManager.playBubblePop();
    soundManager.playTableItem(data.id);

    // プレビューバーを更新（モーダルを開かずに大きく見せる）
    this.updatePreviewBar(data);
  }

  updatePreviewBar(data) {
    const previewBar = document.getElementById('board-preview-bar');
    if (!previewBar) return;

    const displayChar = this.currentMode === 'hira' ? data.hira : data.kata;
    const subChar = this.currentMode === 'hira' ? data.kata : data.hira;

    previewBar.innerHTML = `
      <div class="preview-content pop-in">
        <div class="preview-char">${displayChar}</div>
        <div class="preview-emoji">${data.emoji}</div>
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
