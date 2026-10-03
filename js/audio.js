// 高品質オーディオマネージャー（NanamiNeural AI音声ファイル ＋ トイポップBGM ＋ Web Audio効果音）

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isUnlocked = false;
    this.isVoiceUnlocked = false;
    this.currentVoiceAudio = null;

    // iOS Safari対策: 単一のHTMLAudioElementを使い回すことで自動再生制限を回避
    try {
      this.sharedVoiceAudio = new Audio();
      this.sharedVoiceAudio.preload = 'auto';
    } catch (e) {
      this.sharedVoiceAudio = null;
    }

    // BGM関連（ブラウザのlocalStorageに設定を保持）
    const storedBgm = localStorage.getItem('kids_web_game_bgm');
    // 保存されていればその値、初回はデフォルトON（子ども向けに楽しい音楽）
    this.isBgmConfigured = storedBgm !== null ? (storedBgm === 'true') : true;
    this.isBgmPlaying = false;
    this.bgmTimer = null;
    this.bgmStep = 0;
  }

  unlock() {
    // 1. Web Audio Context アンロック（タップのたびに確実に呼び出し、suspendedを解除）
    try {
      if (!this.ctx) {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) this.ctx = new AudioCtxClass();
      }
      if (this.ctx) {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        // iOS Safari対策: 1サンプルの無音バッファを同期的に鳴らしてオーディオパイプラインを即時開通
        const dummyBuf = this.ctx.createBuffer(1, 1, 22050);
        const dummySrc = this.ctx.createBufferSource();
        dummySrc.buffer = dummyBuf;
        dummySrc.connect(this.ctx.destination);
        dummySrc.start(0);
      }
      this.isUnlocked = true;
    } catch (e) {
      console.warn('AudioContext unlock error:', e);
    }

    // 2. iOS Safari の HTMLMediaElement (Audio) アンロック
    if (this.sharedVoiceAudio) {
      try {
        const p = this.sharedVoiceAudio.play();
        if (p !== undefined) {
          p.then(() => {
            this.sharedVoiceAudio.pause();
            this.isVoiceUnlocked = true;
          }).catch(() => {});
        }
      } catch (e) {}
    }

    // もし自動再生制限で保留されていた音声があれば即座に実行
    if (this.pendingVoiceAction) {
      const action = this.pendingVoiceAction;
      this.pendingVoiceAction = null;
      action();
    }

    // 3. BGMが有効設定なら自動再生スタート
    if (this.isBgmConfigured && !this.isBgmPlaying) {
      this.startBgm();
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
  // 🎙️ 高品質音声ファイル再生（Web Audio API + AudioBuffer キャッシュで Safari Autoplay 制限を完全突破）
  // ----------------------------------------------------
  stopVoice() {
    if (this.voiceDelayTimer) {
      clearTimeout(this.voiceDelayTimer);
      this.voiceDelayTimer = null;
    }
    if (this.currentVoiceSource) {
      try {
        this.currentVoiceSource.stop();
        this.currentVoiceSource.disconnect();
      } catch (e) {}
      this.currentVoiceSource = null;
    }
    if (this.currentVoiceAudio) {
      try {
        this.currentVoiceAudio.pause();
        this.currentVoiceAudio.currentTime = 0;
      } catch (e) {}
      this.currentVoiceAudio = null;
    }
    this.pendingVoiceAction = null;
  }

  async loadAudioBuffer(url) {
    if (!this.audioBufferCache) {
      this.audioBufferCache = new Map();
    }
    if (this.audioBufferCache.has(url)) {
      return this.audioBufferCache.get(url);
    }
    const fetchUrl = url.includes('?') ? url : `${url}?v=20`;
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const ctx = this.ensureContext();
    if (!ctx) {
      throw new Error('AudioContext not available');
    }
    // Safari対応: arrayBuffer.slice(0) で安全にコピーし、PromiseとCallback両対応でデコード
    const audioBuffer = await new Promise((resolve, reject) => {
      let settled = false;
      const onOk = (buf) => {
        if (!settled) {
          settled = true;
          resolve(buf);
        }
      };
      const onErr = (e) => {
        if (!settled) {
          settled = true;
          reject(e || new Error('decodeAudioData failed'));
        }
      };
      try {
        const p = ctx.decodeAudioData(arrayBuffer.slice(0), onOk, onErr);
        if (p && typeof p.then === 'function') {
          p.then(onOk).catch(onErr);
        }
      } catch (err) {
        onErr(err);
      }
    });
    this.audioBufferCache.set(url, audioBuffer);
    return audioBuffer;
  }

  // 次の問題や重要音声をあらかじめメモリにキャッシュ
  preloadAudio(url) {
    if (!url) return;
    this.loadAudioBuffer(url).catch(() => {});
  }

  // 同期バッファ再生（クリックの直接スタック内で実行され、Safari Autoplay制限を100%突破）
  _playBufferSync(ctx, buffer, onEnd, delayMs) {
    if (ctx.state === 'suspended') {
      try {
        ctx.resume();
      } catch (e) {}
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(1.0, ctx.currentTime);
    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    this.currentVoiceSource = source;

    source.onended = () => {
      if (this.currentVoiceSource === source) {
        this.currentVoiceSource = null;
      }
      if (onEnd) onEnd();
    };

    const startTime = ctx.currentTime + Math.max(0, delayMs / 1000);
    source.start(startTime);
  }

  playVoiceFile(src, onEnd = null, fallbackSrc = null, delayMs = 0) {
    this.stopVoice();

    const ctx = this.ensureContext();
    if (ctx && ctx.state === 'suspended') {
      try {
        ctx.resume();
      } catch(e) {}
    }

    // 1. キャッシュ済みバッファなら Web Audio API で完全同期再生（最速・無遅延）
    if (this.audioBufferCache && this.audioBufferCache.has(src)) {
      this._playBufferSync(ctx, this.audioBufferCache.get(src), onEnd, delayMs);
      return;
    }

    // 2. 未キャッシュの場合: タップの同期コンテキスト内で直ちに HTMLAudioElement を play() 開始！
    //    （Safari はタップ直後の同期 play() であれば、ダウンロード中であってもブロックせず完了後に自動再生する）
    this._playHtmlAudioSync(src, onEnd, fallbackSrc, delayMs);

    // 同時にバックグラウンドで次回のためにデコードキャッシュも並行開始
    this.loadAudioBuffer(src).catch(() => {});
  }

  // 同期HTMLAudio再生（タップの直接スタック内で実行され、Safari Autoplay制限を完全突破）
  _playHtmlAudioSync(src, onEnd = null, fallbackSrc = null, delayMs = 0) {
    const audioUrl = src.includes('?') ? src : `${src}?v=20`;
    // iOS Safari 対策: 新規Audioではなく、初期アンロック済みの sharedVoiceAudio を優先使用
    const audio = this.sharedVoiceAudio || new Audio();
    audio.src = audioUrl;
    this.currentVoiceAudio = audio;

    const cleanup = () => {
      audio.onended = null;
      audio.onerror = null;
      if (this.currentVoiceAudio === audio) {
        this.currentVoiceAudio = null;
      }
      if (onEnd) onEnd();
    };

    audio.onended = cleanup;
    audio.onerror = (e) => {
      if (fallbackSrc) {
        console.info(`Voice file [${src}] not found, trying fallback [${fallbackSrc}]`);
        this.playVoiceFile(fallbackSrc, onEnd, null, 0);
      } else {
        console.warn(`Voice file load error [${src}]:`, e);
        cleanup();
      }
    };

    const doPlay = () => {
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn('HTMLAudioElement play catch:', err);
            cleanup();
          });
        }
      } catch (err) {
        console.warn('HTMLAudioElement play exception:', err);
        cleanup();
      }
    };

    // Safariのタップ操作コンテキストを100%保持するため、遅延タイマーを挟まず即座にplay()
    doPlay();
  }

  // 1文字シャボン玉音声: 「あ！」「ぶ！」
  playLetter(char, onEnd = null) {
    const encoded = encodeURIComponent(char);
    this.playVoiceFile(`/audio/neural/letters/${encoded}.mp3`, onEnd);
  }

  // 50音図鑑音声: 「あ！アイスクリーム！」 (Gemini Aoede .wav 優先、フォールバック .mp3)
  playTableItem(itemId, onEnd = null) {
    this.playVoiceFile(
      `/audio/neural/table/${itemId}.wav`,
      onEnd,
      `/audio/neural/table/${itemId}.mp3`
    );
  }

  // 出題クイズ音声: 「どんぐり だいすき！この どうぶつは？」 (Gemini Aoede .wav 優先、フォールバック .mp3)
  playQuestion(charId, onEnd = null, delayMs = 0) {
    this.playVoiceFile(
      `/audio/neural/questions/${charId}.wav`,
      onEnd,
      `/audio/neural/questions/${charId}.mp3`,
      delayMs
    );
  }

  // 単語完成時の褒め言葉: 「せいかい！〇〇！すごーい！」 (Gemini Aoede .wav 優先、フォールバック .mp3)
  playPraise(charId, onEnd = null, delayMs = 0) {
    this.playVoiceFile(
      `/audio/neural/praises/${charId}.wav`,
      onEnd,
      `/audio/neural/praises/${charId}.mp3`,
      delayMs
    );
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
