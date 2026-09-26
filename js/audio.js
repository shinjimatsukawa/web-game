// サウンドマネージャー ＆ トイポップBGMシーケンサー

class SoundManager {
  constructor() {
    this.ctx = null;
    this.synth = window.speechSynthesis || null;
    this.voice = null;
    this.isUnlocked = false;

    // BGM関連
    this.isBgmOn = false;
    this.bgmTimer = null;
    this.bgmStep = 0;

    if (this.synth) {
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoice();
      }
      this.initVoice();
    }
  }

  unlock() {
    if (this.isUnlocked) return;
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }
      if (this.synth) {
        const dummy = new SpeechSynthesisUtterance('');
        this.synth.speak(dummy);
      }
      this.isUnlocked = true;
      this.initVoice();
    } catch (e) {
      console.warn('Audio unlock error:', e);
    }
  }

  initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    const jaVoices = voices.filter(v => v.lang.startsWith('ja') || v.lang === 'ja_JP');
    this.voice = jaVoices.find(v => v.name.includes('Siri') || v.name.includes('Enhanced') || v.name.includes('Kyoko'))
      || jaVoices[0]
      || null;
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
  // 🎵 トイポップ BGM ジェネレータ (Web Audio API)
  // ----------------------------------------------------
  toggleBgm() {
    if (this.isBgmOn) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  startBgm() {
    this.ensureContext();
    this.isBgmOn = true;
    if (this.bgmTimer) clearInterval(this.bgmTimer);

    // 明るく楽しいハッピーコード進行 (C - G - Am - F)
    // マリンバ風のペンタトニックノート
    const melody = [
      523.25, 659.25, 783.99, 659.25, // C - E - G - E
      392.00, 493.88, 587.33, 493.88, // G - B - D - B
      440.00, 523.25, 659.25, 523.25, // A - C - E - C
      349.23, 440.00, 523.25, 440.00  // F - A - C - A
    ];

    const bass = [
      261.63, 261.63, // C
      196.00, 196.00, // G
      220.00, 220.00, // A
      174.61, 174.61  // F
    ];

    this.bgmStep = 0;
    const tempoMs = 280; // 軽快なテンポ

    this.bgmTimer = setInterval(() => {
      if (!this.isBgmOn || !this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;

      // 1. マリンバ調の主旋律
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

      // 2. 優しいベース音（偶数ステップのみ）
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
    this.isBgmOn = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // ----------------------------------------------------
  // 🗣️ 音声発声
  // ----------------------------------------------------

  // 1文字「ぶ」「た」のテンポの良い発声
  speakChar(char, onEnd = null) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }
    try {
      this.synth.cancel();
      const utter = new SpeechSynthesisUtterance(char);
      utter.lang = 'ja-JP';
      if (this.voice) utter.voice = this.voice;
      utter.rate = 1.0;
      utter.pitch = 1.1;
      if (onEnd) utter.onend = () => onEnd();
      this.synth.speak(utter);
    } catch (e) {
      if (onEnd) onEnd();
    }
  }

  // 50音図鑑でのおしゃべり（「あ！アイスクリーム！」）
  speakKanaItem(item, isKata = false) {
    if (!this.synth) return;
    try {
      this.synth.cancel();
      const char = isKata ? item.kata : item.hira;
      const text = `${char}！ ${item.sound}`;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ja-JP';
      if (this.voice) utter.voice = this.voice;
      utter.rate = 0.95;
      utter.pitch = 1.15;
      this.synth.speak(utter);
    } catch (e) {
      console.warn('speak error:', e);
    }
  }

  // 完成時の掛け声: 「ぶ！た！ ぶた〜！ やったね！」
  speakPraise(name, onEnd = null) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }
    try {
      this.synth.cancel();
      const utter = new SpeechSynthesisUtterance(`${name}！できたー！すごい！`);
      utter.lang = 'ja-JP';
      if (this.voice) utter.voice = this.voice;
      utter.rate = 1.0;
      utter.pitch = 1.15;
      if (onEnd) utter.onend = () => onEnd();
      this.synth.speak(utter);
    } catch (e) {
      if (onEnd) onEnd();
    }
  }

  // ----------------------------------------------------
  // 🔊 効果音
  // ----------------------------------------------------

  // シャボン玉ポップ音
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

  // ボヨヨ〜ン音
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

  // 動物や乗り物の鳴き声・アクション音
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
    } else if (soundType === 'vroom') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);
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

  // 大完成のファンファーレ
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
}

const soundManager = new SoundManager();
