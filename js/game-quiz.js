// モード①: もじあてクイズ（かるたゲーム）

class QuizGame {
  constructor() {
    this.container = null;
    this.currentMode = 'hira'; // 'hira' または 'kata'
    this.questionsCount = 5;
    this.currentQuestionIndex = 0;
    this.targetItem = null;
    this.options = [];
    this.isAnswering = false;
  }

  init(container, mode = 'hira') {
    this.container = container;
    this.currentMode = mode;
    this.currentQuestionIndex = 0;
    this.startQuiz();
  }

  setKanaMode(mode) {
    this.currentMode = mode;
    this.startQuiz();
  }

  startQuiz() {
    this.currentQuestionIndex = 0;
    this.nextQuestion();
  }

  nextQuestion() {
    this.isAnswering = false;
    // 全データからランダムに正解を1つ選ぶ
    this.targetItem = KANA_DATA[Math.floor(Math.random() * KANA_DATA.length)];

    // 誤答の選択肢を3つ選ぶ
    const otherItems = KANA_DATA.filter(k => k.id !== this.targetItem.id);
    const shuffledOthers = [...otherItems].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3);

    // 選択肢4つをシャッフル
    this.options = [this.targetItem, ...distractors].sort(() => 0.5 - Math.random());

    this.renderQuestion();
  }

  renderQuestion() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const char = this.currentMode === 'hira' ? this.targetItem.hira : this.targetItem.kata;

    // ヘッダー部（星のプログレスバー）
    const header = document.createElement('div');
    header.className = 'quiz-header';
    let starsHtml = '';
    for (let i = 0; i < this.questionsCount; i++) {
      if (i < this.currentQuestionIndex) {
        starsHtml += '<span class="quiz-star active">⭐</span>';
      } else {
        starsHtml += '<span class="quiz-star">⚪</span>';
      }
    }
    header.innerHTML = `
      <div class="quiz-progress-stars">${starsHtml}</div>
      <div class="quiz-question-number">だい ${this.currentQuestionIndex + 1} もん</div>
    `;
    this.container.appendChild(header);

    // 問題提示エリア
    const promptBox = document.createElement('div');
    promptBox.className = 'quiz-prompt-box';
    promptBox.innerHTML = `
      <div class="quiz-prompt-title">「<strong>${char}</strong>」は どれかな？</div>
      <div class="quiz-prompt-hint">ヒント: ${this.targetItem.emoji} ${this.targetItem.word}</div>
      <button class="quiz-replay-voice-btn">🔊 もういっかい きく</button>
    `;

    // 音声出題: 「あ！アイス！」「どれかな？」
    const speakPrompt = () => {
      soundManager.playKana(this.targetItem.id, () => {
        soundManager.playPhrase('dorekana');
      });
    };

    promptBox.querySelector('.quiz-replay-voice-btn').addEventListener('click', () => {
      soundManager.playPop();
      speakPrompt();
    });

    this.container.appendChild(promptBox);

    // 選択肢カード（4枚）
    const choicesGrid = document.createElement('div');
    choicesGrid.className = 'quiz-choices-grid';

    this.options.forEach((opt) => {
      const optChar = this.currentMode === 'hira' ? opt.hira : opt.kata;
      const card = document.createElement('button');
      card.className = 'quiz-choice-card';
      card.innerHTML = `
        <span class="choice-char">${optChar}</span>
        <span class="choice-emoji">${opt.emoji}</span>
      `;

      card.addEventListener('click', () => this.handleChoice(card, opt));
      choicesGrid.appendChild(card);
    });

    this.container.appendChild(choicesGrid);

    // 出題時の音声再生
    setTimeout(speakPrompt, 200);
  }

  handleChoice(card, selectedItem) {
    if (this.isAnswering) return;

    if (selectedItem.id === this.targetItem.id) {
      // 正解！
      this.isAnswering = true;
      card.classList.add('correct');
      soundManager.playCorrect();

      // 紙吹雪エフェクト
      triggerConfetti();

      // 高品質音声による褒め言葉
      const phraseIds = ['correct_1', 'correct_2', 'correct_3'];
      const chosenPhrase = phraseIds[Math.floor(Math.random() * phraseIds.length)];
      setTimeout(() => soundManager.playPhrase(chosenPhrase), 300);

      this.currentQuestionIndex++;

      setTimeout(() => {
        if (this.currentQuestionIndex >= this.questionsCount) {
          this.showGoal();
        } else {
          this.nextQuestion();
        }
      }, 1600);

    } else {
      // おしい！
      soundManager.playTryAgain();
      card.classList.add('shake');
      setTimeout(() => card.classList.remove('shake'), 600);

      const phraseIds = ['try_again_1', 'try_again_2'];
      const chosenPhrase = phraseIds[Math.floor(Math.random() * phraseIds.length)];
      soundManager.playPhrase(chosenPhrase);
    }
  }

  showGoal() {
    this.container.innerHTML = '';
    soundManager.playFanfare();

    // 新しいシールをプレゼント！
    const newSticker = stickerBook.awardRandomSticker();
    triggerConfetti();

    const goalCard = document.createElement('div');
    goalCard.className = 'quiz-goal-card';
    goalCard.innerHTML = `
      <div class="goal-crown">👑</div>
      <h2 class="goal-title">ぜんもん せいかい！</h2>
      <p class="goal-subtitle">すごい！ぜんぶ クリアしたよ！</p>
      
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
      this.startQuiz();
    });

    goalCard.querySelector('.btn-goal-stickers').addEventListener('click', () => {
      soundManager.playPop();
      window.app.switchScreen('stickers');
    });

    this.container.appendChild(goalCard);
    soundManager.playPhrase('goal_quiz');
  }
}

const quizGame = new QuizGame();
