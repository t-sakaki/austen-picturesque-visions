#!/bin/bash
# setup_issues.sh - Setup all project issues for Austen Picturesque Visions

echo "Starting issue registration..."

gh issue create -t "プロジェクト基盤構築と環境設定" -b "Next.js (Frontend), FastAPI (Backend), .env設定、および基本CI/CDの構築。"
gh issue create -t "美学プロンプトエンジンの実装" -b "知識ベースを読み込み、選択されたレンズに基づいて最適化されたプロンプトを生成するロジックの実装。"
gh issue create -t "AIパイプラインの統合" -b "GeminiおよびBytePlus Ark APIとの連携。動画生成の非同期ポーリング処理の実装。"
gh issue create -t "フロントエンドUI - クラシック美学テーマ" -b "18世紀末の雰囲気を再現したタイポグラフィと、非対称的なレンズセレクターのUI実装。"
gh issue create -t "リアルタイム・レンズ切り替えロジック" -b "レンズ選択からプロンプト更新、視覚的変化までの一連の状態管理とスムーズな遷移の実装。"
gh issue create -t "動的画像・動画レンダリングパイプライン" -b "APIから返されたコンテンツをUIに表示し、適切なローディング演出を実装。"
gh issue create -t "対話システムの実装" -b "ジェーン・オースティン風の口調を再現したLLM対話エンジンと、分岐シナリオの実装。"
gh issue create -t "断片収集システムの構築" -b "風景の中から文学的断片を発見し、データベースに保存するロジックの実装。"
gh issue create -t "最終ギャラリー合成" -b "収集した断片を統合し、最高解像度のピクチャレスク風景画を生成する機能。"

echo "All issues have been registered successfully."
