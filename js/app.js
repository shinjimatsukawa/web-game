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

    // レベル（難易度）ボタン群
    this.diffBtns = {
      easy: document.getElementById('btn-diff-easy'),
      normal: document.getElementById('btn-diff-normal'),
      hard: document.getElementById('btn-diff-hard')
    };
    this.currentDifficulty = 'normal';
    try {
      const saved = localStorage.getItem('bubble_difficulty');
      if (saved && ['easy', 'normal', 'hard'].includes(saved)) {
        this.currentDifficulty = saved;
      }
    } catch(e) {}
    this.updateDifficultyButtons(this.currentDifficulty);

    // BGMボタンの初期状態（localStorageから復元された状態を反映）
    this.updateBgmButton(soundManager.isBgmOn);

    this.setupEvents();

    // 初期URLに応じた画面を表示（例: /bubble, /board, /fossil）
    const initialScreen = this.getScreenFromPath(window.location.pathname);
    this.switchScreen(initialScreen, false);

    // 文字あつめの1問目音声をバックグラウンドで先読み（タップ時の即座再生を実現）
    if (window.bubbleGame && typeof bubbleGame.prepareQueueAndPreloadFirst === 'function') {
      bubbleGame.prepareQueueAndPreloadFirst();
    }
  }

  // URLパスから画面名を取得
  getScreenFromPath(pathname) {
    const clean = pathname.replace(/\/+$/, '') || '/';
    if (clean === '/bubble' || clean === '/atsume') return 'bubble';
    if (clean === '/board' || clean === '/zukan') return 'board';
    if (clean === '/fossil' || clean === '/dino') return 'fossil';
    return 'home';
  }

  // 画面名からURLパスを取得
  getPathFromScreen(screen) {
    if (screen === 'bubble') return '/bubble';
    if (screen === 'board') return '/board';
    if (screen === 'fossil') return '/fossil';
    return '/';
  }

  setupEvents() {
    // 1. ホームへ戻るボタン
    this.btnBackHome.addEventListener('click', () => {
      soundManager.playBubblePop();
      this.switchScreen('home', true);
    });

    // 2. BGM ON/OFF トグル（設定はlocalStorageに保存）
    this.btnBgmToggle.addEventListener('click', () => {
      soundManager.unlock();
      const isOn = soundManager.toggleBgm();
      this.updateBgmButton(isOn);
    });

    // 3. ひらがな・カタカナ切り替え
    this.btnModeHira.addEventListener('click', () => this.setKanaMode('hira'));
    this.btnModeKata.addEventListener('click', () => this.setKanaMode('kata'));

    // 4. レベル（難易度）切り替え
    Object.keys(this.diffBtns).forEach(diff => {
      const btn = this.diffBtns[diff];
      if (btn) {
        btn.addEventListener('click', () => this.setDifficulty(diff));
      }
    });

    // 5. トップ画面のゲーム選択カード
    document.getElementById('card-game-bubble').addEventListener('click', () => {
      this.handleFirstInteraction();
      this.switchScreen('bubble', true);
    });

    document.getElementById('card-game-board').addEventListener('click', () => {
      this.handleFirstInteraction();
      this.switchScreen('board', true);
    });

    // ブラウザの戻る・進むボタン（Safariスワイプ含む）への対応
    window.addEventListener('popstate', (e) => {
      const screen = (e.state && e.state.screen) || this.getScreenFromPath(window.location.pathname);
      this.switchScreen(screen, false);
    });

    // 画面全体のどこかを最初にタッチしたときにオーディオアンロック
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

  setDifficulty(diff) {
    soundManager.playBubblePop();
    this.currentDifficulty = diff;
    try {
      localStorage.setItem('bubble_difficulty', diff);
    } catch(e) {}
    this.updateDifficultyButtons(diff);

    const bg = window.bubbleGame || (typeof bubbleGame !== 'undefined' ? bubbleGame : null);
    if (bg && typeof bg.setDifficulty === 'function') {
      bg.setDifficulty(diff);
    }
  }

  updateDifficultyButtons(diff) {
    Object.keys(this.diffBtns).forEach(key => {
      const btn = this.diffBtns[key];
      if (btn) {
        btn.classList.toggle('active', key === diff);
      }
    });
  }

  switchScreen(screenName, updateHistory = true) {
    if (window.soundManager && typeof soundManager.stopVoice === 'function') {
      soundManager.stopVoice();
    }
    if (window.bubbleGame && typeof bubbleGame.stopAllAudioAndTimers === 'function') {
      bubbleGame.stopAllAudioAndTimers();
    }

    this.currentScreen = screenName;
    const targetPath = this.getPathFromScreen(screenName);

    // URLのパスを更新（History API）
    if (updateHistory && window.location.pathname !== targetPath) {
      history.pushState({ screen: screenName }, '', targetPath);
    }

    // 画面の切り替え
    Object.keys(this.screens).forEach(key => {
      const el = this.screens[key];
      if (!el) return;
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
      if (window.bubbleGame && typeof bubbleGame.prepareQueueAndPreloadFirst === 'function') {
        bubbleGame.prepareQueueAndPreloadFirst();
      }
    } else if (screenName === 'bubble') {
      this.btnBackHome.classList.remove('hidden');
      this.headerTitle.textContent = '🚒 うごく！もじあつめ';
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
  window.app = window.appInstance = new App();
});
