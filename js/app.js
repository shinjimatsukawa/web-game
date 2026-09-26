// メインアプリケーション コントローラー

class App {
  constructor() {
    this.currentScreen = 'home'; // 'home' | 'bubble' | 'board'
    this.currentKanaMode = 'hira'; // 'hira' | 'kata'
    this.init();
  }

  init() {
    // 画面要素
    this.screens = {
      home: document.getElementById('screen-home'),
      bubble: document.getElementById('screen-bubble'),
      board: document.getElementById('screen-board')
    };

    this.headerTitle = document.getElementById('header-title');
    this.btnBackHome = document.getElementById('btn-back-home');
    this.btnBgmToggle = document.getElementById('btn-bgm-toggle');
    this.btnModeHira = document.getElementById('btn-mode-hira');
    this.btnModeKata = document.getElementById('btn-mode-kata');

    this.setupEvents();
  }

  setupEvents() {
    // 1. ホームへ戻るボタン
    this.btnBackHome.addEventListener('click', () => {
      soundManager.playBubblePop();
      this.switchScreen('home');
    });

    // 2. BGM ON/OFF トグル
    this.btnBgmToggle.addEventListener('click', () => {
      soundManager.unlock();
      const isOn = soundManager.toggleBgm();
      this.updateBgmButton(isOn);
    });

    // 3. ひらがな・カタカナ切り替え
    this.btnModeHira.addEventListener('click', () => this.setKanaMode('hira'));
    this.btnModeKata.addEventListener('click', () => this.setKanaMode('kata'));

    // 4. トップ画面のゲーム選択カード
    document.getElementById('card-game-bubble').addEventListener('click', () => {
      this.handleFirstInteraction();
      this.switchScreen('bubble');
    });

    document.getElementById('card-game-board').addEventListener('click', () => {
      this.handleFirstInteraction();
      this.switchScreen('board');
    });

    // 画面全体のどこかを最初にタッチしたときにもオーディオアンロック
    const unlockHandler = () => {
      soundManager.unlock();
      window.removeEventListener('touchstart', unlockHandler);
      window.removeEventListener('click', unlockHandler);
    };
    window.addEventListener('touchstart', unlockHandler, { once: true });
    window.addEventListener('click', unlockHandler, { once: true });
  }

  handleFirstInteraction() {
    soundManager.unlock();
    // 初回ゲーム開始時にBGMをスタート
    if (!soundManager.isBgmOn) {
      soundManager.startBgm();
      this.updateBgmButton(true);
    }
  }

  updateBgmButton(isOn) {
    if (isOn) {
      this.btnBgmToggle.textContent = '🎵 BGM: ON';
      this.btnBgmToggle.classList.add('bgm-active');
    } else {
      this.btnBgmToggle.textContent = '🔇 BGM: OFF';
      this.btnBgmToggle.classList.remove('bgm-active');
    }
  }

  setKanaMode(mode) {
    soundManager.playBubblePop();
    this.currentKanaMode = mode;

    this.btnModeHira.classList.toggle('active', mode === 'hira');
    this.btnModeKata.classList.toggle('active', mode === 'kata');

    if (this.currentScreen === 'bubble') {
      bubbleGame.setKanaMode(mode);
    } else if (this.currentScreen === 'board') {
      boardGame.setKanaMode(mode);
    }
  }

  switchScreen(screenName) {
    this.currentScreen = screenName;

    // 画面の切り替え
    Object.keys(this.screens).forEach(key => {
      const el = this.screens[key];
      if (key === screenName) {
        el.classList.remove('hidden');
        el.classList.add('active');
      } else {
        el.classList.add('hidden');
        el.classList.remove('active');
      }
    });

    // ヘッダータイトルの制御
    if (screenName === 'home') {
      this.btnBackHome.classList.add('hidden');
      this.headerTitle.textContent = '🌟 もじあそび パーク 🌟';
    } else if (screenName === 'bubble') {
      this.btnBackHome.classList.remove('hidden');
      this.headerTitle.textContent = '🐷 うごく！もじあつめ';
      bubbleGame.init(document.getElementById('bubble-game-content'), this.currentKanaMode);
    } else if (screenName === 'board') {
      this.btnBackHome.classList.remove('hidden');
      this.headerTitle.textContent = '📖 おしゃべり 50おんずかん';
      boardGame.init(document.getElementById('board-game-content'), this.currentKanaMode);
    }
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
