// Web Audio API による動物の鳴き声＆ポップ効果音 ＋ 音声読み上げ

class SoundManager {
  constructor() {
    this.ctx = null;
    this.synth = window.speechSynthesis || null;
    this.voice = null;
    this.isUnlocked = false;

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
      utter.pitch = 1.1; // 少し明るめのトーン
      if (onEnd) utter.onend = () => onEnd();
      this.synth.speak(utter);
    } catch (e) {
      if (onEnd) onEnd();
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

  // シャボン玉が弾ける爽快な「ポンッ！」音
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

  // 間違えたときの「ボヨヨ〜ン♪」（不快感ゼロの可愛い音）
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
      // 🐷 豚のブヒブヒ（特徴的なグロッケン調のグリッサンド音）
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
      // 🐶 犬のワンワン！
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
      // 🐱 猫のニャ〜オ♪
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
      // 🚗 車のブーーン！
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
      // デフォルトのハッピージャンプ音
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
      { f: 523.25, d: 0.1 },  // ド
      { f: 523.25, d: 0.1 },  // ド
      { f: 659.25, d: 0.12 }, // ミ
      { f: 783.99, d: 0.15 }, // ソ
      { f: 1046.5, d: 0.45 }  // 高いド
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
