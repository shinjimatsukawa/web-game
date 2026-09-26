// モード②: あいうえお表（おしゃべり図鑑）

class BoardGame {
  constructor() {
    this.container = null;
    this.currentMode = 'hira'; // 'hira' または 'kata'
    this.selectedRowIndex = 0; // 0: あ行, 1: か行, ...
  }

  init(container, mode = 'hira') {
    this.container = container;
    this.currentMode = mode;
    this.render();
  }

  setKanaMode(mode) {
    this.currentMode = mode;
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    // タブ（行選択ボタン）
    const tabContainer = document.createElement('div');
    tabContainer.className = 'board-tabs';

    KANA_ROWS.forEach((row, idx) => {
      const tabBtn = document.createElement('button');
      tabBtn.className = `board-tab-btn ${this.selectedRowIndex === idx ? 'active' : ''}`;
      // カタカナ対応
      let label = row.name;
      if (this.currentMode === 'kata') {
        label = row.chars.map(c => {
          const item = KANA_DATA.find(k => k.hira === c);
          return item ? item.kata : c;
        }).join('・');
        if (row.chars.length > 2) {
          const first = KANA_DATA.find(k => k.hira === row.chars[0]);
          const last = KANA_DATA.find(k => k.hira === row.chars[row.chars.length - 1]);
          label = `${first ? first.kata : ''}〜${last ? last.kata : ''}`;
        }
      }
      tabBtn.textContent = label;
      tabBtn.addEventListener('click', () => {
        soundManager.playPop();
        this.selectedRowIndex = idx;
        this.renderCards();
        // アクティブ表示更新
        tabContainer.querySelectorAll('.board-tab-btn').forEach((b, i) => {
          b.classList.toggle('active', i === idx);
        });
      });
      tabContainer.appendChild(tabBtn);
    });

    this.container.appendChild(tabContainer);

    // カード表示領域
    const cardsArea = document.createElement('div');
    cardsArea.className = 'board-cards-area';
    cardsArea.id = 'board-cards-area';
    this.container.appendChild(cardsArea);

    this.renderCards();
  }

  renderCards() {
    const cardsArea = document.getElementById('board-cards-area');
    if (!cardsArea) return;
    cardsArea.innerHTML = '';

    const selectedRow = KANA_ROWS[this.selectedRowIndex];
    const grid = document.createElement('div');
    grid.className = 'board-grid';

    selectedRow.chars.forEach(char => {
      const data = KANA_DATA.find(k => k.hira === char);
      if (!data) return;

      const displayChar = this.currentMode === 'hira' ? data.hira : data.kata;
      const subChar = this.currentMode === 'hira' ? data.kata : data.hira;

      const card = document.createElement('div');
      card.className = 'board-card';
      card.innerHTML = `
        <div class="board-card-char">${displayChar}</div>
        <div class="board-card-emoji">${data.emoji}</div>
        <div class="board-card-word">${data.word}</div>
        <div class="board-card-sub">(${subChar})</div>
      `;

      card.addEventListener('click', () => {
        soundManager.playPop();
        card.classList.add('pop-anim');
        setTimeout(() => card.classList.remove('pop-anim'), 400);

        this.showPopup(data);
      });

      grid.appendChild(card);
    });

    cardsArea.appendChild(grid);
  }

  showPopup(data) {
    const displayChar = this.currentMode === 'hira' ? data.hira : data.kata;
    const subChar = this.currentMode === 'hira' ? data.kata : data.hira;

    // 高音質音声ファイル再生: 「あ！アイス！」
    soundManager.playKana(data.id);

    // ポップアップモーダル表示
    const modal = document.createElement('div');
    modal.className = 'board-modal-overlay';
    modal.innerHTML = `
      <div class="board-modal-content">
        <div class="modal-char-large">${displayChar}</div>
        <div class="modal-emoji-large">${data.emoji}</div>
        <div class="modal-word-large">${data.word}</div>
        <div class="modal-sub-large">もうひとつの もじ: ${subChar}</div>
        <button class="modal-speak-btn">🔊 もういっかい きく</button>
        <button class="modal-close-btn">とじる ✖</button>
      </div>
    `;

    modal.querySelector('.modal-speak-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      soundManager.playPop();
      soundManager.playKana(data.id);
    });

    const closeModal = () => {
      soundManager.playPop();
      modal.classList.add('fade-out');
      setTimeout(() => modal.remove(), 250);
    };

    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.body.appendChild(modal);
  }
}

const boardGame = new BoardGame();
