// 「おしゃべり 50おんずかん」ゲームエンジン

class BoardGame {
  constructor() {
    this.container = null;
    this.currentMode = 'hira'; // 'hira' | 'kata'
    this.selectedRowIndex = 0;
  }

  init(container, mode = 'hira') {
    this.container = container;
    this.currentMode = mode;
    this.selectedRowIndex = 0;
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
    boardWrapper.className = 'board-game-wrapper';

    // 1. 行選択タブ（あ〜お、か〜こ ...）
    const tabContainer = document.createElement('div');
    tabContainer.className = 'board-row-tabs';

    KANA_ROWS.forEach((row, idx) => {
      const tabBtn = document.createElement('button');
      tabBtn.className = `board-row-btn ${this.selectedRowIndex === idx ? 'active' : ''}`;
      
      let label = row.name;
      if (this.currentMode === 'kata') {
        const first = KANA_TABLE_DATA.find(k => k.hira === row.chars[0]);
        const last = KANA_TABLE_DATA.find(k => k.hira === row.chars[row.chars.length - 1]);
        if (first && last && row.chars.length > 2) {
          label = `${first.kata}〜${last.kata}`;
        } else if (first) {
          label = row.chars.map(c => {
            const item = KANA_TABLE_DATA.find(k => k.hira === c);
            return item ? item.kata : c;
          }).join('・');
        }
      }

      tabBtn.textContent = label;
      tabBtn.addEventListener('click', () => {
        soundManager.playBubblePop();
        this.selectedRowIndex = idx;
        this.renderCards();
        tabContainer.querySelectorAll('.board-row-btn').forEach((b, i) => {
          b.classList.toggle('active', i === idx);
        });
      });
      tabContainer.appendChild(tabBtn);
    });

    boardWrapper.appendChild(tabContainer);

    // 2. カード一覧グリッド
    const cardsArea = document.createElement('div');
    cardsArea.className = 'board-cards-area';
    cardsArea.id = 'board-cards-area';
    boardWrapper.appendChild(cardsArea);

    this.container.appendChild(boardWrapper);
    this.renderCards();
  }

  renderCards() {
    const cardsArea = document.getElementById('board-cards-area');
    if (!cardsArea) return;
    cardsArea.innerHTML = '';

    const selectedRow = KANA_ROWS[this.selectedRowIndex];
    const grid = document.createElement('div');
    grid.className = 'board-grid-50';

    selectedRow.chars.forEach(char => {
      const data = KANA_TABLE_DATA.find(k => k.hira === char);
      if (!data) return;

      const displayChar = this.currentMode === 'hira' ? data.hira : data.kata;
      const subChar = this.currentMode === 'hira' ? data.kata : data.hira;

      const card = document.createElement('button');
      card.className = 'board-item-card';
      card.innerHTML = `
        <div class="card-char-main">${displayChar}</div>
        <div class="card-emoji-main">${data.emoji}</div>
        <div class="card-word-title">${data.word}</div>
        <div class="card-char-sub">(${subChar})</div>
      `;

      card.addEventListener('click', () => {
        soundManager.playBubblePop();
        card.classList.add('card-pop-bounce');
        setTimeout(() => card.classList.remove('card-pop-bounce'), 450);

        this.showPopup(data);
      });

      grid.appendChild(card);
    });

    cardsArea.appendChild(grid);
  }

  showPopup(data) {
    const isKata = this.currentMode === 'kata';
    const displayChar = isKata ? data.kata : data.hira;
    const subChar = isKata ? data.hira : data.kata;

    // おしゃべり発声: 「あ！アイスクリーム！」
    soundManager.speakKanaItem(data, isKata);

    // ポップアップ拡大モーダル
    const modal = document.createElement('div');
    modal.className = 'board-popup-modal';
    modal.innerHTML = `
      <div class="popup-modal-content">
        <div class="popup-char-huge">${displayChar}</div>
        <div class="popup-emoji-huge">${data.emoji}</div>
        <div class="popup-word-title">${data.word}</div>
        <div class="popup-sound-desc">「${data.sound}」</div>
        <div class="popup-sub-text">もうひとつの もじ: ${subChar}</div>
        <button class="popup-btn-speak">🔊 もういっかい きく</button>
        <button class="popup-btn-close">✖ とじる</button>
      </div>
    `;

    modal.querySelector('.popup-btn-speak').addEventListener('click', (e) => {
      e.stopPropagation();
      soundManager.playBubblePop();
      soundManager.speakKanaItem(data, isKata);
    });

    const closeModal = () => {
      soundManager.playBubblePop();
      modal.classList.add('fade-out');
      setTimeout(() => modal.remove(), 200);
    };

    modal.querySelector('.popup-btn-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.body.appendChild(modal);
  }
}

const boardGame = new BoardGame();
