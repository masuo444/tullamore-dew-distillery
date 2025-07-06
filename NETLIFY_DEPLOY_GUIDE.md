# 🚀 Netlify 自動デプロイガイド

## 方法1: ローカルからのデプロイ（推奨）

### 初回セットアップ
```bash
# 1. Netlifyにログイン
netlify login

# 2. デプロイ実行
npm run deploy
# または
./deploy-to-netlify.sh
```

### 以降のデプロイ
```bash
# プロダクションデプロイ
npm run deploy:prod

# プレビューデプロイ
npm run deploy:preview
```

## 方法2: GitHubからの自動デプロイ

### セットアップ手順

1. **Netlify認証トークンの取得**
   - https://app.netlify.com/user/applications#personal-access-tokens
   - 「New access token」をクリック
   - トークンをコピー

2. **GitHubリポジトリに設定**
   - リポジトリの Settings → Secrets and variables → Actions
   - 以下のシークレットを追加:
     - `NETLIFY_AUTH_TOKEN`: 上記で取得したトークン
     - `NETLIFY_SITE_ID`: cool-moonbeam-c338ce

3. **自動デプロイ有効化**
   - mainブランチにプッシュすると自動でNetlifyにデプロイされます

## 方法3: Netlify側での自動デプロイ設定

1. **Netlifyダッシュボードにアクセス**
   - https://app.netlify.com/sites/cool-moonbeam-c338ce/settings/deploys

2. **Git連携設定**
   - 「Link site to Git」をクリック
   - GitHubリポジトリを選択
   - ブランチを選択（main）
   - Build commandは空欄でOK
   - Publish directoryは `.` を指定

## 便利なコマンド

```bash
# Netlifyサイトを開く
npm run open

# ステータス確認
npm run status

# ログイン
npm run login
```

## トラブルシューティング

### ログインできない場合
```bash
netlify logout
netlify login
```

### サイトIDが違う場合
`package.json` と `deploy-to-netlify.sh` の `SITE_ID` を更新してください。

### デプロイが失敗する場合
- ファイルサイズが大きすぎないか確認
- node_modules フォルダが含まれていないか確認
- .gitignore ファイルで除外されているファイルがないか確認