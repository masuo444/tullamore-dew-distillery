# Claude Code - 酒造サイト管理メモ

## プロジェクト構成
- **フロントエンド**: カスタムドメイン (設定により変更)
- **GitHub Pages**: GitHub Pagesからの自動デプロイ
- **API**: Vercel (https://brewery-website10.vercel.app/api/)
- **リポジトリ**: GitHub (設定により変更)

## 重要な設定
- OpenAI GPT-4o-mini API (チャットボット)
- DeepL API (翻訳機能)
- Google Translate (多言語対応)

## 🚀 自動デプロイ設定（常時有効）
**変更は即座に公式サイトに反映**: このサイトで変更を行った場合は、編集後すぐに以下を自動実行:

### 標準デプロイフロー
```bash
git add .
git commit -m "変更内容の説明

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push
```

### 公式サイト情報
- **カスタムドメイン**: 設定により変更
- **GitHub Pages URL**: 設定により変更
- **リポジトリ**: 設定により変更
- **ブランチ**: main
- **自動更新時間**: プッシュ後1-2分で反映

### デプロイステータス確認
- GitHub Actions: 自動有効
- Pages設定: main ブランチから自動デプロイ
- カスタムドメイン: 設定により変更
- HTTPS: GitHub Pagesにより自動設定

## 主要ファイル
- `index.html` - メインページ
- `js/ai-chat-secure.js` - AIチャット機能
- `js/enhanced-chat-fix.js` - チャット修正・DeepL連携
- `js/simple-api-fix.js` - API修正スクリプト
- `js/sakura-knowledge.js` - サクラの知識データベース

## AIサクラの設定
- 簡潔で的確な回答
- 毎回の自己紹介・挨拶は不要
- 装飾的表現は避ける
- 酒造の専門知識に特化

## SAKE-LiNK Template
このテンプレートは SAKE-LiNK システムで自動生成されます。
create-brewery-site.sh スクリプトが設定を自動で更新します。