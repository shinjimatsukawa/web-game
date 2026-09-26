// メインアプリケーション コントローラー

class App {
  constructor() {
    this.currentScreen = 'home';
    this.currentKanaMode = 'hira'; // 'hira' | 'kata'
    this.init();
  }

  init() {
    // 画面要素
    this.screens = {
      home: document.getElementById('screen-home'),
      quiz: document.getElementById('screen-quiz'),
      board: document.getElementById('screen-board'),
      puzzle: document.getElementById('screen-puzzle'),
      stickers: document.getElementById('screen-stickers')
    };

    this.btnHira = document.getElementById('btn-mode-hira');
    this.btnKata = document.getElementById('btn-mode-kata');
    this.btnBackHome = document.getElementById('btn-back-home');
    this.headerTitle = document.getElementById('header-title');

    // イベントバインド
    this.setupEvents();
  }

  setupEvents() {
    // ひらがな・カタカナ切り替え
    this.btnHira.addEventListener('click', () => this.setKanaMode('hira'));
    this.btnKata.addEventListener('click', () => this.setKanaMode('kata'));

    // ホームへもどる
    this.btnBackHome.addEventListener('click', () => {
      soundManager.playPop();
      this.switchScreen('home');
    });

    // メニューボタン
    document.getElementById('menu-card-quiz').addEventListener('click', () => {
      this.handleUserInteraction();
      this.switchScreen('quiz');
    });

    document.getElementById('menu-card-board').addEventListener('click', () => {
      this.handleUserInteraction();
      this.switchScreen('board');
    });

    document.getElementById('menu-card-puzzle').addEventListener('click', () => {
      this.handleUserInteraction();
      this.switchScreen('puzzle');
    });

    document.getElementById('menu-card-stickers').addEventListener('click', () => {
      this.handleUserInteraction();
      this.switchScreen('stickers');
    });

    // 画面全体のどこかを最初にタッチしたときにもオーディオアンロック
    const unlockHandler = () => {
      this.handleUserInteraction();
      window.removeEventListener('touchstart', unlockHandler);
      window.removeEventListener('click', unlockHandler);
    };
    window.addEventListener('touchstart', unlockHandler, { once: true });
    window.addEventListener('click', unlockHandler, { once: true });
  }

  handleUserInteraction() {
    soundManager.unlock();
  }

  setKanaMode(mode) {
    soundManager.playPop();
    this.currentKanaMode = mode;

    this.btnHira.classList.toggle('active', mode === 'hira');
    this.btnKata.classList.toggle('active', mode === 'kata');

    // 現在の画面にモード変更を通知
    if (this.currentScreen === 'quiz') {
      quizGame.setKanaMode(mode);
    } else if (this.currentScreen === 'board') {
      boardGame.setKanaMode(mode);
    } else if (this.currentScreen === 'puzzle') {
      puzzleGame.setKanaMode(mode);
    }
  }

  switchScreen(screenName) {
    this.currentScreen = screenName;

    // 画面の表示切り替え
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

    // ヘッダー制御
    if (screenName === 'home') {
      this.btnBackHome.classList.add('hidden');
      this.headerTitle.textContent = '🌟 もじあそび ランド 🌟';
    } else {
      this.btnBackHome.classList.remove('hidden');

      if (screenName === 'quiz') {
        this.headerTitle.textContent = '🎯 もじ あてっこ';
        quizGame.init(document.getElementById('quiz-content'), this.currentKanaMode);
      } else if (screenName === 'board') {
        this.headerTitle.textContent = '📖 あいうえお ひょう';
        boardGame.init(document.getElementById('board-content'), this.currentKanaMode);
      } else if (screenName === 'puzzle') {
        this.headerTitle.textContent = '🧩 ことば パズル';
        puzzleGame.init(document.getElementById('puzzle-content'), this.currentKanaMode);
      } else if (screenName === 'stickers') {
        this.headerTitle.textContent = '✨ シールちょう';
        stickerBook.render(document.getElementById('stickers-content'));
      }
    }
  }
}

// 画面いっぱいの紙吹雪エフェクト（外部ライブラリ不要の軽量Canvas実装）
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const numberOfPieces = 70;
  const colors = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#fbbf24'];

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 50,
      size: Math.random() * 12 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 3,
      speedX: (Math.random() - 0.5) * 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
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
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    if (Date.now() - startTime < 2000) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  update();
}

// 起動
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
