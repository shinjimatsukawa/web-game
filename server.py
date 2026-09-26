#!/usr/bin/env python3
"""
4歳児向け知育Webゲーム用 軽量HTTPサーバー
ポート 8090 で静的ファイルを配信
"""

import http.server
import socketserver
import os
import sys
import urllib.parse

PORT = 8090
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class KidsGameHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def translate_path(self, path):
        # 標準のパス変換
        translated = super().translate_path(path)
        # ファイルが存在する場合はそのまま
        if os.path.exists(translated) and not os.path.isdir(translated):
            return translated

        # 拡張子のないSPAパス（/bubble, /board 等）は index.html のパスを返す
        parsed_path = urllib.parse.urlsplit(path).path
        if '.' not in os.path.basename(parsed_path):
            return os.path.join(self.directory, 'index.html')

        return translated

    def end_headers(self):
        # iPad Safariでのキャッシュ対策とCORS許可
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

    def guess_type(self, path):
        # iPad Safari対応のMIMEタイプ明示
        if path.endswith('.m4a'):
            return 'audio/mp4'
        if path.endswith('.js'):
            return 'application/javascript; charset=utf-8'
        if path.endswith('.css'):
            return 'text/css; charset=utf-8'
        if path.endswith('.html'):
            return 'text/html; charset=utf-8'
        return super().guess_type(path)

def run():
    # ポートの再利用を許可
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), KidsGameHandler) as httpd:
        print(f"🎉 [もじあつめ サーバー起動] ポート: {PORT}")
        print(f"📁 配信ディレクトリ: {DIRECTORY}")
        print(f"📱 iPadからアクセス: http://<ラズパイのIP>:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nサーバーを停止しました。")
            httpd.server_close()

if __name__ == '__main__':
    run()
