// ごほうびシール帳管理（LocalStorage対応）

class StickerBook {
  constructor() {
    this.storageKey = 'hiragana_game_stickers';
    this.collected = this.load();
  }

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('LocalStorage load error:', e);
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.collected));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // ランダムなシールを1枚プレゼント（まだ持ってないシール優先）
  awardRandomSticker() {
    const uncollected = STICKERS_DATA.filter(s => !this.collected.includes(s.id));
    let chosen;
    if (uncollected.length > 0) {
      chosen = uncollected[Math.floor(Math.random() * uncollected.length)];
    } else {
      // 全て集めていた場合は全リストから選ぶ
      chosen = STICKERS_DATA[Math.floor(Math.random() * STICKERS_DATA.length)];
    }

    if (!this.collected.includes(chosen.id)) {
      this.collected.push(chosen.id);
      this.save();
    }
    return chosen;
  }

  getCollectedCount() {
    return this.collected.length;
  }

  getTotalCount() {
    return STICKERS_DATA.length;
  }

  // シール帳グリッドを描画
  render(container) {
    container.innerHTML = '';
    const total = this.getTotalCount();
    const count = this.getCollectedCount();

    const titleEl = document.createElement('div');
    titleEl.className = 'sticker-header';
    titleEl.innerHTML = `
      <h2>✨ ごほうび シールちょう ✨</h2>
      <p class="sticker-count">あつめたシール: <strong>${count}</strong> / ${total} こ</p>
    `;
    container.appendChild(titleEl);

    const grid = document.createElement('div');
    grid.className = 'sticker-grid';

    STICKERS_DATA.forEach(sticker => {
      const isUnlocked = this.collected.includes(sticker.id);
      const slot = document.createElement('div');
      slot.className = `sticker-slot ${isUnlocked ? 'unlocked' : 'locked'}`;

      if (isUnlocked) {
        slot.innerHTML = `
          <div class="sticker-emoji">${sticker.emoji}</div>
          <div class="sticker-name">${sticker.name}</div>
        `;
        slot.addEventListener('click', () => {
          soundManager.playPop();
          soundManager.playAudioFile(`audio/stickers/${sticker.id}.m4a`);
          slot.classList.add('bounce');
          setTimeout(() => slot.classList.remove('bounce'), 500);
        });
      } else {
        slot.innerHTML = `
          <div class="sticker-emoji-locked">❓</div>
          <div class="sticker-name">？？？</div>
        `;
      }
      grid.appendChild(slot);
    });

    container.appendChild(grid);
  }
}

const stickerBook = new StickerBook();
