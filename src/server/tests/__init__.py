"""FastAPI プロンプト生成 API のテストスイート

pytest を使用して、Picturesque Visions のバックエンド API を検証します。
テスト対象エンドポイント:
  - GET  /api/health       - ヘルスチェック
  - GET  /api/lenses       - 利用可能なレンズ一覧
  - POST /api/prompts/generate - プロンプト生成

実行方法:
  cd src/server
  pip install pytest
  python -m pytest tests/ -v
"""
