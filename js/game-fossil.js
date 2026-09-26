// 「ほりだせ！きょうりゅう かせきハント」ゲームエンジン
// 4歳の男の子向け 化石発掘＆恐竜復活知育ゲーム

const FOSSIL_DINOS = [
  {
    id: 'tirano',
    nameHira: 'てぃらの',
    nameKata: 'ティラノ',
    fullName: 'ティラノサウルス',
    charsHira: ['て', 'ぃ', 'ら', 'の'],
    charsKata: ['テ', 'ィ', 'ラ', 'ノ'],
    emoji: '🦖',
    themeColor: '#ff6b6b',
    soundText: 'ガオーーッ！最強のティラノ！'
  },
  {
    id: 'torikera',
    nameHira: 'とりけら',
    nameKata: 'トリケラ',
    fullName: 'トリケラトプス',
    charsHira: ['と', 'り', 'け', 'ら'],
    charsKata: ['ト', 'リ', 'ケ', 'ラ'],
    emoji: '🦕',
    themeColor: '#ffd166',
    soundText: 'ズシンズシン！ツノで突進！'
  },
  {
    id: 'putera',
    nameHira: 'ぷてら',
    nameKata: 'プテラ',
    fullName: 'プテラノドン',
    charsHira: ['ぷ', 'て', 'ら'],
    charsKata: ['プ', 'テ', 'ラ'],
    emoji: '🦅',
    themeColor: '#06d6a0',
    soundText: 'バサバサ〜！大空を飛ぶぞ！'
  },
  {
    id: 'burakio',
    nameHira: 'ぶらきお',
    nameKata: 'ブラキオ',
    fullName: 'ブラキオサウルス',
    charsHira: ['ぶ', 'ら', 'き', 'お'],
    charsKata: ['ブ', 'ラ', 'キ', 'オ'],
    emoji: '🦕',
    themeColor: '#118ab2',
    soundText: '首がながーい大巨人！'
  },
  {
    id: 'sutego',
    nameHira: 'すてご',
    nameKata: 'ステゴ',
    fullName: 'ステゴサウルス',
    charsHira: ['す', 'て', 'ご'],
    charsKata: ['ス', 'テ', 'ゴ'],
    emoji: '🦕',
    themeColor: '#f78c6c',
    soundText: '背中のトゲトゲプレート！'
  },
  {
    id: 'supino',
    nameHira: 'すぴの',
    nameKata: 'スピノ',
    fullName: 'スピノサウルス',
    charsHira: ['す', 'ぴ', 'の'],
    charsKata: ['ス', 'ピ', 'ノ'],
    emoji: '🦖',
    themeColor: '#4ea8de',
    soundText: '大きなお魚を食べるぞ！'
  },
  {
    id: 'ankiro',
    nameHira: 'あんきろ',
    nameKata: 'アンキロ',
    fullName: 'アンキロサウルス',
    charsHira: ['あ', 'ん', 'き', 'ろ'],
    charsKata: ['ア', 'ン', 'キ', 'ロ'],
    emoji: '🦕',
    themeColor: '#70c1b3',
    soundText: 'しっぽのハンマー強いぞ！'
  }
];

class FossilGame {
  constructor() {
    this.container = null;
    this.currentMode = 'hira'; // 'hira' | 'kata'
    this.currentDino = null;
    this.dinoQueue = [];
    this.clearedCount = 0;
    this.maxDinosaurs = 3; // 3頭発掘でクリア
    this.clearedDinos = [];

    this.targetChars = [];
    this.assembledSlots = {};
    this.isRevived = false;
  }

  refillQueue() {
    const indices = FOSSIL_DINOS.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    this.dinoQueue = indices;
  }

  init(container, mode = 'hira') {
    this.container = container;
    this.currentMode = mode;
    this.clearedCount = 0;
    this.clearedDinos = [];
    this.refillQueue();
    this.nextDinosaur();
  }

  setKanaMode(mode) {
    this.currentMode = mode;
    if (this.currentDino) {
      this.loadDinosaur(this.currentDino);
    }
  }

  nextDinosaur() {
    if (this.dinoQueue.length === 0) {
      this.refillQueue();
    }
    const idx = this.dinoQueue.shift();
    this.loadDinosaur(FOSSIL_DINOS[idx]);
  }

  loadDinosaur(dino) {
    this.currentDino = dino;
    this.targetChars = this.currentMode === 'hira' ? dino.charsHira : dino.charsKata;
    this.assembledSlots = {};
    this.isRevived = false;
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const stage = document.createElement('div');
    stage.className = 'fossil-stage';
    stage.id = 'fossil-stage';

    // 1. 上部進行状況（発掘バッジバー）
    const headerBar = document.createElement('div');
    headerBar.className = 'fossil-header-bar';
    let badgesHtml = '';
    for (let i = 0; i < this.maxDinosaurs; i++) {
      if (i < this.clearedDinos.length) {
        badgesHtml += `<span class="fossil-badge-icon filled">${this.clearedDinos[i].emoji}</span>`;
      } else {
        badgesHtml += `<span class="fossil-badge-icon empty">🦴</span>`;
      }
    }
    headerBar.innerHTML = `
      <span class="fossil-header-title">⛏️ はっくつ バッジ:</span>
      <div class="fossil-badges-list">${badgesHtml}</div>
      <span class="fossil-header-count">${this.clearedCount} / ${this.maxDinosaurs}</span>
    `;
    stage.appendChild(headerBar);

    // 2. 中央: 化石骨格フレーム ＆ 恐竜復活ステージ
    const frameWrap = document.createElement('div');
    frameWrap.className = 'fossil-frame-wrap';
    frameWrap.id = 'fossil-frame-wrap';

    // 恐竜アバター（最初は骨格、復活すると巨大恐竜に変化！）
    const avatarBox = document.createElement('div');
    avatarBox.className = 'fossil-avatar-box';
    avatarBox.id = 'fossil-avatar-box';
    avatarBox.innerHTML = `
      <div class="fossil-dino-avatar sleeping" id="fossil-dino-avatar">
        💀
      </div>
      <div class="fossil-speech-bubble hidden" id="fossil-speech">
        ${this.currentDino.soundText}
      </div>
      <div class="fossil-hint-name">
        ${this.currentDino.fullName}
      </div>
    `;

    // タップでいつでも咆哮
    avatarBox.addEventListener('click', () => {
      if (this.isRevived) {
        soundManager.playCharacterAction('roar');
        const avatar = document.getElementById('fossil-dino-avatar');
        avatar.classList.add('dino-roar-anim');
        setTimeout(() => avatar.classList.remove('dino-roar-anim'), 600);
        this.showSpeechBubble(this.currentDino.soundText);
      } else {
        soundManager.playBoing();
      }
    });
    frameWrap.appendChild(avatarBox);

    // 骨格スロット（文字をはめ込む枠）
    const slotsContainer = document.createElement('div');
    slotsContainer.className = 'fossil-slots-container';
    slotsContainer.id = 'fossil-slots';

    this.targetChars.forEach((ch, idx) => {
      const slot = document.createElement('div');
      slot.className = `fossil-slot ${this.assembledSlots[idx] ? 'filled' : 'empty'}`;
      slot.id = `fossil-slot-${idx}`;
      slot.innerHTML = `
        <span class="slot-bone-icon">🦴</span>
        <span class="slot-char">${this.assembledSlots[idx] || '？'}</span>
      `;
      slotsContainer.appendChild(slot);
    });
    frameWrap.appendChild(slotsContainer);

    stage.appendChild(frameWrap);

    // 3. 下部: 発掘ピット（地面の岩石ブロック）
    const pitWrap = document.createElement('div');
    pitWrap.className = 'fossil-pit-wrap';
    pitWrap.innerHTML = `
      <div class="pit-title">⛏️ いわを トントンたたいて 化石を ほりだそう！</div>
      <div class="fossil-rocks-grid" id="fossil-rocks-grid"></div>
    `;
    const rocksGrid = pitWrap.querySelector('#fossil-rocks-grid');

    // 正解文字＋シャッフル
    const rockItems = this.targetChars.map((ch, idx) => ({
      char: ch,
      hp: 2, // 2回トントンで割れる
      isTarget: true
    }));

    // ランダムダミー岩石（1〜2個）
    const distractors = this.currentMode === 'hira' ? RANDOM_DISTRACTORS_HIRA : RANDOM_DISTRACTORS_KATA;
    const dummyPool = distractors.filter(c => !this.targetChars.includes(c));
    const randomDummies = dummyPool.sort(() => 0.5 - Math.random()).slice(0, 2);
    randomDummies.forEach(c => {
      rockItems.push({ char: c, hp: 2, isTarget: false });
    });

    // シャッフル
    rockItems.sort(() => 0.5 - Math.random());

    rockItems.forEach((item, rIdx) => {
      const rock = document.createElement('div');
      rock.className = 'fossil-rock-item';
      rock.id = `rock-${rIdx}`;
      rock.innerHTML = `
        <div class="rock-stone">
          <span class="rock-emoji">🪨</span>
          <span class="rock-crack-indicator"></span>
        </div>
        <div class="fossil-bone-block hidden">
          <span class="bone-sparkle">✨</span>
          <span class="bone-char">${item.char}</span>
        </div>
      `;

      let currentHp = item.hp;

      rock.addEventListener('click', () => {
        if (rock.classList.contains('collected') || this.isRevived) return;

        if (currentHp > 1) {
          // 1回目のタップ: ヒビが入る！
          currentHp--;
          soundManager.playPickaxe();
          rock.classList.add('cracked', 'rock-hit-anim');
          setTimeout(() => rock.classList.remove('rock-hit-anim'), 300);
        } else if (currentHp === 1) {
          // 2回目のタップ: 岩が砕けて化石文字が出現！
          currentHp = 0;
          soundManager.playRockBreak();
          rock.classList.add('broken', 'shatter-anim');

          const stone = rock.querySelector('.rock-stone');
          const bone = rock.querySelector('.fossil-bone-block');
          stone.classList.add('fade-out');
          setTimeout(() => {
            stone.style.display = 'none';
            bone.classList.remove('hidden');
            bone.classList.add('bone-pop-anim');
          }, 200);

          // 化石文字クリックでスロットへ
          bone.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleBoneClick(bone, item.char, rock);
          });
        }
      });

      rocksGrid.appendChild(rock);
    });

    stage.appendChild(pitWrap);

    // 4. クリア時の「つぎの かせきへ ➡」ボタン
    const navBox = document.createElement('div');
    navBox.className = 'fossil-nav-box hidden';
    navBox.id = 'fossil-nav';
    navBox.innerHTML = `
      <button class="btn-next-fossil" id="btn-next-fossil">
        つぎの かせきを ほる ➡
      </button>
    `;
    navBox.querySelector('#btn-next-fossil').addEventListener('click', () => {
      soundManager.playBubblePop();
      this.nextDinosaur();
    });
    stage.appendChild(navBox);

    this.container.appendChild(stage);
  }

  // 掘り出した化石文字をタップ
  handleBoneClick(boneElem, clickedChar, rockContainer) {
    if (this.isRevived || rockContainer.classList.contains('collected')) return;

    // まだ埋まっていない正解スロットを探す
    const matchedIdx = this.targetChars.findIndex((char, idx) => {
      return char === clickedChar && !this.assembledSlots[idx];
    });

    if (matchedIdx !== -1) {
      // ★ 正解！スロットへ吸い込まれる
      soundManager.playBubblePop();
      soundManager.playLetter(clickedChar);

      rockContainer.classList.add('collected');
      this.assembledSlots[matchedIdx] = clickedChar;

      // スロット更新
      const targetSlot = document.getElementById(`fossil-slot-${matchedIdx}`);
      if (targetSlot) {
        targetSlot.classList.remove('empty');
        targetSlot.classList.add('filled', 'fossil-slot-absorbed');
        targetSlot.querySelector('.slot-char').textContent = clickedChar;
      }

      // 骨格が全部揃ったかチェック
      if (Object.keys(this.assembledSlots).length === this.targetChars.length) {
        this.handleDinoRevival();
      }
    } else {
      // 違う文字（ダミー）
      soundManager.playBoing();
      soundManager.playLetter(clickedChar, () => {
        soundManager.playWrongVoice();
      });
      boneElem.classList.add('shake-anim');
      setTimeout(() => boneElem.classList.remove('shake-anim'), 500);
      this.showSpeechBubble(`「${clickedChar}」ちがう化石かな？`);
    }
  }

  // 🦖 恐竜大復活シーケンス！（最高のご褒美）
  handleDinoRevival() {
    this.isRevived = true;
    this.clearedCount++;
    this.clearedDinos.push(this.currentDino);

    // 画面全体に地響き！
    const stage = document.getElementById('fossil-stage');
    if (stage) stage.classList.add('earthquake-shake');

    soundManager.playEarthquake();

    // 骨格スロットが黄金に光る
    const slots = document.querySelectorAll('.fossil-slot');
    slots.forEach(s => s.classList.add('golden-glow'));

    // 0.8秒後: 砂煙とともに大迫力の恐竜が出現！
    setTimeout(() => {
      if (stage) stage.classList.remove('earthquake-shake');

      const avatar = document.getElementById('fossil-dino-avatar');
      if (avatar) {
        avatar.textContent = this.currentDino.emoji;
        avatar.classList.remove('sleeping');
        avatar.classList.add('dino-revived-huge');
      }

      // 咆哮＆ファンファーレ
      soundManager.playCharacterAction('roar');
      soundManager.playFanfare();

      // 紙吹雪発射
      if (typeof triggerConfetti === 'function') {
        triggerConfetti();
      }

      this.showSpeechBubble(this.currentDino.soundText);

      // お姉さんの大復活音声
      setTimeout(() => {
        soundManager.playFossilReviveVoice(this.currentDino.id);
      }, 700);

      // クリア判定
      if (this.clearedCount >= this.maxDinosaurs) {
        setTimeout(() => {
          this.handleFossilMasterClear();
        }, 2200);
      } else {
        const nav = document.getElementById('fossil-nav');
        if (nav) {
          setTimeout(() => {
            nav.classList.remove('hidden');
            nav.classList.add('pop-in');
          }, 1400);
        }
      }
    }, 800);
  }

  showSpeechBubble(text) {
    const bubble = document.getElementById('fossil-speech');
    if (!bubble) return;
    bubble.textContent = text;
    bubble.classList.remove('hidden');
    bubble.classList.add('speech-pop');
    setTimeout(() => {
      bubble.classList.remove('speech-pop');
      bubble.classList.add('hidden');
    }, 2200);
  }

  // 🏆 かせきマスター クリア画面
  handleFossilMasterClear() {
    soundManager.playFanfare();
    soundManager.playFossilAllClearVoice();

    if (typeof triggerConfetti === 'function') {
      triggerConfetti();
      setTimeout(triggerConfetti, 400);
      setTimeout(triggerConfetti, 800);
    }

    const overlay = document.createElement('div');
    overlay.className = 'stage-clear-overlay';
    overlay.id = 'fossil-clear-overlay';

    const paradeHtml = this.clearedDinos
      .map(d => `<span class="parade-animal">${d.emoji}</span>`)
      .join('');

    overlay.innerHTML = `
      <div class="stage-clear-card">
        <div class="clear-badge" style="background:#ff9e00;">👑 かせきマスター 👑</div>
        <div class="clear-trophy">🦖🏆✨</div>
        <h2 class="clear-title" style="color:#d90429;">大はっくつ クリア！！</h2>
        <p class="clear-sub">${this.maxDinosaurs}とうの 恐竜が 大ふっかつしたよ！</p>
        <div class="clear-friends-parade">
          ${paradeHtml}
        </div>
        <div class="clear-actions">
          <button class="btn-clear-retry" id="btn-fossil-retry">
            🔄 もういっかい ほる
          </button>
          <button class="btn-clear-home" id="btn-fossil-home">
            🏠 ホームへ もどる
          </button>
        </div>
      </div>
    `;

    overlay.querySelector('#btn-fossil-retry').addEventListener('click', () => {
      soundManager.playBubblePop();
      overlay.remove();
      this.clearedCount = 0;
      this.clearedDinos = [];
      this.refillQueue();
      this.nextDinosaur();
    });

    overlay.querySelector('#btn-fossil-home').addEventListener('click', () => {
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

const fossilGame = new FossilGame();
