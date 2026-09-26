// 高品質オーディオマネージャー（高音質AAC音声ファイル ＋ Web Audio API効果音 ＋ ナチュラルTTSフォールバック）

class SoundManager {
  constructor() {
    this.ctx = null;
    this.synth = window.speechSynthesis || null;
    this.voice = null;
    this.isUnlocked = false;
    this.currentAudio = null;

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

      // iOS SafariのSpeechSynthesisアンロック用
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
    // 日本語音声の中で、SiriやEnhancedなどの自然なボイスを優先取得
    const jaVoices = voices.filter(v => v.lang.startsWith('ja') || v.lang === 'ja_JP');
    this.voice = jaVoices.find(v => v.name.includes('Siri') || v.name.includes('Enhanced') || v.name.includes('Kyoko'))
      || jaVoices[0]
      || null;
  }

  stopAllSpeech() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // 高音質音声ファイル（AAC / m4a）の再生
  playAudioFile(src, onEnd = null) {
    this.stopAllSpeech();

    const audio = new Audio(src);
    this.currentAudio = audio;

    const cleanup = () => {
      if (this.currentAudio === audio) {
        this.currentAudio = null;
      }
      if (onEnd) onEnd();
    };

    audio.onended = cleanup;
    audio.onerror = (e) => {
      console.warn(`Audio load failed for ${src}:`, e);
      cleanup();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Audio play catch:', err);
        cleanup();
      });
    }
  }

  // 50音の「あ！アイス！」再生
  playKana(id, onEnd = null) {
    this.playAudioFile(`audio/kana/${id}.m4a`, onEnd);
  }

  // 1文字「あ」の再生
  playChar(id, onEnd = null) {
    this.playAudioFile(`audio/kana/char_${id}.m4a`, onEnd);
  }

  // 単語「いぬ！できたね！」の再生
  playWord(id, onEnd = null) {
    this.playAudioFile(`audio/words/${id}.m4a`, onEnd);
  }

  // 定型フレーズの再生
  playPhrase(phraseId, onEnd = null) {
    this.playAudioFile(`audio/phrases/${phraseId}.m4a`, onEnd);
  }

  // テキスト読み上げ（Web Speech API: ピッチ加工を廃止し自然な発音に）
  speak(text, onEnd = null) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.stopAllSpeech();

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ja-JP';
      if (this.voice) {
        utter.voice = this.voice;
      }
      // 不自然な機械音・ロボット化の原因となるピッチ変調をなくし、ナチュラルに
      utter.rate = 0.95;
      utter.pitch = 1.0;

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

  // タップ時の可愛い「ポコン♪」音
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

  // 正解時の「ピンポーン♪」チャイム
  playCorrect() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // ピン（高音 E5: 659.25Hz）
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // ポーン（中高音 C5: 523.25Hz）
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(523.25, now + 0.18);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.setValueAtTime(0.25, now + 0.18);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.18);
    osc2.stop(now + 0.7);
  }

  // 間違えたときの「ポヨン？」（不快な音ではなく、優しく可愛い効果音）
  playTryAgain() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.3);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // 星・シールの「ティロリン♪」
  playStar() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now);
      gain.gain.setValueAtTime(0.2, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.26);
    });
  }

  // キラキラファンファーレ♪
  playFanfare() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [
      { f: 523.25, d: 0.12 },
      { f: 523.25, d: 0.12 },
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.28 },
      { f: 783.99, d: 0.28 },
      { f: 1046.50, d: 0.6 }
    ];

    let t = ctx.currentTime;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.25, t);
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
