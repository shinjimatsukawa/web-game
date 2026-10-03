#!/usr/bin/env bash
# ==============================================================================
# もじあそび パーク - Raspberry Pi 4 デプロイスクリプト
# ==============================================================================
set -euo pipefail

REMOTE_HOST="pi4"
REMOTE_DIR="/home/shinji/kids-web-game"
PORT=8090

echo "🚀 [Deploy] Raspberry Pi 4 へのデプロイを開始します..."
echo "📍 ターゲット: ${REMOTE_HOST}:${REMOTE_DIR}"

# 1. 基本ファイル・ディレクトリの同期
echo "📦 [1/3] フロントエンドコード (HTML, CSS, JS) を同期中..."
rsync -avz \
  index.html \
  review.html \
  manifest.json \
  favicon.ico \
  favicon.svg \
  favicon-32x32.png \
  favicon-16x16.png \
  apple-touch-icon.png \
  icon-192.png \
  icon-512.png \
  ${REMOTE_HOST}:${REMOTE_DIR}/

rsync -avz --delete css/ ${REMOTE_HOST}:${REMOTE_DIR}/css/
rsync -avz --delete js/ ${REMOTE_HOST}:${REMOTE_DIR}/js/
rsync -avz --delete images/ ${REMOTE_HOST}:${REMOTE_DIR}/images/

# 2. サーバー・設定スクリプトの同期
echo "⚙️  [2/3] サーバーおよび設定ファイルを同期中..."
rsync -avz \
  server.py \
  kids-game.service \
  ${REMOTE_HOST}:${REMOTE_DIR}/

# 3. 音声アセットの同期（大容量ファイルのため更新分のみ安全に同期）
echo "🎙️  [3/3] 音声アセット (audio/neural) を同期中..."
rsync -avz --update \
  audio/neural/ \
  ${REMOTE_HOST}:${REMOTE_DIR}/audio/neural/

# 4. サーバーの再起動（systemd userサービス）
echo "🔄 [Service] kids-game サービスを再起動中..."
ssh ${REMOTE_HOST} "systemctl --user restart kids-game"

echo "✅ [Done] デプロイが正常に完了しました！"
echo "🌐 アクセスURL: http://192.168.4.97:${PORT}/"
