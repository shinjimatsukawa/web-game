# 🌟 もじあそび パーク 🌟
### 4歳児が夢中で学べる ひらがな・カタカナ 知育Webゲーム

iPadのSafariで直感的に遊べる、4歳前後のお子様向け知育Webゲームです。  
フレームワーク不要のPure HTML/CSS/JavaScriptで構成されており、Raspberry Pi 4 などの家庭内Linuxサーバーで常時配信できます。

---

## 🎮 主なゲームモード

### 1. 🚒 うごく！文字あつめ（文字シャボン玉パズル）
- **あそびかた**: 
  - 画面上部に可愛い乗り物や動物・食べ物が登場。
  - イラスト画像をタップすると「ウ〜カンカン！火をけす この くるまは？」と楽しい問題文クイズを出題！
  - ふわふわ浮かぶシャボン玉の中から文字（例: 「し」「ょ」「う」「ぼ」「う」）を見つけてタップ。
  - 文字が揃うとキャラクターがお尻フリフリ＆大ジャンプの喜びダンス！
- **難易度切り替え（ヘッダー右上のトグルで即時変更）**:
  - 🐣 **かんたん**: ダミー文字なし（正解の文字だけが浮かぶので初めてでも安心）
  - 🐰 **ふつう**: ダミー文字 1〜2個
  - 🦁 **むずかしい**: ダミー文字 3〜4個
- **カテゴリ**: くるま (23種) / どうぶつ (30種) / たべもの (20種) / ぜんぶ (73種)

> 🔍 **問題・画像・問題文のレビュー**:
> - 📄 **GitHubレビュー用一覧 (Markdown)**: [REVIEW_CHARACTERS.md](REVIEW_CHARACTERS.md)
> - 🎧 **ブラウザ動的レビューツール (音声試聴・メモ保存)**: [review.html](review.html)

### 2. 📖 おしゃべり 50おんずかん
- あ行〜わ行の50音表。
- 文字カードをタッチすると大きくポップアップし、「あ！ アイスクリーム！」と高品質AI音声で読み上げ。
- 「ひらがな」と「カタカナ」をいつでもワンタップで切り替え可能。

---

## 🛠️ 技術スタック & 設計特徴

| コンポーネント | 採用技術・特徴 |
| :--- | :--- |
| **フロントエンド** | HTML5, CSS3, JavaScript (ES6+ Pure Vanilla JS / 外部ライブラリ非依存) |
| **サウンドエンジン** | **Web Audio API** (超低遅延オシレーター効果音) ＋ **高品質AI音声** (Gemini Aoede / Azure TTS) |
| **演出** | Canvas Confetti (紙吹雪パーティクル)、CSSアニメーション (バウンス・ダンス) |
| **データ保存** | Web Storage API (`localStorage` によるBGM・難易度設定保持) |
| **配信サーバー** | Python 3 軽量HTTPサーバー (`server.py`, ポート `8090`) |
| **常時稼働** | systemd サービス (`kids-game.service`) |

---

## 📁 ディレクトリ構成

```text
web-game/
├── index.html                   # メインHTML（SPA構成）
├── review.html                  # 文字集め問題・画像・音声レビューツール
├── REVIEW_CHARACTERS.md         # GitHubレビュー用マークダウン一覧 (全75問)
├── server.py                    # ポート8090配信用 軽量HTTPサーバー
├── kids-game.service            # systemd サービス定義ファイル
├── deploy.sh                    # Raspberry Pi 4 向け自動デプロイスクリプト
│
├── css/
│   └── style.css                # 全体デザイン・レスポンシブ・アニメーション
├── js/
│   ├── app.js                   # アプリ全体の画面遷移・BGM・ヘッダーコントローラー
│   ├── audio.js                 # Web Audio API + 音声再生マネージャー
│   ├── data.js                  # 75キャラクター & 50音マスターデータ
│   ├── game-bubble.js           # 「うごく！文字あつめ」ゲームエンジン
│   └── game-board.js            # 「50音ずかん」ゲームエンジン
│
├── audio/neural/                # 高品質音声アセット
│   ├── questions/               # 出題クイズ音声 (.wav / .mp3)
│   ├── praises/                 # クリア時の褒め音声 (.wav / .mp3)
│   ├── letters/                 # 1文字発音 (.mp3)
│   └── table/                   # 50音図鑑読み上げ (.wav / .mp3)
│
├── images/characters/           # キャラクターSVG画像
│
├── audio_quality_guard.py       # 音声品質自動検査スクリプト（ノイズ・途切れ検知）
├── clean_all_audio_tails.py     # 音声末尾ノイズ自動フェードアウト除去ツール
├── generate_gemini_audio.py     # Gemini Aoede 音声自動生成スクリプト
│
└── docs/
    └── DEPLOYMENT.md            # 詳細デプロイ・運用管理ガイド
```

---

## 💻 ローカル開発環境の起動

Macなどのローカル環境で動作確認する場合:

```bash
# Pythonの軽量サーバーを起動 (ポート 8090)
python3 server.py

# ブラウザでアクセス
open http://localhost:8090/
```

---

## 🚀 Raspberry Pi 4 へのデプロイ

### 1. 自動デプロイ（推奨）

ワンコマンドで Raspberry Pi 4 (`pi4:/home/shinji/kids-web-game/`) へのコード同期とサービスの再起動が行われます。

```bash
./deploy.sh
```

### 2. 手動デプロイ（rsync）

```bash
# フロントエンドコードの同期
rsync -avz index.html pi4:/home/shinji/kids-web-game/index.html
rsync -avz css/ pi4:/home/shinji/kids-web-game/css/
rsync -avz js/ pi4:/home/shinji/kids-web-game/js/

# サービスの再起動
ssh pi4 "sudo systemctl restart kids-game"
```

> 詳しい構築手順やトラブルシューティングは [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) をご覧ください。

---

## 📱 iPad Safari での快適プレイ（全画面アプリ化）

iPadのSafariで `http://192.168.4.97:8090/` を開いた後、以下の手順を行うことで**ブラウザのアドレスバーが非表示になり、本物のアプリのように全画面で**遊べます！

1. 画面右上の **共有ボタン**（四角から矢印が出ているアイコン）をタップ。
2. メニューから **「ホーム画面に追加」** をタップ。
3. 右上の **「追加」** をタップ。
4. ホーム画面に作成されたアイコンをタップして起動。
