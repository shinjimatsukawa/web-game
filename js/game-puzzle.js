// モード③: ことばパズル（文字ならべ）

class PuzzleGame {
  constructor() {
    this.container = null;
    this.currentMode = 'hira'; // 'hira' または 'kata'
    this.puzzleCount = 3;
    this.currentPuzzleIndex = 0;
    this.targetWord = null;
    this.targetChars = [];
    this.slottedChars = [];
    this.poolChars = [];
  }

  init(container, mode = 'hira') {
    this.container = container;
    this.currentMode = mode;
    this.currentPuzzleIndex = 0;
    this.startPuzzle();
  }

  setKanaMode(mode) {
    this.currentMode = mode;
    this.startPuzzle();
  }

  startPuzzle() {
    this.currentPuzzleIndex = 0;
    this.nextPuzzle();
  }

  nextPuzzle() {
    // ランダムなお題を取得
    this.targetWord = PUZZLE_WORDS[Math.floor(Math.random() * PUZZLE_WORDS.length)];
    const originalChars = this.currentMode === 'hira' ? this.targetWord.hira : this.targetWord.kata;
    this.targetChars = [...originalChars];

    // スロットの初期状態（空）
    this.slottedChars = new Array(this.targetChars.length).fill(null);

    // プール用文字（正解文字＋ランダムなダミー文字1個）をシャッフル
    const randomDummy = KANA_DATA[Math.floor(Math.random() * KANA_DATA.length)];
    const dummyChar = this.currentMode === 'hira' ? randomDummy.hira : randomDummy.kata;
    
    const charsToShuffle = [...this.targetChars, dummyChar];
    this.poolChars = charsToShuffle.map((char, index) => ({
      id: `char_${index}_${char}`,
      char: char,
      isUsed: false
    })).sort(() => 0.5 - Math.random());

    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    // ヘッダー部（星のプログレスバー）
    const header = document.createElement('div');
    header.className = 'quiz-header';
    let starsHtml = '';
    for (let i = 0; i < this.puzzleCount; i++) {
      if (i < this.currentPuzzleIndex) {
        starsHtml += '<span class="quiz-star active">⭐</span>';
      } else {
        starsHtml += '<span class="quiz-star">⚪</span>';
      }
    }
    header.innerHTML = `
      <div class="quiz-progress-stars">${starsHtml}</div>
      <div class="quiz-question-number">だい ${this.currentPuzzleIndex + 1} もん</div>
    `;
    this.container.appendChild(header);

    // お題イラストエリア
    const promptBox = document.createElement('div');
    promptBox.className = 'puzzle-prompt-box';
    promptBox.innerHTML = `
      <div class="puzzle-emoji" id="puzzle-emoji">${this.targetWord.emoji}</div>
      <div class="puzzle-prompt-title">文字をならべて ことばを つくろう！</div>
    `;
    this.container.appendChild(promptBox);

    // スロット（受け皿）エリア
    const slotsArea = document.createElement('div');
    slotsArea.className = 'puzzle-slots-container';

    this.slottedChars.forEach((item, index) => {
      const slot = document.createElement('div');
      slot.className = `puzzle-slot ${item ? 'filled' : 'empty'}`;
      slot.textContent = item ? item.char : '？';

      // 埋まっているスロットをタップするとプールに戻せる
      if (item) {
        slot.addEventListener('click', () => {
          soundManager.playPop();
          item.isUsed = false;
          this.slottedChars[index] = null;
          this.render();
        });
      }

      slotsArea.appendChild(slot);
    });
    this.container.appendChild(slotsArea);

    // 文字プール（選ぶボタン）エリア
    const poolArea = document.createElement('div');
    poolArea.className = 'puzzle-pool-container';

    this.poolChars.forEach((item) => {
      const btn = document.createElement('button');
      btn.className = `puzzle-char-btn ${item.isUsed ? 'used' : ''}`;
      btn.textContent = item.char;

      if (!item.isUsed) {
        btn.addEventListener('click', () => {
          this.handleCharSelect(item);
        });
      }

      poolArea.appendChild(btn);
    });
    this.container.appendChild(poolArea);

    // 音声ガイド
    soundManager.speak(`${this.targetWord.name}！文字をならべてね`);
  }

  handleCharSelect(item) {
    // 空いている最初のスロットを探す
    const emptyIndex = this.slottedChars.findIndex(c => c === null);
    if (emptyIndex === -1) return;

    soundManager.playPop();
    item.isUsed = true;
    this.slottedChars[emptyIndex] = item;
    this.render();

    // すべてのスロットが埋まったかチェック
    if (!this.slottedChars.includes(null)) {
      this.checkAnswer();
    }
  }

  checkAnswer() {
    const currentWord = this.slottedChars.map(c => c.char).join('');
    const targetWord = this.targetChars.join('');

    if (currentWord === targetWord) {
      // 完成！大正解！
      soundManager.playCorrect();
      triggerConfetti();

      const emojiEl = document.getElementById('puzzle-emoji');
      if (emojiEl) emojiEl.classList.add('bounce');

      soundManager.speak(`${this.targetWord.name}！できたね！すごーい！`);
      this.currentPuzzleIndex++;

      setTimeout(() => {
        if (this.currentPuzzleIndex >= this.puzzleCount) {
          this.showGoal();
        } else {
          this.nextPuzzle();
        }
      }, 1800);
    } else {
      // 順番が違う場合
      soundManager.playTryAgain();
      soundManager.speak('あれれ？もういっかい ならびかえてみてね');
    }
  }

  showGoal() {
    this.container.innerHTML = '';
    soundManager.playFanfare();

    const newSticker = stickerBook.awardRandomSticker();
    triggerConfetti();

    const goalCard = document.createElement('div');
    goalCard.className = 'quiz-goal-card';
    goalCard.innerHTML = `
      <div class="goal-crown">🎉</div>
      <h2 class="goal-title">パズル クリア！</h2>
      <p class="goal-subtitle">じょうずに ことばが つくれたね！</p>
      
      <div class="goal-sticker-award">
        <p class="award-text">🎁 ごほうびシールを ゲット！</p>
        <div class="award-sticker-emoji">${newSticker.emoji}</div>
        <div class="award-sticker-name">${newSticker.name}</div>
      </div>

      <div class="goal-actions">
        <button class="btn-goal-again">🔄 もういっかい あそぶ</button>
        <button class="btn-goal-stickers">📖 シールちょうを みる</button>
      </div>
    `;

    goalCard.querySelector('.btn-goal-again').addEventListener('click', () => {
      soundManager.playPop();
      this.startPuzzle();
    });

    goalCard.querySelector('.btn-goal-stickers').addEventListener('click', () => {
      soundManager.playPop();
      window.app.switchScreen('stickers');
    });

    this.container.appendChild(goalCard);
    soundManager.speak(`パズル クリア！すごいね！ごほうびの ${newSticker.name} シールを ゲットしたよ！`);
  }
}

const puzzleGame = new PuzzleGame();
