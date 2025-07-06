#!/bin/bash

# Netlify自動デプロイスクリプト
# Tullamore D.E.W. Distillery サイト用

echo "🥃 Tullamore D.E.W. Distillery - Netlify Deploy Script"
echo "======================================================="

# 色設定
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# サイトID（あなたのNetlifyサイトのID）
SITE_ID="cool-moonbeam-c338ce"

# 現在のディレクトリを確認
CURRENT_DIR=$(pwd)
echo -e "${YELLOW}📍 Current directory: $CURRENT_DIR${NC}"

# Netlifyログイン確認
echo -e "\n${YELLOW}🔐 Checking Netlify authentication...${NC}"
if ! netlify status > /dev/null 2>&1; then
    echo -e "${RED}❌ Not logged in to Netlify${NC}"
    echo -e "${YELLOW}Please run: netlify login${NC}"
    echo -e "${YELLOW}Then run this script again${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Netlify authentication confirmed${NC}"

# デプロイ実行
echo -e "\n${YELLOW}🚀 Deploying to Netlify...${NC}"
echo -e "${YELLOW}Site: https://${SITE_ID}.netlify.app/${NC}"

# プロダクションデプロイ
netlify deploy --prod --dir . --site ${SITE_ID}

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}🌐 Site URL: https://${SITE_ID}.netlify.app/${NC}"
    echo -e "${GREEN}📊 Check status: https://app.netlify.com/sites/${SITE_ID}${NC}"
else
    echo -e "\n${RED}❌ Deployment failed${NC}"
    exit 1
fi

echo -e "\n${GREEN}🎉 Deployment complete!${NC}"