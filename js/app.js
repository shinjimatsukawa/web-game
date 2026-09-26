// メインアプリケーション コントローラー

class App {
  constructor() {
    this.currentKanaMode = 'hira'; // 'hira' | 'kata'
    this.currentTab = 'play'; // 'play' | 'collection'
    this.init();
  }

  init() {
    this.screenPlay = document.getElementById('screen-play');
    this.screenCollection = document.getElementById('screen-collection');

    this.btnModeHira = document.getElementById('btn-mode-hira');
    this.btnModeKata = document.getElementById('btn-mode-kata');
    this.btnTabPlay = document.getElementById('btn-tab-play');
    this.btnTabCollection = document.getElementById('btn-tab-collection');

    this.setupEvents();

    // 初期化：開いてすぐにゲーム開始！
    bubbleGame.init(document.getElementById('play-content'), this.currentKanaMode);
  }

  setupEvents() {
    // ひらがな・カタカナ切り替え
    this.btnModeHira.addEventListener('click', () => this.setKanaMode('hira'));
    this.btnModeKata.addEventListener('click', () => this.setKanaMode('kata'));

    // タブ切り替え（あそぶ / ずかん）
    this.btnTabPlay.addEventListener('click', () => this.switchTab('play'));
    this.btnTabCollection.addEventListener('click', () => this.switchTab('collection'));

    // 初回タッチでオーディオアンロック
    const unlockHandler = () => {
      soundManager.unlock();
      window.removeEventListener('touchstart', unlockHandler);
      window.removeEventListener('click', unlockHandler);
    };
    window.addEventListener('touchstart', unlockHandler, { once: true });
    window.addEventListener('click', unlockHandler, { once: true });
  }

  setKanaMode(mode) {
    soundManager.playBubblePop();
    this.currentKanaMode = mode;

    this.btnModeHira.classList.toggle('active', mode === 'hira');
    this.btnModeKata.classList.toggle('active', mode === 'kata');

    if (this.currentTab === 'play') {
      bubbleGame.setKanaMode(mode);
    } else {
      this.renderCollection();
    }
  }

  switchTab(tab) {
    soundManager.playBubblePop();
    this.currentTab = tab;

    this.btnTabPlay.classList.toggle('active', tab === 'play');
    this.btnTabCollection.classList.toggle('active', tab === 'collection');

    if (tab === 'play') {
      this.screenPlay.classList.remove('hidden');
      this.screenCollection.classList.add('hidden');
    } else {
      this.screenPlay.classList.add('hidden');
      this.screenCollection.classList.remove('hidden');
      this.renderCollection();
    }
  }

  // なかまたち図鑑の描画
  renderCollection() {
    const container = document.getElementById('collection-content');
    if (!container) return;
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'collection-grid';

    CHARACTERS_DATA.forEach((item, index) => {
      const card = document.createElement('button');
      card.className = 'collection-card';
      const name = this.currentKanaMode === 'hira' ? item.nameHira : item.nameKata;

      card.innerHTML = `
        <div class="collection-emoji">${item.emoji}</div>
        <div class="collection-name">${name}</div>
      `;

      card.addEventListener('click', () => {
        soundManager.playBubblePop();
        soundManager.playCharacterAction(item.soundType);
        // このキャラクターで遊ぶ画面へ遷移
        bubbleGame.currentCharIndex = index;
        this.switchTab('play');
        bubbleGame.loadCharacter();
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// 画面いっぱいの星・紙吹雪パーティクル
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const numberOfPieces = 60;
  const colors = ['#ff477e', '#ffb703', '#06d6a0', '#118ab2', '#8338ec', '#ff006e'];
  const symbols = ['⭐', '✨', '💖', '🎉', '🌟'];

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 50,
      size: Math.random() * 16 + 14,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      speedY: Math.random() * 5 + 3,
      speedX: (Math.random() - 0.5) * 5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8
    });
  }

  let animationFrame;
  const startTime = Date.now();

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.font = `${p.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.symbol, 0, 0);
      ctx.restore();
    });

    if (Date.now() - startTime < 2500) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  update();
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
