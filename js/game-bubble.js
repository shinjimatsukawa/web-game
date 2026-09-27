// 4歳児向け「動く！どうぶつ・のりもの 文字あつめ」ゲームエンジン

class BubbleGame {
  constructor() {
    this.container = null;
    this.currentMode = 'hira'; // 'hira' | 'kata'
    this.currentCategory = 'all'; // 'all' | 'vehicle' | 'animal' | 'food'
    this.characterQueue = [];
    this.lastCharId = null;
    this.currentChar = null;
    this.targetChars = []; // 例: ['ぶ', 'た']
    this.filledSlots = {}; // { 0: 'ぶ', 1: 'た' }
    this.isCompleted = false;
    this.activeTimers = [];

    // ステージクリア設定（5問でクリア）
    this.maxQuestions = 5;
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

  setCategory(category) {
    if (this.currentCategory === category) return;
    this.stopAllAudioAndTimers();
    this.currentCategory = category;
    this.clearedCount = 0;
    this.clearedAnimals = [];
    this.refillQueue();
    this.nextCharacter();
  }

  init(container, mode = 'hira') {
    this.stopAllAudioAndTimers();
    this.container = container;
    this.currentMode = mode;
    this.clearedCount = 0;
    this.clearedAnimals = [];
    this.refillQueue();
    this.nextCharacter();
  }

  setKanaMode(mode) {
    this.stopAllAudioAndTimers();
    this.currentMode = mode;
    if (this.currentChar) {
      this.loadCharacter(this.currentChar, false);
    }
  }

  loadCharacter(charData, playAudio = true) {
    this.currentChar = charData;
    this.lastCharId = charData.id;
    this.targetChars = this.currentMode === 'hira' ? this.currentChar.charsHira : this.currentChar.charsKata;
    this.filledSlots = {};
    this.isCompleted = false;
    this.render();

    // 出題クイズナレーションを自動再生（例: 「どんぐり だいすき！この どうぶつは？」）
    if (playAudio && window.soundManager && typeof soundManager.playQuestion === 'function') {
      this.setTimer(() => {
        soundManager.playQuestion(charData.id);
      }, 350);
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

    // 1. メインキャラクター表示
    const charBox = document.createElement('div');
    charBox.className = 'stage-character-box';
    charBox.id = 'stage-character';

    const qText = this.currentChar.questionText || this.currentChar.soundText;
    charBox.innerHTML = `
      <div class="character-speech-bubble speech-pop" id="char-speech">
        <span class="speech-text" id="speech-text">${qText}</span>
        <button class="btn-replay-question" id="btn-replay-question" type="button" aria-label="もういちど きく">📢</button>
      </div>
      <div class="character-avatar ${this.currentChar.actionType}" id="char-avatar">
        ${this.currentChar.emoji}
      </div>
    `;

    // 📢 スピーカーボタンを押したとき、問いかけ音声をもう一度再生
    const replayBtn = charBox.querySelector('#btn-replay-question');
    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stopAllAudioAndTimers();
        soundManager.playQuestion(this.currentChar.id);
        const avatar = document.getElementById('char-avatar');
        if (avatar) {
          avatar.classList.add('tap-bounce');
          setTimeout(() => avatar.classList.remove('tap-bounce'), 400);
        }
      });
    }

    // キャラクター自身をタップしたときも、問いかけ音声を再生（完成後はアクション音）
    charBox.addEventListener('click', () => {
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

    this.targetChars.forEach((targetChar, index) => {
      const slot = document.createElement('div');
      slot.className = `word-slot ${this.filledSlots[index] ? 'filled' : 'empty'}`;
      slot.id = `slot-${index}`;
      slot.textContent = this.filledSlots[index] || '？';
      slotsContainer.appendChild(slot);
    });

    stage.appendChild(slotsContainer);

    // 3. ふわふわ浮く文字シャボン玉エリア
    const bubblesArea = document.createElement('div');
    bubblesArea.className = 'bubbles-area';
    bubblesArea.id = 'bubbles-area';

    // 正解文字 ＋ ダミー文字（2〜3個）をシャッフル
    const distractors = this.currentMode === 'hira' ? RANDOM_DISTRACTORS_HIRA : RANDOM_DISTRACTORS_KATA;
    const dummyPool = distractors.filter(c => !this.targetChars.includes(c));
    const shuffledDummies = [...dummyPool].sort(() => 0.5 - Math.random()).slice(0, 3);

    // 未収集の正解文字＋ダミー
    const uncollectedTargets = this.targetChars.filter((c, idx) => !this.filledSlots[idx]);
    const bubbleChars = [...uncollectedTargets, ...shuffledDummies].sort(() => 0.5 - Math.random());

    bubbleChars.forEach((ch, idx) => {
      const bubble = document.createElement('button');
      bubble.className = `letter-bubble bubble-float-${(idx % 4) + 1}`;
      bubble.textContent = ch;

      bubble.addEventListener('click', () => {
        this.handleBubbleClick(bubble, ch);
      });

      bubblesArea.appendChild(bubble);
    });

    stage.appendChild(bubblesArea);

    // 4. クリア時の「つぎへ」ナビゲーション
    const navBox = document.createElement('div');
    navBox.className = 'stage-nav-box hidden';
    navBox.id = 'stage-nav';
    navBox.innerHTML = `
      <button class="btn-next-friend" id="btn-next-friend">
        つぎの おともだち ➡
      </button>
    `;
    navBox.querySelector('#btn-next-friend').addEventListener('click', () => {
      soundManager.playBubblePop();
      this.nextCharacter();
    });
    stage.appendChild(navBox);

    this.container.appendChild(stage);
  }

  // シャボン玉クリック時（順不同OKの文字スロット判定）
  handleBubbleClick(bubble, clickedChar) {
    if (this.isCompleted || bubble.classList.contains('bubble-collected')) return;

    // クリックされた文字が、まだ埋まっていない正解文字に含まれるか？
    const matchedIndex = this.targetChars.findIndex((char, idx) => {
      return char === clickedChar && !this.filledSlots[idx];
    });

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
        targetSlot.classList.remove('empty');
        targetSlot.classList.add('filled', 'slot-absorb');
        setTimeout(() => targetSlot.classList.remove('slot-absorb'), 400);
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

    // 吹き出し表示（「せいかい！🎉」）
    this.showSpeechBubble(`せいかい！🎉 ${this.currentChar.soundText}`);

    // ★ 短縮版の褒め言葉（「せいかい！〇〇！すごーい！」）を再生
    this.setTimer(() => {
      soundManager.playFanfare();
      soundManager.playPraise(this.currentChar.id);
    }, 200);

    // 規定問題数（5問）クリアしたか判定
    if (this.clearedCount >= this.maxQuestions) {
      // ★ 5問達成！ステージクリア特別演出へ！
      this.setTimer(() => {
        this.handleStageClear();
      }, 1900);
    } else {
      // 通常の「つぎの おともだち ➡」ボタンを表示
      const nav = document.getElementById('stage-nav');
      if (nav) {
        this.setTimer(() => {
          nav.classList.remove('hidden');
          nav.classList.add('pop-in');
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
