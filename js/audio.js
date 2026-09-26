// Web Audio API と Web Speech API を用いた幼児向けサウンドマネージャー

class SoundManager {
  constructor() {
    this.ctx = null;
    this.synth = window.speechSynthesis || null;
    this.voice = null;
    this.isUnlocked = false;

    // 音声リスト読み込み（非同期対応）
    if (this.synth) {
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoice();
      }
      this.initVoice();
    }
  }

  // 初回タップでオーディオコンテキストと音声合成をアンロック（iOS Safari対策）
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

      // iOS SafariのSpeechSynthesisアンロック用ダミースピーチ
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
    // 日本語音声を優先取得（Kyoko / Hattori / ja-JP など）
    this.voice = voices.find(v => v.lang.startsWith('ja') || v.lang === 'ja_JP') || null;
  }

  // テキスト読み上げ（Web Speech API）
  speak(text, onEnd = null) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // 既存の読み上げを停止

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ja-JP';
      if (this.voice) {
        utter.voice = this.voice;
      }
      // 4歳児向けに少しゆっくり、明るい高めのピッチ
      utter.rate = 0.88;
      utter.pitch = 1.15;

      if (onEnd) {
        utter.onend = () => onEnd();
        utter.onerror = () => onEnd();
      }

      this.synth.speak(utter);
    } catch (e) {
      console.warn('Speak error:', e);
      if (onEnd) onEnd();
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

  // ボタンをタッチしたときの可愛い「ポコン♪」音
  playPop() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // 正解したときの「ピンポーン♪」（明快な高音の和音チャイム）
  playCorrect() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // ピン（高音 E5: 659.25Hz）
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // ポーン（中高音 C5: 523.25Hz）
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(523.25, now + 0.2);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.setValueAtTime(0.3, now + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.75);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.2);
    osc2.stop(now + 0.75);
  }

  // 間違えたときの「ポヨン？」（不快なブブーではなく、優しく可愛い効果音）
  playTryAgain() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // 周波数を上下させて「ぷるん」感を出す
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.3);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // 星やシールをもらったときの「ティロリン♪」
  playStar() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now);
      gain.gain.setValueAtTime(0.25, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.26);
    });
  }

  // ゴール時のキラキラファンファーレ♪
  playFanfare() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [
      { f: 523.25, d: 0.12 }, // ド
      { f: 523.25, d: 0.12 }, // ド
      { f: 523.25, d: 0.12 }, // ド
      { f: 659.25, d: 0.28 }, // ミ
      { f: 783.99, d: 0.28 }, // ソ
      { f: 1046.50, d: 0.6 }  // 高いド
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

// グローバルインスタンス
const soundManager = new SoundManager();
