// 4歳児向け「動く！どうぶつ・のりもの 文字あつめ」ゲームエンジン

class BubbleGame {
  constructor() {
    this.container = null;
    this.currentMode = 'hira'; // 'hira' | 'kata'
    this.currentCategory = 'all'; // 'all' | 'vehicle' | 'animal' | 'food'
    this.currentDifficulty = 'normal'; // 'easy' | 'normal' | 'hard'
    try {
      const savedDiff = localStorage.getItem('bubble_difficulty');
      if (savedDiff && ['easy', 'normal', 'hard'].includes(savedDiff)) {
        this.currentDifficulty = savedDiff;
      }
    } catch (e) {}
    this.characterQueue = [];
    this.lastCharId = null;
    this.currentChar = null;
    this.targetChars = []; // 例: ['ぶ', 'た']
    this.filledSlots = {}; // { 0: 'ぶ', 1: 'た' }
    this.isCompleted = false;
    this.activeTimers = [];

    // ステージクリア設定（10問でクリア）
    this.maxQuestions = 10;
    this.clearedCount = 0;
    this.clearedAnimals = [];
  }

  // タイマー登録（画面遷移や次へボタン押下時に確実に一括破棄）
  setTimer(fn, delay) {
    const timerId = setTimeout(() => {
      this.activeTimers = this.activeTimers.filter(id => id !== timerId);
      fn();
    }, delay);
    this.activeTimers.push(timerId);
    return timerId;
  }

  // 進行中のタイマーと音声を完全停止
  stopAllAudioAndTimers() {
    if (this.questionAudioTimer) {
      clearTimeout(this.questionAudioTimer);
      this.questionAudioTimer = null;
    }
    if (typeof clearTimeout === 'function') {
      this.activeTimers.forEach(id => clearTimeout(id));
    }
    this.activeTimers = [];
    if (typeof window !== 'undefined' && window.soundManager && typeof soundManager.stopVoice === 'function') {
      soundManager.stopVoice();
    }
  }

  // 動物・のりものの出現順序をランダムシャッフル
  refillQueue() {
    // 選択中のカテゴリで絞り込み
    const filtered = this.currentCategory === 'all'
      ? CHARACTERS_DATA
      : CHARACTERS_DATA.filter(c => c.category === this.currentCategory);

    // 元配列のインデックス一覧
    const indices = filtered.map(item => CHARACTERS_DATA.indexOf(item));

    // Fisher-Yates シャッフル
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // 先頭が直前のキャラクターと同じ場合は2番目以降と入れ替える（連続出題防止）
    if (this.lastCharId && CHARACTERS_DATA[indices[0]].id === this.lastCharId && indices.length > 1) {
      const swapIdx = 1 + Math.floor(Math.random() * (indices.length - 1));
      [indices[0], indices[swapIdx]] = [indices[swapIdx], indices[0]];
    }

    this.characterQueue = indices;
  }

  // トップ画面表示時などにあらかじめ最初の数問を準備して音声を先読みキャッシュ
  prepareQueueAndPreloadFirst() {
    if (this.characterQueue.length === 0) {
      this.refillQueue();
    }
    // 最初の3問の音声をあらかじめ一括で先読みキャッシュ
    for (let i = 0; i < Math.min(3, this.characterQueue.length); i++) {
      const char = CHARACTERS_DATA[this.characterQueue[i]];
      if (char && window.soundManager && typeof soundManager.preloadAudio === 'function') {
        soundManager.preloadAudio(`/audio/neural/questions/${char.id}.wav`);
      }
    }
  }

  setCategory(category) {
    if (this.currentCategory === category) return;
    this.stopAllAudioAndTimers();
    soundManager.unlock();
    this.currentCategory = category;
    this.clearedCount = 0;
    this.clearedAnimals = [];
    this.refillQueue();
    this.prepareQueueAndPreloadFirst();
    this.nextCharacter();
  }

  setDifficulty(diff) {
    this.stopAllAudioAndTimers();
    this.currentDifficulty = diff;
    try {
      localStorage.setItem('bubble_difficulty', diff);
    } catch (e) {}
    if (this.currentChar && this.container) {
      if (this.isCompleted) {
        // すでに回答済みの場合は次の問題へ進める
        this.nextCharacter();
      } else {
        // 解答途中の場合は現在の問題の入力状態をリセットして新難易度で再描画
        this.filledSlots = {};
        this.isCompleted = false;
        this.render();
      }
    }
  }

  init(container, mode = 'hira') {
    this.stopAllAudioAndTimers();
    this.container = container;
    this.currentMode = mode;
    this.clearedCount = 0;
    this.clearedAnimals = [];
    if (this.characterQueue.length === 0) {
      this.refillQueue();
    }
    this.nextCharacter();
  }

  setKanaMode(mode) {
    this.stopAllAudioAndTimers();
    this.currentMode = mode;
    if (this.currentChar) {
      this.targetChars = this.currentMode === 'hira' ? this.currentChar.charsHira : this.currentChar.charsKata;
      this.filledSlots = {};
      this.isCompleted = false;
      this.render();
    }
  }

  loadCharacter(charData) {
    this.currentChar = charData;
    this.lastCharId = charData.id;
    this.targetChars = this.currentMode === 'hira' ? this.currentChar.charsHira : this.currentChar.charsKata;
    this.filledSlots = {};
    this.isCompleted = false;
    this.render();

    // 次の2問の音声をあらかじめメモリにプリロード（タップ時に即座に聞けるようにキャッシュ）
    this.preloadNextQuestion();
  }

  // 次のキャラクターたちの出題音声をあらかじめキャッシュしておく（Safariのタップ再生成功率100%化）
  preloadNextQuestion() {
    if (this.characterQueue.length > 0 && window.soundManager && typeof soundManager.preloadAudio === 'function') {
      for (let i = 0; i < Math.min(2, this.characterQueue.length); i++) {
        const nextChar = CHARACTERS_DATA[this.characterQueue[i]];
        if (nextChar) {
          soundManager.preloadAudio(`/audio/neural/questions/${nextChar.id}.wav`);
        }
      }
    }
  }

  nextCharacter() {
    // 前のキャラクターのナレーションや褒め音声・タイマーを即座に完全停止
    this.stopAllAudioAndTimers();

    if (this.characterQueue.length === 0) {
      this.refillQueue();
    }
    const nextIndex = this.characterQueue.shift();
    this.loadCharacter(CHARACTERS_DATA[nextIndex]);
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const name = this.currentMode === 'hira' ? this.currentChar.nameHira : this.currentChar.nameKata;

    // ゲームメインステージ
    const stage = document.createElement('div');
    stage.className = 'bubble-stage';

    // 0-A. カテゴリ選択タブ（くるま・どうぶつ・たべもの・ぜんぶ）
    const catBar = document.createElement('div');
    catBar.className = 'category-tabs-bar';
    const categories = [
      { id: 'all', label: '🌟 ぜんぶ (75)' },
      { id: 'vehicle', label: '🚒 くるま (25)' },
      { id: 'animal', label: '🐶 どうぶつ (30)' },
      { id: 'food', label: '🍎 たべもの (20)' }
    ];
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `cat-tab-btn ${this.currentCategory === cat.id ? 'active' : ''}`;
      btn.textContent = cat.label;
      btn.addEventListener('click', () => {
        soundManager.playBubblePop();
        this.setCategory(cat.id);
      });
      catBar.appendChild(btn);
    });
    stage.appendChild(catBar);

    // 0-B. 星プログレスバー（何問できたか可視化）
    const progressElem = document.createElement('div');
    progressElem.className = 'progress-stars-bar';
    let starsHtml = '';
    for (let i = 0; i < this.maxQuestions; i++) {
      if (i < this.clearedCount) {
        starsHtml += '<span class="star-item filled">⭐</span>';
      } else {
        starsHtml += '<span class="star-item empty">☆</span>';
      }
    }
    progressElem.innerHTML = `
      <span class="progress-label">🌟 あつめた ほし:</span>
      <div class="stars-list">${starsHtml}</div>
      <span class="progress-count">${this.clearedCount} / ${this.maxQuestions}</span>
    `;
    stage.appendChild(progressElem);

    // 背景デコレーション
    const bgElem = document.createElement('div');
    bgElem.className = 'stage-bg-decor';
    bgElem.textContent = this.currentChar.bgDecor;
    stage.appendChild(bgElem);

    // 1. メインキャラクター表示（イラスト画像をタップで出題ナレーションを何度でも再生）
    const charBox = document.createElement('div');
    charBox.className = 'stage-character-box';
    charBox.id = 'stage-character';

    const imgSrc = this.currentChar.imageSrc || `/images/characters/${this.currentChar.id}.svg`;
    charBox.innerHTML = `
      <div class="character-card-wrap" role="button" tabindex="0" aria-label="${this.currentChar.nameHira}の え。タップすると こえが きこえるよ！">
        <div class="character-avatar ${this.currentChar.actionType}" id="char-avatar">
          <img src="${imgSrc}" class="character-img" alt="${this.currentChar.nameHira}" draggable="false"
               onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='block';">
          <span class="character-emoji-fallback" style="display:none;">${this.currentChar.emoji}</span>
        </div>
        <div class="correct-badge hidden" id="correct-badge">せいかい！💮</div>
      </div>
    `;

    // キャラクター画像をタップしたとき、問いかけ音声を再生（完成後はアクション音）
    charBox.addEventListener('click', () => {
      soundManager.unlock();
      this.stopAllAudioAndTimers();
      if (this.isCompleted) {
        soundManager.playCharacterAction(this.currentChar.soundType);
      } else {
        soundManager.playQuestion(this.currentChar.id);
      }
      const avatar = document.getElementById('char-avatar');
      if (avatar) {
        avatar.classList.add('tap-bounce');
        setTimeout(() => avatar.classList.remove('tap-bounce'), 400);
      }
    });

    stage.appendChild(charBox);

    // 2. 文字スロット（枠）
    const slotsContainer = document.createElement('div');
    slotsContainer.className = 'slots-container';
    slotsContainer.id = 'slots-container';

    // 普通以上（normal, hard）は順番通りに入力
    const isOrdered = this.currentDifficulty !== 'easy';
    let nextEmptyIndex = -1;
    if (isOrdered) {
      nextEmptyIndex = this.targetChars.findIndex((_, idx) => !this.filledSlots[idx]);
    }

    this.targetChars.forEach((targetChar, index) => {
      const slot = document.createElement('div');
      const isFilled = !!this.filledSlots[index];
      const isNext = isOrdered && index === nextEmptyIndex && !this.isCompleted;
      slot.className = `word-slot ${isFilled ? 'filled' : 'empty'}${isNext ? ' next-active' : ''}`;
      slot.id = `slot-${index}`;
      slot.textContent = this.filledSlots[index] || '？';
      slotsContainer.appendChild(slot);
    });

    stage.appendChild(slotsContainer);

    // 3. ふわふわ浮く文字シャボン玉エリア
    const bubblesArea = document.createElement('div');
    bubblesArea.className = 'bubbles-area';
    bubblesArea.id = 'bubbles-area';

    // 正解文字 ＋ ダミー文字（難易度に応じて動的調整）をシャッフル
    const distractors = this.currentMode === 'hira' ? RANDOM_DISTRACTORS_HIRA : RANDOM_DISTRACTORS_KATA;
    const dummyPool = distractors.filter(c => !this.targetChars.includes(c));

    // 難易度（レベル）に応じたダミー文字数の設定
    let dummyCount = 0;
    if (this.currentDifficulty === 'easy') {
      dummyCount = 0; // 🐣 かんたん: ダミーなし！正解の文字だけが浮かぶ
    } else if (this.currentDifficulty === 'normal') {
      // 🐰 ふつう: 短い単語(2〜3文字)は1個、4文字以上は2個
      dummyCount = this.targetChars.length <= 3 ? 1 : 2;
    } else {
      // 🦁 むずかしい: 3〜4個
      dummyCount = this.targetChars.length <= 3 ? 3 : 4;
    }

    const shuffledDummies = [...dummyPool].sort(() => 0.5 - Math.random()).slice(0, dummyCount);

    // 未収集の正解文字＋ダミー
    const uncollectedTargets = this.targetChars.filter((c, idx) => !this.filledSlots[idx]);
    const bubbleChars = [...uncollectedTargets, ...shuffledDummies].sort(() => 0.5 - Math.random());

    bubbleChars.forEach((ch, idx) => {
      const bubble = document.createElement('button');
      const colorNum = (idx % 4) + 1;
      bubble.className = `letter-bubble bubble-color-${colorNum} bubble-float-${colorNum}`;
      bubble.innerHTML = `
        <span class="bubble-letter">${ch}</span>
        <span class="bubble-shine"></span>
      `;

      bubble.addEventListener('click', () => {
        this.handleBubbleClick(bubble, ch);
      });

      bubblesArea.appendChild(bubble);
    });

    stage.appendChild(bubblesArea);

    // 4. クリア時の「つぎへ」および「スキップ」ナビゲーション
    const navBox = document.createElement('div');
    navBox.className = 'stage-nav-box';
    navBox.id = 'stage-nav';
    navBox.innerHTML = `
      <button class="btn-skip-question" id="btn-skip-question" aria-label="この もんだいを とばす">
        ⏭️ スキップ
      </button>
      <button class="btn-next-friend hidden" id="btn-next-friend">
        つぎの おともだち ➡
      </button>
    `;
    const skipBtn = navBox.querySelector('#btn-skip-question');
    skipBtn.addEventListener('click', () => {
      soundManager.unlock();
      soundManager.playBubblePop();
      this.nextCharacter();
    });

    const nextBtn = navBox.querySelector('#btn-next-friend');
    let nextHandled = false;
    const handleNextFriend = (e) => {
      if (nextHandled) return;
      nextHandled = true;
      soundManager.unlock();
      soundManager.playBubblePop();
      this.nextCharacter();
    };
    nextBtn.addEventListener('pointerdown', handleNextFriend);
    nextBtn.addEventListener('click', handleNextFriend);
    stage.appendChild(navBox);

    this.container.appendChild(stage);
  }

  // シャボン玉クリック時判定（かんたん: 順不同OK、ふつう・むずかしい: 順番通り）
  handleBubbleClick(bubble, clickedChar) {
    if (this.isCompleted || bubble.classList.contains('bubble-collected')) return;

    const isOrdered = this.currentDifficulty !== 'easy';
    let matchedIndex = -1;

    if (isOrdered) {
      // 順番通りモード: 次に入るべきスロットのインデックスを取得
      const nextIdx = this.targetChars.findIndex((_, idx) => !this.filledSlots[idx]);
      if (nextIdx !== -1 && this.targetChars[nextIdx] === clickedChar) {
        matchedIndex = nextIdx;
      }
    } else {
      // 順不同OKモード: まだ埋まっていない正解文字に含まれるか？
      matchedIndex = this.targetChars.findIndex((char, idx) => {
        return char === clickedChar && !this.filledSlots[idx];
      });
    }

    if (matchedIndex !== -1) {
      // ★ 正解！
      soundManager.playBubblePop();
      soundManager.playLetter(clickedChar);

      // スロットに記録
      this.filledSlots[matchedIndex] = clickedChar;

      // ★ 位置は1ミリも変えず、その場で弾けて半透明に薄くするだけ（remove()しない）
      bubble.classList.add('bubble-collected', 'bubble-pop-collect');
      setTimeout(() => bubble.classList.remove('bubble-pop-collect'), 350);

      // スロットに吸い込まれる演出
      const targetSlot = document.getElementById(`slot-${matchedIndex}`);
      if (targetSlot) {
        targetSlot.textContent = clickedChar;
        targetSlot.classList.remove('empty', 'next-active');
        targetSlot.classList.add('filled', 'slot-absorb');
        setTimeout(() => targetSlot.classList.remove('slot-absorb'), 400);
      }

      // 順番通りモードの場合、次の空きスロットに next-active を付与
      if (isOrdered) {
        const nextIdx = this.targetChars.findIndex((_, idx) => !this.filledSlots[idx]);
        if (nextIdx !== -1) {
          const nextSlot = document.getElementById(`slot-${nextIdx}`);
          if (nextSlot) {
            nextSlot.classList.add('next-active');
          }
        }
      }

      // すべてのスロットが埋まったかチェック
      if (Object.keys(this.filledSlots).length === this.targetChars.length) {
        this.handleComplete();
      }

    } else {
      // 違う文字（おしい！）
      soundManager.playBoing();
      
      // ★ 選択した文字（例: 「ね」）をまず発音し、続いて「ちがうよ〜？もういっかい！」を再生
      soundManager.playLetter(clickedChar, () => {
        soundManager.playWrongVoice();
      });

      bubble.classList.add('bubble-shake');
      setTimeout(() => bubble.classList.remove('bubble-shake'), 500);

      // キャラクターが首をかしげる
      const avatar = document.getElementById('char-avatar');
      if (avatar) {
        avatar.classList.add('puzzled');
        setTimeout(() => avatar.classList.remove('puzzled'), 600);
      }
      // 吹き出しにも選択した文字を明確に表示
      this.showSpeechBubble(`「${clickedChar}」ちがうよ〜？`);
    }
  }

  showSpeechBubble(text, duration = 2000) {
    const bubble = document.getElementById('char-speech');
    const textEl = document.getElementById('speech-text');
    if (!bubble) return;

    if (textEl) {
      textEl.textContent = text;
    } else {
      bubble.textContent = text;
    }

    bubble.classList.remove('hidden');
    bubble.classList.remove('speech-pop');
    void bubble.offsetWidth;
    bubble.classList.add('speech-pop');

    this.setTimer(() => {
      // 未完了なら元のクイズ文に戻す
      if (!this.isCompleted && textEl) {
        textEl.textContent = this.currentChar.questionText || this.currentChar.soundText;
      }
    }, duration);
  }

  // ★ 全文字揃ったときの大喜びアクション！
  handleComplete() {
    this.isCompleted = true;
    this.clearedCount++;
    this.clearedAnimals.push(this.currentChar.emoji);

    // 上部の星表示を更新
    const starsList = document.querySelector('.stars-list');
    const countLabel = document.querySelector('.progress-count');
    if (starsList) {
      let starsHtml = '';
      for (let i = 0; i < this.maxQuestions; i++) {
        if (i < this.clearedCount) {
          starsHtml += '<span class="star-item filled">⭐</span>';
        } else {
          starsHtml += '<span class="star-item empty">☆</span>';
        }
      }
      starsList.innerHTML = starsHtml;
    }
    if (countLabel) {
      countLabel.textContent = `${this.clearedCount} / ${this.maxQuestions}`;
    }

    // 残りのシャボン玉を優しく消去
    const bubblesArea = document.getElementById('bubbles-area');
    if (bubblesArea) {
      bubblesArea.style.opacity = '0.3';
      bubblesArea.style.pointerEvents = 'none';
    }

    // 画面いっぱいの紙吹雪
    if (typeof triggerConfetti === 'function') {
      triggerConfetti();
    }

    // キャラクターの巨大化＆お尻フリフリ・大ジャンプダンス
    const avatar = document.getElementById('char-avatar');
    if (avatar) {
      avatar.classList.remove(this.currentChar.actionType);
      void avatar.offsetWidth; // リフロー
      avatar.classList.add('celebration-dance');
    }

    // 正解ミニバッジを表示
    const badge = document.getElementById('correct-badge');
    if (badge) {
      badge.classList.remove('hidden');
      badge.classList.add('pop-in');
    }

    // ★ 短縮版の褒め言葉（「せいかい！〇〇！すごーい！」）を再生
    this.setTimer(() => {
      soundManager.playFanfare();
      soundManager.playPraise(this.currentChar.id);
    }, 200);

    // 規定問題数（10問）クリアしたか判定
    if (this.clearedCount >= this.maxQuestions) {
      // ★ 10問達成！ステージクリア特別演出へ！
      this.setTimer(() => {
        this.handleStageClear();
      }, 1900);
    } else {
      // スキップボタンを隠し、「つぎの おともだち ➡」ボタンを表示
      const skipBtn = document.getElementById('btn-skip-question');
      if (skipBtn) skipBtn.style.display = 'none';

      const nextBtn = document.getElementById('btn-next-friend');
      if (nextBtn) {
        this.setTimer(() => {
          nextBtn.classList.remove('hidden');
          nextBtn.classList.add('pop-in');
        }, 1200);
      }
    }
  }

  // 🏆 5問クリア！特大ご褒美画面
  handleStageClear() {
    this.stopAllAudioAndTimers();
    soundManager.playFanfare();
    soundManager.playStageClearVoice();

    // 紙吹雪を連続発射
    if (typeof triggerConfetti === 'function') {
      triggerConfetti();
      this.setTimer(triggerConfetti, 400);
      this.setTimer(triggerConfetti, 800);
    }

    // クリアモーダル作成
    const overlay = document.createElement('div');
    overlay.className = 'stage-clear-overlay';
    overlay.id = 'stage-clear-overlay';

    // 集めた動物たちの絵文字パレード
    const paradeHtml = this.clearedAnimals
      .map(emoji => `<span class="parade-animal">${emoji}</span>`)
      .join('');

    overlay.innerHTML = `
      <div class="stage-clear-card">
        <div class="clear-badge">💮 たいへんよくできました 💮</div>
        <div class="clear-trophy">🏆✨</div>
        <h2 class="clear-title">ステージ クリア！！</h2>
        <p class="clear-sub">${this.maxQuestions}もん ぜんぶ せいかい！すごーい！</p>
        <div class="clear-friends-parade">
          ${paradeHtml}
        </div>
        <div class="clear-actions">
          <button class="btn-clear-retry" id="btn-clear-retry">
            🔄 もういっかい あそぶ
          </button>
          <button class="btn-clear-home" id="btn-clear-home">
            🏠 ホームへ もどる
          </button>
        </div>
      </div>
    `;

    // もう一回あそぶ
    overlay.querySelector('#btn-clear-retry').addEventListener('click', () => {
      soundManager.unlock();
      this.stopAllAudioAndTimers();
      soundManager.playBubblePop();
      overlay.remove();
      this.clearedCount = 0;
      this.clearedAnimals = [];
      this.refillQueue();
      this.nextCharacter();
    });

    // ホームへもどる
    overlay.querySelector('#btn-clear-home').addEventListener('click', () => {
      this.stopAllAudioAndTimers();
      soundManager.playBubblePop();
      overlay.remove();
      if (window.appInstance) {
        window.appInstance.switchScreen('home', true);
      } else {
        window.location.pathname = '/';
      }
    });

    document.body.appendChild(overlay);
  }
}

const bubbleGame = new BubbleGame();
window.bubbleGame = bubbleGame;
