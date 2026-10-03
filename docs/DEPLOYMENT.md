# 🚀 もじあそび パーク デプロイ & 運用管理ガイド

本ドキュメントでは、知育Webゲーム「もじあそび パーク」を **Raspberry Pi 4（または Linux サーバー）** へデプロイし、常時稼働・運用するための手順とノウハウをまとめています。

---

## 📋 システム環境概要

- **配信サーバー**: Raspberry Pi 4 Model B (Raspberry Pi OS / Linux)
- **ホスト名 / IP**: `pi4` / `192.168.4.97`
- **公開ポート**: `8090`（`http://192.168.4.97:8090/`）
- **Webサーバー**: Python 3 軽量HTTPサーバー (`server.py`)
  - SPAパスルーティング対応（`/bubble`, `/board` などの直アクセス時に `index.html` を返却）
  - iOS Safari 向けキャッシュ抑制ヘッダー (`Cache-Control: no-cache, must-revalidate`)
  - CORSヘッダー対応 (`Access-Control-Allow-Origin: *`)
- **プロセス管理**: systemd (`kids-game.service`)
- **クライアント**: iPad (Safari) 最適化、ホーム画面追加によるPWA全画面対応

---

## 🛠️ 初回環境構築（Raspberry Pi 側）

新しい Raspberry Pi やサーバーでゼロから立ち上げる場合の手順です。

### 1. デプロイ先ディレクトリの作成
```bash
ssh pi4 "mkdir -p /home/shinji/kids-web-game"
```

### 2. systemd サービスファイルの登録（ユーザーモード・sudo不要）
リポジトリ内の `kids-game.service` を Raspberry Pi のユーザー systemd ディレクトリに配置します。

```ini
[Unit]
Description=Kids Web Game Server (Port 8090)
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/shinji/kids-web-game
ExecStart=/usr/bin/python3 /home/shinji/kids-web-game/server.py
Restart=always
RestartSec=5

[Install]
WantedBy=default.target
```

```bash
# ユーザーサービスディレクトリの作成と配置
ssh pi4 "mkdir -p ~/.config/systemd/user/"
ssh pi4 "cp /home/shinji/kids-web-game/kids-game.service ~/.config/systemd/user/kids-game.service"

# デーモンの再読み込みと常時起動の有効化（sudo不要）
ssh pi4 "systemctl --user daemon-reload"
ssh pi4 "systemctl --user enable kids-game"
ssh pi4 "systemctl --user start kids-game"

# ※ SSH切断後も常時起動し続けるための linger 有効化（一度だけ設定）
ssh pi4 "loginctl enable-linger shinji"
```

---

## 🚀 通常のデプロイ手順（開発機 Mac から）

### 方法A: ワンコマンド自動デプロイ（推奨）

プロジェクトルートの `deploy.sh` を実行します。HTML/CSS/JS、画像、サーバーファイル、音声アセットの同期、およびサービスの再起動が一括で行われます。

```bash
./deploy.sh
```

### 方法B: 手動デプロイ（rsync）

差分のみを手動で同期したい場合の手順です。

```bash
# 1. フロントエンド（HTML, CSS, JS）の同期
rsync -avz index.html pi4:/home/shinji/kids-web-game/index.html
rsync -avz css/ pi4:/home/shinji/kids-web-game/css/
rsync -avz js/ pi4:/home/shinji/kids-web-game/js/

# 2. 画像アセットの同期
rsync -avz images/ pi4:/home/shinji/kids-web-game/images/

# 3. サーバープログラムの同期
rsync -avz server.py pi4:/home/shinji/kids-web-game/server.py

# 4. 音声ファイル（追加・更新があった場合のみ）
rsync -avz audio/neural/ pi4:/home/shinji/kids-web-game/audio/neural/

# 5. サービスの再起動
ssh pi4 "sudo systemctl restart kids-game"
```

> [!IMPORTANT]
> **rsync の末尾スラッシュについて**:  
> `rsync -avz js/ pi4:.../js/` のように、**送信元・送信先双方に末尾スラッシュ (`/`) を指定**してください。末尾スラッシュを誤るとルート直下にファイルが展開されてしまいます。

---

## 🔄 キャッシュバスターの管理ルール

iPad の Safari はアセット（特に JavaScript や CSS）を強力にキャッシュします。  
コードを修正してデプロイする際は、**`index.html` 内のバージョンクエリ（キャッシュバスター）をインクリメント**してください。

### 例: `v=20` から `v=21` への更新
`index.html` 内:
```html
<link rel="stylesheet" href="/css/style.css?v=21">
<script src="/js/data.js?v=21"></script>
<script src="/js/audio.js?v=21"></script>
<script src="/js/game-bubble.js?v=21"></script>
<script src="/js/game-board.js?v=21"></script>
<script src="/js/app.js?v=21"></script>
```

`js/audio.js` 内（動的ロードの fetch クエリ）:
```javascript
const fetchUrl = url.includes('?') ? url : `${url}?v=21`;
```

---

## 🔧 サーバーの運用・管理コマンド

Raspberry Pi 上での systemd コマンド一覧です（SSH経由で実行可能）。

| 操作 | コマンド（sudo不要） |
| :--- | :--- |
| **ステータス確認** | `ssh pi4 "systemctl --user status kids-game"` |
| **サービス再起動** | `ssh pi4 "systemctl --user restart kids-game"` |
| **サービス停止** | `ssh pi4 "systemctl --user stop kids-game"` |
| **サービス起動** | `ssh pi4 "systemctl --user start kids-game"` |
| **ログ確認 (リアルタイム)** | `ssh pi4 "journalctl --user -u kids-game -f"` |
| **直近50行のログ確認** | `ssh pi4 "journalctl --user -u kids-game -n 50 --no-pager"` |
| **ポート8090の稼働確認** | `ssh pi4 "ss -tulpn \| grep 8090"` |

---

## 🎙️ 音声アセットの追加と品質チェック

本ゲームでは、Gemini Aoede / Azure TTS 等による高品質な AI 音声（WAV / MP3）を採用しています。

### 1. 音声生成スクリプト
- `generate_gemini_audio.py`: 出題問題文（questions）および褒め言葉（praises）の自動生成
- `generate_table_audio.py`: 50音図鑑（table）向け音声の生成

### 2. 品質ガード・ノイズ検知 (`audio_quality_guard.py`)
音声生成時に先頭・末尾の無音ノイズ、クリッピング、途切れが発生していないかを自動検査します。

```bash
# 全音声ファイルの品質検査
python3 audio_quality_guard.py
```

### 3. 音声末尾のノイズ自動除去 (`clean_all_audio_tails.py`)
無音検知とスムーズなフェードアウト（15ms）により、末尾のクリックノイズを除去します。

```bash
python3 clean_all_audio_tails.py
```

---

## ❓ トラブルシューティング

### Q1. iPad で画面を更新しても古いコードのまま動いている
1. `index.html` および `audio.js` のキャッシュバスター (`?v=XX`) がインクリメントされているか確認してください。
2. iPad Safari で該当タブを閉じ、再度 URL（`http://192.168.4.97:8090/`）を開き直してください。
3. 必要に応じて「設定」→「Safari」→「詳細」→「Webサイトデータ」から該当IPのキャッシュを消去してください。

### Q2. 音声が再生されない
1. iPad 側面の消音モード（マナーモード・サイレントスイッチ）が ON になっていないか確認してください（iOS Safari では消音モード時に Web Audio や Audio 要素の再生が無音化される場合があります）。
2. 音量ボタンで音量を上げてください。
3. 出題音声は「キャラクターのイラスト画像」をタップすることで再生されます（自動読み上げは iOS Safari の Autoplay 制約を避けるため無効化されています）。

### Q3. ポート 8090 に接続できない
1. サービスが起動しているか確認します:
   ```bash
   ssh pi4 "systemctl --user status kids-game"
   ```
2. ポート競合がないか確認します:
   ```bash
   ssh pi4 "ss -tulpn | grep 8090"
   ```
3. プロセスが停止している場合は再起動します:
   ```bash
   ssh pi4 "systemctl --user restart kids-game"
   ```
