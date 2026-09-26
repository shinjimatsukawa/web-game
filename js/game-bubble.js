// 4歳児向け「動く！どうぶつ・のりもの 文字あつめ」ゲームエンジン

class BubbleGame {
  constructor() {
    this.container = null;
    this.currentMode = 'hira'; // 'hira' | 'kata'
    this.characterQueue = [];
    this.lastCharId = null;
    this.currentChar = null;
    this.targetChars = []; // 例: ['ぶ', 'た']
    this.filledSlots = {}; // { 0: 'ぶ', 1: 'た' }
    this.isCompleted = false;
  }

  // 動物の出現順序をランダムシャッフル（全種出るまで被らない＆直前と同じ動物が出ない）
  refillQueue() {
    const indices = CHARACTERS_DATA.map((_, i) => i);
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

  init(container, mode = 'hira') {
    this.container = container;
    this.currentMode = mode;
    this.refillQueue();
    this.nextCharacter();
  }

  setKanaMode(mode) {
    this.currentMode = mode;
    if (this.currentChar) {
      this.loadCharacter(this.currentChar);
    }
  }

  loadCharacter(charData) {
    this.currentChar = charData;
    this.lastCharId = charData.id;
    this.targetChars = this.currentMode === 'hira' ? this.currentChar.charsHira : this.currentChar.charsKata;
    this.filledSlots = {};
    this.isCompleted = false;
    this.render();
  }

  nextCharacter() {
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

    // 背景デコレーション
    const bgElem = document.createElement('div');
    bgElem.className = 'stage-bg-decor';
    bgElem.textContent = this.currentChar.bgDecor;
    stage.appendChild(bgElem);

    // 1. メインキャラクター表示
    const charBox = document.createElement('div');
    charBox.className = 'stage-character-box';
    charBox.id = 'stage-character';
    charBox.innerHTML = `
      <div class="character-avatar ${this.currentChar.actionType}" id="char-avatar">
        ${this.currentChar.emoji}
      </div>
      <div class="character-speech-bubble hidden" id="char-speech">
        ${this.currentChar.soundText}
      </div>
    `;

    // キャラクターをタップするといつでも鳴き声＆プチアクション
    charBox.addEventListener('click', () => {
      soundManager.playCharacterAction(this.currentChar.soundType);
      const avatar = document.getElementById('char-avatar');
      if (avatar) {
        avatar.classList.add('tap-bounce');
        setTimeout(() => avatar.classList.remove('tap-bounce'), 500);
      }
      this.showSpeechBubble(this.currentChar.soundText);
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
    if (this.isCompleted) return;

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

      // シャボン玉の弾けアニメーション
      bubble.classList.add('pop-burst');
      setTimeout(() => bubble.remove(), 250);

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

  showSpeechBubble(text) {
    const bubble = document.getElementById('char-speech');
    if (!bubble) return;
    bubble.textContent = text;
    bubble.classList.remove('hidden');
    bubble.classList.add('speech-pop');
    setTimeout(() => {
      bubble.classList.remove('speech-pop');
      bubble.classList.add('hidden');
    }, 2000);
  }

  // ★ 全文字揃ったときの大喜びアクション！
  handleComplete() {
    this.isCompleted = true;

    // 残りのシャボン玉を優しく消去
    const bubblesArea = document.getElementById('bubbles-area');
    if (bubblesArea) {
      bubblesArea.style.opacity = '0.3';
      bubblesArea.style.pointerEvents = 'none';
    }

    // 動物の鳴き声＆ファンファーレ
    soundManager.playCharacterAction(this.currentChar.soundType);
    soundManager.playFanfare();

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

    // 吹き出し表示
    this.showSpeechBubble(this.currentChar.soundText);

    // ★ お姉さんの高音質音声による褒め言葉: 「ぶた！できたー！ブヒブヒ〜♪すごーい！」
    setTimeout(() => {
      soundManager.playPraise(this.currentChar.id);
    }, 500);

    // 「つぎの おともだち ➡」ボタンを表示
    const nav = document.getElementById('stage-nav');
    if (nav) {
      setTimeout(() => {
        nav.classList.remove('hidden');
        nav.classList.add('pop-in');
      }, 1200);
    }
  }
}

const bubbleGame = new BubbleGame();
