// 高品質オーディオマネージャー（NanamiNeural AI音声ファイル ＋ トイポップBGM ＋ Web Audio効果音）

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isUnlocked = false;
    this.currentVoiceAudio = null;

    // BGM関連（ブラウザのlocalStorageに設定を保持）
    const storedBgm = localStorage.getItem('kids_web_game_bgm');
    // 保存されていればその値、初回はデフォルトON（子ども向けに楽しい音楽）
    this.isBgmConfigured = storedBgm !== null ? (storedBgm === 'true') : true;
    this.isBgmPlaying = false;
    this.bgmTimer = null;
    this.bgmStep = 0;
  }

  unlock() {
    if (this.isUnlocked) {
      if (this.isBgmConfigured && !this.isBgmPlaying) {
        this.startBgm();
      }
      return;
    }
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }
      this.isUnlocked = true;
      // BGMが有効設定なら自動再生スタート
      if (this.isBgmConfigured && !this.isBgmPlaying) {
        this.startBgm();
      }
    } catch (e) {
      console.warn('Audio unlock error:', e);
    }
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) this.ctx = new AudioCtxClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // ----------------------------------------------------
  // 🎙️ 高品質音声ファイル再生（機械音TTSは一切不使用！）
  // ----------------------------------------------------
  stopVoice() {
    if (this.currentVoiceAudio) {
      this.currentVoiceAudio.pause();
      this.currentVoiceAudio.currentTime = 0;
      this.currentVoiceAudio = null;
    }
  }

  playVoiceFile(src, onEnd = null) {
    this.stopVoice();

    const audio = new Audio(src);
    this.currentVoiceAudio = audio;

    const cleanup = () => {
      if (this.currentVoiceAudio === audio) {
        this.currentVoiceAudio = null;
      }
      if (onEnd) onEnd();
    };

    audio.onended = cleanup;
    audio.onerror = (e) => {
      console.warn(`Voice file load error [${src}]:`, e);
      cleanup();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Voice play catch:', err);
        cleanup();
      });
    }
  }

  // 1文字シャボン玉音声: 「あ！」「ぶ！」
  playLetter(char, onEnd = null) {
    const encoded = encodeURIComponent(char);
    this.playVoiceFile(`/audio/neural/letters/${encoded}.mp3`, onEnd);
  }

  // 50音図鑑音声: 「あ！アイスクリーム！」
  playTableItem(itemId, onEnd = null) {
    this.playVoiceFile(`/audio/neural/table/${itemId}.mp3`, onEnd);
  }

  // 出題クイズ音声: 「どんぐり だいすき！この どうぶつは？」
  playQuestion(charId, onEnd = null) {
    this.playVoiceFile(`/audio/neural/questions/${charId}.mp3`, onEnd);
  }

  // 単語完成時の褒め言葉: 「せいかい！〇〇！すごーい！」
  playPraise(charId, onEnd = null) {
    this.playVoiceFile(`/audio/neural/praises/${charId}.mp3`, onEnd);
  }

  // 違う文字をタッチしたときのリアクション: 「ちがうよ〜？もういっかい！」
  playWrongVoice(onEnd = null) {
    this.playVoiceFile(`/audio/neural/reactions/wrong.mp3`, onEnd);
  }

  // ステージクリア時の特大褒め言葉: 「ぜんぶ できたね！すごーい！たいへんよくできました！パーフェクト！」
  playStageClearVoice(onEnd = null) {
    this.playVoiceFile(`/audio/neural/reactions/stage_clear.mp3`, onEnd);
  }

  // 恐竜大復活の褒め言葉: 「ティラノサウルス、大ふっかつ！ガオーッ！」
  playFossilReviveVoice(dinoId, onEnd = null) {
    this.playVoiceFile(`/audio/neural/fossil/${dinoId}.mp3`, onEnd);
  }

  // かせきマスター全クリア音声
  playFossilAllClearVoice(onEnd = null) {
    this.playVoiceFile(`/audio/neural/fossil/all_clear.mp3`, onEnd);
  }

  // ----------------------------------------------------
  // 🎵 トイポップ BGM ジェネレータ (Web Audio API)
  // ----------------------------------------------------
  toggleBgm() {
    this.isBgmConfigured = !this.isBgmConfigured;
    try {
      localStorage.setItem('kids_web_game_bgm', this.isBgmConfigured ? 'true' : 'false');
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    if (this.isBgmConfigured) {
      this.startBgm();
      return true;
    } else {
      this.stopBgm();
      return false;
    }
  }

  startBgm() {
    this.ensureContext();
    this.isBgmPlaying = true;
    if (this.bgmTimer) clearInterval(this.bgmTimer);

    const melody = [
      523.25, 659.25, 783.99, 659.25,
      392.00, 493.88, 587.33, 493.88,
      440.00, 523.25, 659.25, 523.25,
      349.23, 440.00, 523.25, 440.00
    ];

    const bass = [
      261.63, 261.63,
      196.00, 196.00,
      220.00, 220.00,
      174.61, 174.61
    ];

    this.bgmStep = 0;
    const tempoMs = 280;

    this.bgmTimer = setInterval(() => {
      if (!this.isBgmOn || !this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;

      // 主旋律（マリンバ風サイン波）
      const freq = melody[this.bgmStep % melody.length];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);

      // ベース
      if (this.bgmStep % 2 === 0) {
        const bassFreq = bass[Math.floor(this.bgmStep / 2) % bass.length];
        const bOsc = ctx.createOscillator();
        const bGain = ctx.createGain();
        bOsc.type = 'triangle';
        bOsc.frequency.setValueAtTime(bassFreq, now);

        bGain.gain.setValueAtTime(0.05, now);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        bOsc.connect(bGain);
        bGain.connect(ctx.destination);
        bOsc.start(now);
        bOsc.stop(now + 0.46);
      }

      this.bgmStep = (this.bgmStep + 1) % melody.length;
    }, tempoMs);
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  get isBgmOn() {
    return this.isBgmConfigured;
  }

  // ----------------------------------------------------
  // 🔊 効果音 (Web Audio API)
  // ----------------------------------------------------

  playBubblePop() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.07);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playBoing() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.4);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.46);
  }

  playCharacterAction(soundType) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (soundType === 'oink') {
      [0, 0.15, 0.3].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now + offset);
        osc.frequency.linearRampToValueAtTime(280, now + offset + 0.06);
        osc.frequency.linearRampToValueAtTime(140, now + offset + 0.12);

        gain.gain.setValueAtTime(0.2, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.13);
      });
    } else if (soundType === 'bark') {
      [0, 0.2].forEach(offset => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(380, now + offset);
        osc.frequency.exponentialRampToValueAtTime(220, now + offset + 0.12);

        gain.gain.setValueAtTime(0.3, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.15);
      });
    } else if (soundType === 'meow') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.linearRampToValueAtTime(740, now + 0.15);
      osc.frequency.linearRampToValueAtTime(440, now + 0.45);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.46);
    } else if (soundType === 'vroom' || soundType === 'jet') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);
    } else if (soundType === 'roar' || soundType === 'growl') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.2);
      osc.frequency.linearRampToValueAtTime(70, now + 0.5);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.58);
    } else if (soundType === 'trumpet') {
      [330, 440, 554].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.25, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.32);
      });
    } else if (soundType === 'chirp') {
      [600, 900, 1200].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.2, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.11);
      });
    } else if (soundType === 'hop') {
      this.playBoing();
    } else {
      const notes = [440, 554.37, 659.25];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.25, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.22);
      });
    }
  }

  playFanfare() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [
      { f: 523.25, d: 0.1 },
      { f: 523.25, d: 0.1 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.15 },
      { f: 1046.5, d: 0.45 }
    ];

    let t = ctx.currentTime;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + note.d + 0.05);

      t += note.d * 0.85;
    });
  }

  // ⛏️ つるはしハンマー音（カチン！と甲高い金属＋打撃）
  playPickaxe() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 金属の打撃音
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.08);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // 🪨 岩石が砕ける音（ガラガラッ）
  playRockBreak() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    [0, 0.04, 0.09, 0.14].forEach((offset, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const freq = 180 - idx * 25;
      osc.frequency.setValueAtTime(freq, now + offset);
      osc.frequency.exponentialRampToValueAtTime(60, now + offset + 0.08);

      gain.gain.setValueAtTime(0.25, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.09);
    });
  }

  // 🌋 恐竜復活の地響き（ズズズ…ドカーン！）
  playEarthquake() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 低音ランブル
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.3);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.8);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.85);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.9);
  }
}

const soundManager = new SoundManager();
