// チャットボットを開く関数（HTMLから直接呼び出し）
function openSakuraChat() {
    console.log('🌸 サクラチャットボタンがクリックされました！');
    
    // 既存のチャットを削除
    const existingChat = document.getElementById('aiChat');
    if (existingChat) {
        existingChat.remove();
    }
    
    // 直接美しいサクラチャットを作成
    createFallbackChat();
    console.log('✨ サクラチャット表示完了');
}

// サクラ専用オシャレチャットを作成
function createFallbackChat() {
    console.log('🌸 サクラのオシャレチャットを作成します');
    
    // 既存のチャットを削除
    const existingChat = document.getElementById('aiChat');
    if (existingChat) {
        existingChat.remove();
    }
    
    // 美しいサクラチャットインターフェース
    const chatHTML = `
        <div class="ai-chat active" id="aiChat">
            <div style="background: linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #F8BBD9 100%); border-radius: 20px; width: 95%; max-width: 480px; max-height: 85vh; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); position: relative;">
                <div class="chat-header">
                    <div class="chat-avatar">
                        <img src="images/sakura.png" alt="サクラ" class="sakura-avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div style="display: none; width: 100%; height: 100%; background: linear-gradient(135deg, #FFB6C1, #FFC0CB); align-items: center; justify-content: center; font-size: 24px;">🌸</div>
                    </div>
                    <div class="chat-title-info">
                        <h4>🌸 AIソムリエ・サクラ</h4>
                        <p class="chat-subtitle">益々酒造の専門アシスタント</p>
                    </div>
                    <button class="chat-close" onclick="document.getElementById('aiChat').classList.remove('active')">&times;</button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="chat-message bot-message">
                        <div class="sakura-message">
                            <img src="images/sakura.png" alt="サクラ" class="message-avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display: none; width: 32px; height: 32px; background: linear-gradient(135deg, #FFB6C1, #FFC0CB); border-radius: 50%; align-items: center; justify-content: center; font-size: 16px;">🌸</div>
                            <div class="message-content">
                                <div class="message-text">こんにちは！私はサクラです♪<br>益々酒造の日本酒について何でもお聞きください。</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="quick-questions" id="quickQuestions">
                    <button class="quick-btn" onclick="askQuestionFallback('益々酒造について教えて')">🏢 酒蔵について</button>
                    <button class="quick-btn" onclick="askQuestionFallback('おすすめの日本酒は？')">🍶 おすすめ商品</button>
                    <button class="quick-btn" onclick="askQuestionFallback('日本酒の飲み方を教えて')">🥃 飲み方</button>
                    <button class="quick-btn" onclick="askQuestionFallback('料理とのペアリングを教えて')">🍽️ ペアリング</button>
                </div>
                <div class="chat-input-container">
                    <input type="text" id="chatInput" placeholder="サクラに質問してください..." onkeypress="if(event.key==='Enter') sendChatMessageFallback()">
                    <button id="chatSend" onclick="sendChatMessageFallback()">💬</button>
                </div>
                <div class="api-status" id="apiStatus">
                    <span class="status-indicator" style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; margin-right: 8px;"></span>
                    <span class="status-text" style="font-size: 12px; color: #666;">GPT & DeepL API 接続済み ✨</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    
    // サクラ画像の確認とフォールバック設定
    setTimeout(() => {
        // サクラ画像のテスト
        const sakuraImages = document.querySelectorAll('img[src="images/sakura.png"]');
        sakuraImages.forEach(img => {
            // 画像が見つからない場合は絵文字をフォールバックとして表示
            img.onerror = function() {
                this.style.display = 'none';
                if (this.nextElementSibling) {
                    this.nextElementSibling.style.display = 'flex';
                }
            };
        });
        
        console.log('🌸 サクラチャットが準備完了しました！');
    }, 500);
}

// グローバル関数として確実に利用可能にする
window.openSakuraChat = openSakuraChat;
window.askQuestionFallback = askQuestionFallback;
window.sendChatMessageFallback = sendChatMessageFallback;

// DOMContentLoaded イベントでも関数を再登録
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 サクラチャット機能を初期化中...');
    window.openSakuraChat = openSakuraChat;
    window.askQuestionFallback = askQuestionFallback;
    window.sendChatMessageFallback = sendChatMessageFallback;
    console.log('✅ サクラチャット機能の初期化完了');
});

// フォールバック用関数
function askQuestionFallback(question) {
    const input = document.getElementById('chatInput');
    if (input) {
        input.value = question;
        sendChatMessageFallback();
    }
}

function sendChatMessageFallback() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (!input || !messagesContainer) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // ユーザーメッセージを表示（美しいデザイン）
    const userMessageHTML = `
        <div class="chat-message user-message" style="justify-content: flex-end; margin-bottom: 15px;">
            <div style="background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%); color: #1565C0; border-radius: 18px 18px 4px 18px; max-width: 75%; padding: 12px 16px; margin-right: 12px; box-shadow: 0 2px 8px rgba(21, 101, 192, 0.2);">
                <div class="message-text" style="font-size: 15px; line-height: 1.5;">${message}</div>
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', userMessageHTML);
    input.value = '';
    
    // タイピング表示（美しいデザイン）
    const typingHTML = `
        <div class="chat-message bot-message typing" id="typingMessage" style="margin-bottom: 15px;">
            <div class="sakura-message" style="display: flex; align-items: flex-start; gap: 12px; max-width: 85%;">
                <img src="images/sakura.png" alt="サクラ" class="message-avatar" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #FFB6C1; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; width: 32px; height: 32px; background: linear-gradient(135deg, #FFB6C1, #FFC0CB); border-radius: 50%; align-items: center; justify-content: center; font-size: 16px;">🌸</div>
                <div style="background: linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%); border-radius: 18px 18px 18px 4px; padding: 12px 16px; border: 1px solid rgba(255, 182, 193, 0.3); box-shadow: 0 2px 8px rgba(255, 182, 193, 0.2);">
                    <div class="typing-indicator" style="display: flex; align-items: center; gap: 4px;">
                        <span style="width: 6px; height: 6px; border-radius: 50%; background: #FFB6C1; animation: typing-bounce 1.4s infinite;"></span>
                        <span style="width: 6px; height: 6px; border-radius: 50%; background: #FFB6C1; animation: typing-bounce 1.4s infinite; animation-delay: 0.2s;"></span>
                        <span style="width: 6px; height: 6px; border-radius: 50%; background: #FFB6C1; animation: typing-bounce 1.4s infinite; animation-delay: 0.4s;"></span>
                        <span style="margin-left: 8px; font-size: 13px; color: #999;">入力中...</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // GPT APIを呼び出し
    fetch('https://brewery-website10.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            messages: [
                {
                    role: 'system',
                    content: 'あなたは「サクラ」、益々酒造の専門AIソムリエアシスタントです。簡潔で的確な回答を心がけ、聞かれたことに直接答えてください。装飾的な表現は避け、必要最小限の情報のみ提供してください。'
                },
                { role: 'user', content: message }
            ],
            model: 'gpt-4o-mini',
            max_tokens: 300
        })
    })
    .then(response => response.json())
    .then(data => {
        // タイピング削除
        const typingElement = document.getElementById('typingMessage');
        if (typingElement) typingElement.remove();
        
        // サクラの応答表示（美しいデザイン）
        const responseHTML = `
            <div class="chat-message bot-message" style="margin-bottom: 15px;">
                <div class="sakura-message" style="display: flex; align-items: flex-start; gap: 12px; max-width: 85%;">
                    <img src="images/sakura.png" alt="サクラ" class="message-avatar" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #FFB6C1; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display: none; width: 32px; height: 32px; background: linear-gradient(135deg, #FFB6C1, #FFC0CB); border-radius: 50%; align-items: center; justify-content: center; font-size: 16px;">🌸</div>
                    <div style="background: linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%); border-radius: 18px 18px 18px 4px; padding: 12px 16px; border: 1px solid rgba(255, 182, 193, 0.3); box-shadow: 0 2px 8px rgba(255, 182, 193, 0.2);">
                        <div class="message-text" style="color: #333; line-height: 1.5; font-size: 15px;">${data.choices[0].message.content}</div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', responseHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    .catch(error => {
        console.error('Chat error:', error);
        // タイピング削除
        const typingElement = document.getElementById('typingMessage');
        if (typingElement) typingElement.remove();
        
        // エラー表示（美しいデザイン）
        const errorHTML = `
            <div class="chat-message bot-message" style="margin-bottom: 15px;">
                <div class="sakura-message" style="display: flex; align-items: flex-start; gap: 12px; max-width: 85%;">
                    <img src="images/sakura.png" alt="サクラ" class="message-avatar" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #FFB6C1; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display: none; width: 32px; height: 32px; background: linear-gradient(135deg, #FFB6C1, #FFC0CB); border-radius: 50%; align-items: center; justify-content: center; font-size: 16px;">🌸</div>
                    <div style="background: linear-gradient(135deg, #FFE4E1 0%, #FFCCCB 100%); border-radius: 18px 18px 18px 4px; padding: 12px 16px; border: 1px solid rgba(255, 182, 193, 0.4); box-shadow: 0 2px 8px rgba(255, 204, 203, 0.3);">
                        <div class="message-text" style="color: #D32F2F; line-height: 1.5; font-size: 15px;">申し訳ございません。現在技術的な問題が発生しています。少し後でもう一度お試しください。🌸</div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', errorHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}

// よくある質問をクリック（直接版）
function askQuestionDirect(question) {
    const input = document.getElementById('chatInputDirect');
    if (input) {
        input.value = question;
        sendChatMessageDirect();
    }
}

// チャットメッセージを送信（直接版）
function sendChatMessageDirect() {
    const input = document.getElementById('chatInputDirect');
    const messagesContainer = document.getElementById('chatMessagesDirect');
    
    if (!input || !messagesContainer) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // ユーザーメッセージを表示
    const userMessageHTML = `
        <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; justify-content: flex-end;">
            <div style="background: linear-gradient(135deg, #0B1426 0%, #1E3A8A 100%); color: white; padding: 15px 18px; border-radius: 18px 18px 4px 18px; max-width: 80%; box-shadow: 0 2px 10px rgba(11, 20, 38, 0.2);">
                <p style="margin: 0; line-height: 1.5; font-size: 15px;">${message}</p>
            </div>
            <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #0B1426 0%, #1E3A8A 100%); color: white; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 600;">
                あ
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', userMessageHTML);
    input.value = '';
    
    // タイピング表示
    const typingHTML = `
        <div id="typingIndicator" style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px;">
            <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid #E8B86D; background: white; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                <img src="images/sakura.png" alt="サクラ" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <span style="display: none; font-size: 18px;">🌸</span>
            </div>
            <div style="background: linear-gradient(135deg, #F2D194 0%, #E8B86D 100%); color: #0B1426; padding: 15px 18px; border-radius: 18px 18px 18px 4px; max-width: 80%; box-shadow: 0 2px 10px rgba(232, 184, 109, 0.3);">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 8px; height: 8px; background: #0B1426; border-radius: 50%; animation: typing 1.4s infinite; opacity: 0.6;"></div>
                    <div style="width: 8px; height: 8px; background: #0B1426; border-radius: 50%; animation: typing 1.4s infinite 0.2s; opacity: 0.6;"></div>
                    <div style="width: 8px; height: 8px; background: #0B1426; border-radius: 50%; animation: typing 1.4s infinite 0.4s; opacity: 0.6;"></div>
                    <span style="margin-left: 8px; font-size: 14px; opacity: 0.8;">入力中</span>
                </div>
            </div>
        </div>
        <style>
            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-10px); }
            }
        </style>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // API呼び出し
    fetch('https://brewery-website10.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            messages: [
                {
                    role: 'system',
                    content: 'あなたは「サクラ」、益々酒造の専門AIソムリエアシスタントです。簡潔で的確な回答を心がけ、聞かれたことに直接答えてください。'
                },
                { role: 'user', content: message }
            ],
            model: 'gpt-4o-mini',
            max_tokens: 300
        })
    })
    .then(response => response.json())
    .then(data => {
        // タイピング削除
        const typingElement = document.getElementById('typingIndicator');
        if (typingElement) typingElement.remove();
        
        // 応答表示
        const responseHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid #E8B86D; background: white; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                    <img src="images/sakura.png" alt="サクラ" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <span style="display: none; font-size: 18px;">🌸</span>
                </div>
                <div style="background: linear-gradient(135deg, #F2D194 0%, #E8B86D 100%); color: #0B1426; padding: 15px 18px; border-radius: 18px 18px 18px 4px; max-width: 80%; box-shadow: 0 2px 10px rgba(232, 184, 109, 0.3);">
                    <p style="margin: 0; line-height: 1.5; font-size: 15px;">${data.choices[0].message.content}</p>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', responseHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    .catch(error => {
        console.error('Chat error:', error);
        // タイピング削除
        const typingElement = document.getElementById('typingIndicator');
        if (typingElement) typingElement.remove();
        
        // エラー表示
        const errorHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid #E8B86D; background: white; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                    <img src="images/sakura.png" alt="サクラ" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <span style="display: none; font-size: 18px;">🌸</span>
                </div>
                <div style="background: linear-gradient(135deg, #F2D194 0%, #E8B86D 100%); color: #0B1426; padding: 15px 18px; border-radius: 18px 18px 18px 4px; max-width: 80%; box-shadow: 0 2px 10px rgba(232, 184, 109, 0.3);">
                    <p style="margin: 0; line-height: 1.5; font-size: 15px;">申し訳ございません。現在技術的な問題が発生しています。少し後でもう一度お試しください。</p>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', errorHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}

// 開発者向け: 公式サイト反映確認
function checkDeploymentStatus() {
    console.log('🚀 GitHub Pages デプロイメント情報');
    console.log('📍 公式サイト: https://masuo444.github.io/brewery-website/');
    console.log('📂 リポジトリ: https://github.com/masuo444/brewery-website.git');
    console.log('🔄 最終更新: ' + new Date().toLocaleString('ja-JP'));
    console.log('⚡ 変更は1-2分で自動反映されます');
    
    // GitHub Pages のビルドステータスをチェック（可能な場合）
    fetch('https://api.github.com/repos/masuo444/brewery-website/pages/builds/latest')
        .then(response => response.json())
        .then(data => {
            console.log('📊 最新ビルド状況:', data.status);
            console.log('🕐 ビルド日時:', new Date(data.created_at).toLocaleString('ja-JP'));
        })
        .catch(error => {
            console.log('📊 ビルド状況: GitHub Pages は自動デプロイ中');
        });
}

// 開発モードでのみ表示
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    setTimeout(checkDeploymentStatus, 2000);
}

// Global variables
let currentLanguage = 'ja';
let currentFilters = {
    type: 'all',
    price: 'all',
    region: 'all',
    limited: false,
    search: ''
};
let cart = [];
let filteredProducts = [...sakeData];

// DOM elements
const languageSelect = document.getElementById('languageSelect');
const globalSearch = document.getElementById('globalSearch');
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartContent = document.getElementById('cartContent');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const aiChat = document.getElementById('aiChat');
const aiSommelierBtn = document.getElementById('aiSommelierBtn');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const qrScanner = document.getElementById('qrScanner');
const qrScanBtn = document.getElementById('qrScanBtn');
const scannerClose = document.getElementById('scannerClose');
const quickLangBtn = document.getElementById('quickLangBtn');
const header = document.querySelector('.header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const aiChatStartBtn = document.getElementById('aiChatStartBtn');
const mobileAiSommelierBtn = document.getElementById('mobileAiSommelierBtn');
const aiSommelierChatBtn = document.getElementById('aiSommelierChatBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// チャットボットを確実に開く関数
function openSakuraChat() {
    console.log('🌸 チャットボタンがクリックされました');
    
    // 既存のチャットを削除
    const existingChat = document.getElementById('aiChat');
    if (existingChat) {
        existingChat.remove();
    }
    
    // 確実にチャットを表示
    createSimpleChat();
}

// シンプルで確実なチャット作成
function createSimpleChat() {
    const chatHTML = `
        <div class="ai-chat active" id="aiChat" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; border-radius: 12px; padding: 20px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 2px solid #E8B86D; padding-bottom: 10px;">
                    <h3 style="color: #0B1426; margin: 0;">🌸 AIソムリエ・サクラ</h3>
                    <button onclick="closeSakuraChat()" style="border: none; background: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
                </div>
                <div style="margin-bottom: 15px; padding: 15px; background: linear-gradient(135deg, #E8B86D 0%, #F2D194 100%); border-radius: 8px; color: #0B1426;">
                    <p style="margin: 0 0 8px 0;"><strong>こんにちは！私はサクラです。</strong></p>
                    <p style="margin: 0;">益々酒造の日本酒について何でもお聞きください。</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #0B1426; margin-bottom: 10px;">💬 よくある質問</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px;">
                        <button onclick="askQuestion('益々酒造について教えて')" style="padding: 8px 12px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; cursor: pointer; font-size: 14px;">🏢 酒蔵について</button>
                        <button onclick="askQuestion('おすすめの日本酒は？')" style="padding: 8px 12px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; cursor: pointer; font-size: 14px;">🍶 おすすめ商品</button>
                        <button onclick="askQuestion('日本酒の飲み方を教えて')" style="padding: 8px 12px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; cursor: pointer; font-size: 14px;">🥃 飲み方</button>
                        <button onclick="askQuestion('料理とのペアリングを教えて')" style="padding: 8px 12px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; cursor: pointer; font-size: 14px;">🍽️ ペアリング</button>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <input type="text" id="chatInput" placeholder="質問をどうぞ..." style="flex: 1; padding: 12px; border: 1px solid #dee2e6; border-radius: 6px; font-size: 16px;" onkeypress="if(event.key==='Enter') sendChatMessage()">
                    <button onclick="sendChatMessage()" style="padding: 12px 20px; background: linear-gradient(135deg, #E8B86D 0%, #F2D194 100%); color: #0B1426; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">送信</button>
                </div>
                <div id="chatMessages" style="max-height: 200px; overflow-y: auto; border: 1px solid #dee2e6; border-radius: 6px; padding: 10px; background: #fafafa;"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    console.log('✅ チャットインターフェースを作成しました');
    
    // 初期メッセージを表示
    setTimeout(() => {
        addChatMessage('サクラ', 'こんにちは！益々酒造のAIソムリエアシスタント、サクラです。日本酒について何でもお聞きください。', 'bot');
    }, 500);
}

// チャットを閉じる関数
function closeSakuraChat() {
    const chatElement = document.getElementById('aiChat');
    if (chatElement) {
        chatElement.remove();
    }
}

// チャットメッセージを送信
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // ユーザーメッセージを表示
    addChatMessage('あなた', message, 'user');
    input.value = '';
    
    // タイピングインジケーターを表示
    addChatMessage('サクラ', '入力中...', 'bot', true);
    
    // API経由でメッセージを送信
    sendToAPI(message);
}

// よくある質問をクリック
function askQuestion(question) {
    const input = document.getElementById('chatInput');
    input.value = question;
    sendChatMessage();
}

// チャットメッセージを追加
function addChatMessage(sender, message, type, isTyping = false) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;
    
    // タイピングメッセージを削除
    if (!isTyping) {
        const typingMsg = messagesContainer.querySelector('.typing-message');
        if (typingMsg) typingMsg.remove();
    }
    
    const messageClass = isTyping ? 'typing-message' : '';
    const bgColor = type === 'user' ? '#e3f2fd' : '#f3e5f5';
    const textColor = type === 'user' ? '#0B1426' : '#0B1426';
    
    const messageHTML = `
        <div class="${messageClass}" style="margin: 10px 0; padding: 10px; background: ${bgColor}; border-radius: 8px; border-left: 4px solid #E8B86D;">
            <div style="font-weight: 600; color: ${textColor}; margin-bottom: 4px;">${sender}</div>
            <div style="color: ${textColor};">${message}</div>
        </div>
    `;
    
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// APIにメッセージを送信
async function sendToAPI(message) {
    try {
        const response = await fetch('https://brewery-website10.vercel.app/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'system',
                        content: 'あなたは「サクラ」、益々酒造の専門AIソムリエアシスタントです。簡潔で的確な回答を心がけ、聞かれたことに直接答えてください。装飾的な表現は避け、必要最小限の情報のみ提供してください。'
                    },
                    { role: 'user', content: message }
                ],
                model: 'gpt-4o-mini',
                max_tokens: 300
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            addChatMessage('サクラ', data.choices[0].message.content, 'bot');
        } else {
            addChatMessage('サクラ', '申し訳ございません。現在技術的な問題が発生しています。', 'bot');
        }
    } catch (error) {
        console.error('Chat error:', error);
        addChatMessage('サクラ', '接続エラーが発生しました。少し後でもう一度お試しください。', 'bot');
    }
}

function initializeApp() {
    // Set initial language from localStorage or default to Japanese
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        // Set initial language from browser or default to Japanese
        const browserLang = navigator.language.slice(0, 2);
        if (translations[browserLang]) {
            currentLanguage = browserLang;
        }
    }
    
    // Make current language available globally for AI chat
    window.currentLanguage = currentLanguage;
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }

    // Apply initial translations
    updateLanguage();

    // Render initial products
    renderProducts();

    // Setup event listeners
    setupEventListeners();

    // Setup filter tabs
    setupFilterTabs();

    // Scroll effect for header
    setupScrollEffects();

    // Initialize animations
    setupAnimations();
}

function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Language selector (disabled - using Google Translate)
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            window.currentLanguage = currentLanguage; // Make available globally
            updateLanguage();
            renderProducts();
        });
    }

    // Global search
    globalSearch.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        filterAndRenderProducts();
    });

    globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            filterAndRenderProducts();
        }
    });

    // Cart functionality
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    cartClose.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(translations[currentLanguage].checkoutMessage || 'Proceeding to checkout...');
        }
    });

    // Modal functionality
    modalClose.addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });

    // AI Chat functionality
    if (aiSommelierBtn) {
        aiSommelierBtn.addEventListener('click', openSakuraChat);
    }

    // AI Chat start button from intro section
    if (aiChatStartBtn) {
        aiChatStartBtn.addEventListener('click', openSakuraChat);
    }

    // Mobile AI Sommelier button
    if (mobileAiSommelierBtn) {
        mobileAiSommelierBtn.addEventListener('click', () => {
            console.log('📱 モバイルAIソムリエボタンがクリックされました');
            openSakuraChat();
        });
    }

    // AI Sommelier chat button in intro section
    if (aiSommelierChatBtn) {
        aiSommelierChatBtn.addEventListener('click', () => {
            console.log('🌸 AIソムリエ・サクラボタンがクリックされました');
            openSakuraChat();
        });
    }

    chatClose.addEventListener('click', () => {
        aiChat.classList.remove('active');
    });

    chatSend.addEventListener('click', () => {
        sendChatMessage();
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // QR Scanner functionality (削除済み)
    if (qrScanBtn) {
        qrScanBtn.addEventListener('click', () => {
            if (qrScanner) {
                qrScanner.style.display = 'flex';
                // Simulate QR scanning
                setTimeout(() => {
                    const randomProduct = sakeData[Math.floor(Math.random() * sakeData.length)];
                    openProductModal(randomProduct);
                    qrScanner.style.display = 'none';
                }, 3000);
            }
        });
    }

    if (scannerClose) {
        scannerClose.addEventListener('click', () => {
            if (qrScanner) {
                qrScanner.style.display = 'none';
            }
        });
    }

    // Quick language switcher (disabled - using Google Translate)
    if (quickLangBtn) {
        quickLangBtn.addEventListener('click', () => {
            const languages = ['ja', 'en', 'fr', 'zh', 'ko', 'it', 'es', 'vi'];
            const currentIndex = languages.indexOf(currentLanguage);
            const nextIndex = (currentIndex + 1) % languages.length;
            currentLanguage = languages[nextIndex];
            window.currentLanguage = currentLanguage; // Make available globally
            if (languageSelect) languageSelect.value = currentLanguage;
            updateLanguage();
            renderProducts();
        });
    }

    // Close sidebars when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
        
        if (!aiChat.contains(e.target) && !aiSommelierBtn.contains(e.target)) {
            aiChat.classList.remove('active');
        }

        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

function setupFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const filterSections = document.querySelectorAll('.filter-section');
    const filterContent = document.querySelector('.filter-content');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;
            
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all filter sections
            filterSections.forEach(section => {
                section.style.display = 'none';
            });

            if (filter === 'all') {
                filterContent.classList.remove('active');
                currentFilters = { type: 'all', price: 'all', region: 'all', limited: false, search: currentFilters.search };
            } else if (filter === 'limited') {
                filterContent.classList.remove('active');
                currentFilters.limited = !currentFilters.limited;
                tab.classList.toggle('active', currentFilters.limited);
                if (!currentFilters.limited) {
                    document.querySelector('[data-filter="all"]').classList.add('active');
                }
            } else {
                filterContent.classList.add('active');
                const targetSection = document.getElementById(filter + 'Filters');
                if (targetSection) {
                    targetSection.style.display = 'block';
                }
            }

            filterAndRenderProducts();
        });
    });

    // Setup filter options
    setupFilterOptions();
}

function setupFilterOptions() {
    const filterOptions = document.querySelectorAll('.filter-option');
    
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            const parent = option.closest('.filter-section');
            const siblings = parent.querySelectorAll('.filter-option');
            
            // Remove active class from siblings
            siblings.forEach(sibling => sibling.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');

            // Update filter
            if (option.dataset.type) {
                currentFilters.type = option.dataset.type;
            } else if (option.dataset.price) {
                currentFilters.price = option.dataset.price;
            } else if (option.dataset.region) {
                currentFilters.region = option.dataset.region;
            }

            filterAndRenderProducts();
        });
    });
}

function setupScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class to header
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe product cards
    const observeProducts = () => {
        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });
    };

    // Initial observation
    setTimeout(observeProducts, 100);
    
    // Re-observe when products are re-rendered
    const originalRenderProducts = renderProducts;
    renderProducts = function() {
        originalRenderProducts.apply(this, arguments);
        setTimeout(observeProducts, 100);
    };
}

async function updateLanguage() {
    // Use DeepL translation for real-time translation
    if (window.deepLTranslation && currentLanguage !== 'ja') {
        await window.deepLTranslation.translatePage(currentLanguage);
    }
    
    // Update placeholders using DeepL
    if (globalSearch && window.deepLTranslation && currentLanguage !== 'ja') {
        const placeholder = await window.deepLTranslation.translateText('お酒を検索...', currentLanguage);
        globalSearch.placeholder = placeholder;
    } else if (globalSearch) {
        globalSearch.placeholder = 'お酒を検索...';
    }

    // Update document title using DeepL
    if (window.deepLTranslation && currentLanguage !== 'ja') {
        const title = await window.deepLTranslation.translateText('益々酒造', currentLanguage);
        const subtitle = await window.deepLTranslation.translateText('プレミアム日本酒コレクション', currentLanguage);
        document.title = `${title} - ${subtitle}`;
    } else {
        document.title = '益々酒造 - プレミアム日本酒コレクション';
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Store language preference
    localStorage.setItem('selectedLanguage', currentLanguage);
    
    // Notify AI Chat system of language change
    window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: currentLanguage }
    }));
}

function filterAndRenderProducts() {
    filteredProducts = sakeData.filter(product => {
        // Search filter
        if (currentFilters.search) {
            const searchLower = currentFilters.search;
            const searchableText = [
                product.name[currentLanguage] || product.name.en,
                product.brewery[currentLanguage] || product.brewery.en,
                product.region[currentLanguage] || product.region.en,
                product.riceType[currentLanguage] || product.riceType.en
            ].join(' ').toLowerCase();
            
            if (!searchableText.includes(searchLower)) {
                return false;
            }
        }

        // Type filter
        if (currentFilters.type !== 'all') {
            const productType = (product.type.en || '').toLowerCase().replace(/\s+/g, '-');
            if (productType !== currentFilters.type) {
                return false;
            }
        }

        // Price filter
        if (currentFilters.price !== 'all') {
            const [min, max] = currentFilters.price.split('-').map(p => parseInt(p) || 0);
            if (max && (product.price < min || product.price > max)) {
                return false;
            } else if (!max && product.price < min) {
                return false;
            }
        }

        // Region filter
        if (currentFilters.region !== 'all') {
            const productRegion = (product.region.en || '').toLowerCase();
            const filterRegion = currentFilters.region.toLowerCase();
            
            if (filterRegion === 'other') {
                const mainRegions = ['hyogo', 'kyoto', 'niigata', 'yamagata'];
                if (mainRegions.some(region => productRegion.includes(region))) {
                    return false;
                }
            } else if (!productRegion.includes(filterRegion)) {
                return false;
            }
        }

        // Limited filter
        if (currentFilters.limited && !product.limited) {
            return false;
        }

        return true;
    });

    renderProducts();
}

async function renderProducts() {
    if (!productsGrid) return;
    
    if (filteredProducts.length === 0) {
        let noProductsTitle = 'No products found';
        let noProductsDesc = 'Try adjusting your filters or search terms.';
        
        if (window.deepLTranslation && currentLanguage !== 'ja') {
            noProductsTitle = await window.deepLTranslation.translateText('商品が見つかりません', currentLanguage);
            noProductsDesc = await window.deepLTranslation.translateText('フィルターや検索条件を調整してください。', currentLanguage);
        } else if (currentLanguage === 'ja') {
            noProductsTitle = '商品が見つかりません';
            noProductsDesc = 'フィルターや検索条件を調整してください。';
        }
        
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>${noProductsTitle}</h3>
                <p>${noProductsDesc}</p>
            </div>
        `;
        return;
    }

    // Render products with DeepL translations
    const productCards = await Promise.all(filteredProducts.map(async (product) => {
        const stockClass = product.inStock > 20 ? '' : product.inStock > 0 ? 'low' : 'out';
        
        // Translate labels and text
        let bottlesText = 'bottles';
        let outOfStockText = 'Out of Stock';
        let detailsText = 'もっと詳しく';
        let addToCartText = 'Add to Cart';
        let alcoholLabel = 'Alcohol';
        let ricePolishLabel = 'Rice Polish';
        let riceTypeLabel = 'Rice Type';
        let regionLabel = 'Region';
        
        if (window.deepLTranslation && currentLanguage !== 'ja') {
            [bottlesText, outOfStockText, detailsText, addToCartText, 
             alcoholLabel, ricePolishLabel, riceTypeLabel, regionLabel] = await Promise.all([
                window.deepLTranslation.translateText('本', currentLanguage),
                window.deepLTranslation.translateText('在庫切れ', currentLanguage),
                window.deepLTranslation.translateText('もっと詳しく', currentLanguage),
                window.deepLTranslation.translateText('カートに追加', currentLanguage),
                window.deepLTranslation.translateText('アルコール度数', currentLanguage),
                window.deepLTranslation.translateText('精米歩合', currentLanguage),
                window.deepLTranslation.translateText('使用米', currentLanguage),
                window.deepLTranslation.translateText('産地', currentLanguage)
            ]);
        } else if (currentLanguage === 'ja') {
            bottlesText = '本';
            outOfStockText = '在庫切れ';
            detailsText = 'もっと詳しく';
            addToCartText = 'カートに追加';
            alcoholLabel = 'アルコール度数';
            ricePolishLabel = '精米歩合';
            riceTypeLabel = '使用米';
            regionLabel = '産地';
        }
        
        const stockText = product.inStock > 0 ? `${product.inStock} ${bottlesText}` : outOfStockText;
        
        // Translate product data
        let translatedProduct = product;
        if (window.deepLTranslation && currentLanguage !== 'ja') {
            translatedProduct = await window.deepLTranslation.translateProduct(product, currentLanguage);
        }
        
        const productName = translatedProduct.name || product.name.ja;
        const productBrewery = translatedProduct.brewery || product.brewery.ja;
        const productType = translatedProduct.type || product.type.ja;
        const productDescription = translatedProduct.description || product.description.ja;
        const productRiceType = translatedProduct.riceType || product.riceType.ja;
        const productRegion = translatedProduct.region || product.region.ja;
        
        return `
            <div class="product-card ${product.limited ? 'limited' : ''}" data-id="${product.id}">
                <div class="product-image" onclick="window.location.href='product.html?id=${product.id}'">
                    <img src="${product.image}" alt="${productName}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-header">
                        <div class="product-left">
                            <h3 class="product-name ${currentLanguage === 'ja' ? 'japanese' : ''}">${productName}</h3>
                            <p class="product-brewery">${productBrewery}</p>
                            <span class="product-type">${productType}</span>
                        </div>
                        <div class="product-price">¥${product.sizes[0].price.toLocaleString()}</div>
                    </div>
                    
                    <p class="product-description">${productDescription}</p>
                    
                    <div class="product-details">
                        <div class="product-detail">
                            <div class="product-detail-label">${alcoholLabel}</div>
                            <div class="product-detail-value">${product.alcohol}%</div>
                        </div>
                        <div class="product-detail">
                            <div class="product-detail-label">${ricePolishLabel}</div>
                            <div class="product-detail-value">${product.ricePalish ? product.ricePalish + '%' : '-'}</div>
                        </div>
                        <div class="product-detail">
                            <div class="product-detail-label">${riceTypeLabel}</div>
                            <div class="product-detail-value">${productRiceType}</div>
                        </div>
                        <div class="product-detail">
                            <div class="product-detail-label">${regionLabel}</div>
                            <div class="product-detail-value">${productRegion}</div>
                        </div>
                    </div>

                    <div class="product-stock">
                        <span class="stock-indicator ${stockClass}"></span>
                        <span>${stockText}</span>
                    </div>

                    <div class="product-actions">
                        <button class="btn-secondary" onclick="window.location.href='product.html?id=${product.id}'">
                            ${detailsText}
                        </button>
                        <button class="btn-primary" onclick="addToCart(${product.id})" ${product.inStock === 0 ? 'disabled' : ''}>
                            ${addToCartText}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }));
    
    productsGrid.innerHTML = productCards.join('');
}

function openProductModal(product) {
    const trans = translations[currentLanguage];
    
    modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-image">
                🍶
            </div>
            <div class="modal-product-info">
                <h2 class="modal-product-name ${currentLanguage === 'ja' ? 'japanese' : ''}">${product.name[currentLanguage] || product.name.en}</h2>
                <p class="modal-product-brewery">${product.brewery[currentLanguage] || product.brewery.en}</p>
                <div class="modal-product-price">¥${product.price.toLocaleString()}</div>
                
                <div class="modal-product-description">
                    <p>${product.description[currentLanguage] || product.description.en}</p>
                </div>

                <div class="modal-product-details">
                    <h4>${trans.tastingNotes || 'Tasting Notes'}</h4>
                    <p>${product.tastingNotes[currentLanguage] || product.tastingNotes.en}</p>
                    
                    <h4>${trans.awards || 'Awards'}</h4>
                    <p>${product.awards[currentLanguage] || product.awards.en}</p>
                    
                    <div class="modal-specs">
                        <div class="spec">
                            <span class="spec-label">${trans.alcohol || 'Alcohol'}</span>
                            <span class="spec-value">${product.alcohol}%</span>
                        </div>
                        <div class="spec">
                            <span class="spec-label">${trans.ricePalish || 'Rice Polish'}</span>
                            <span class="spec-value">${product.ricePalish}%</span>
                        </div>
                        <div class="spec">
                            <span class="spec-label">${trans.riceType || 'Rice Type'}</span>
                            <span class="spec-value">${product.riceType[currentLanguage] || product.riceType.en}</span>
                        </div>
                        <div class="spec">
                            <span class="spec-label">${trans.region || 'Region'}</span>
                            <span class="spec-value">${product.region[currentLanguage] || product.region.en}</span>
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <button class="btn-primary" onclick="addToCart(${product.id}); productModal.classList.remove('active');" ${product.inStock === 0 ? 'disabled' : ''}>
                        ${trans.addToCart || 'Add to Cart'} - ¥${product.price.toLocaleString()}
                    </button>
                    <button class="btn-secondary" onclick="generateQR(${product.id})">
                        📱 Generate QR Code
                    </button>
                </div>
            </div>
        </div>
    `;
    
    productModal.classList.add('active');
}

function addToCart(productId) {
    const product = sakeData.find(p => p.id === productId);
    if (!product || product.inStock === 0) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.inStock) {
            existingItem.quantity++;
        } else {
            alert('Maximum stock reached for this item.');
            return;
        }
    } else {
        cart.push({
            id: productId,
            quantity: 1,
            product: product
        });
    }

    updateCartDisplay();
    
    // Show brief success feedback
    showNotification('Added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = Math.min(quantity, item.product.inStock);
        }
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toLocaleString();

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <div class="empty-cart-icon">🛒</div>
            </div>
        `;
    } else {
        cartContent.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">🍶</div>
                <div class="cart-item-info">
                    <h4>${item.product.name[currentLanguage] || item.product.name.en}</h4>
                    <p>¥${item.product.price.toLocaleString()}</p>
                    <div class="cart-item-controls">
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button onclick="removeFromCart(${item.id})" class="remove-btn">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(userMessage);

    // Clear input
    chatInput.value = '';

    // Simulate AI response
    setTimeout(() => {
        const botResponse = generateAIResponse(message);
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot-message';
        botMessage.innerHTML = `
            <div class="message-content">
                <p>${botResponse}</p>
            </div>
        `;
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Japanese language responses
    if (currentLanguage === 'ja') {
        if (lowerMessage.includes('おすすめ') || lowerMessage.includes('推奨') || lowerMessage.includes('選んで')) {
            const randomProduct = sakeData[Math.floor(Math.random() * sakeData.length)];
            return `${randomProduct.name.ja || randomProduct.name.en}をおすすめします。${randomProduct.brewery.ja || randomProduct.brewery.en}の${randomProduct.type.ja || randomProduct.type.en}で、${randomProduct.tastingNotes.ja || randomProduct.tastingNotes.en}という特徴があります。こだわりの逸品です！`;
        }
        
        if (lowerMessage.includes('値段') || lowerMessage.includes('価格') || lowerMessage.includes('いくら')) {
            return 'プレミアム日本酒コレクションは8,000円から30,000円の価格帯です。それぞれが職人の技と伝統を体現した逸品となっております。ご予算に合わせたおすすめもできますよ！';
        }
        
        if (lowerMessage.includes('大吟醸') || lowerMessage.includes('純米')) {
            return '素晴らしい選択です！大吟醸は精米歩合50%以下、純米は米・水・麹・酵母のみで造られる最高級の日本酒です。どちらも純粋で複雑な味わいをお楽しみいただけます。';
        }
        
        if (lowerMessage.includes('料理') || lowerMessage.includes('食事') || lowerMessage.includes('合う')) {
            return '日本酒は様々な料理と素晴らしく合います！純米系は焼き魚などの濃厚な料理に、大吟醸は刺身や軽い前菜に最適です。具体的なペアリングのご提案もできますよ！';
        }
        
        if (lowerMessage.includes('限定') || lowerMessage.includes('特別')) {
            const limitedProducts = sakeData.filter(p => p.limited);
            return `現在${limitedProducts.length}本の限定品をご用意しております！${limitedProducts[0]?.name.ja || limitedProducts[0]?.name.en}や${limitedProducts[1]?.name.ja || limitedProducts[1]?.name.en}などの希少な銘柄です。限定品は特別な醸造技術や季節の素材を使用しています。`;
        }
        
        if (lowerMessage.includes('ツアー') || lowerMessage.includes('見学')) {
            return '酒蔵見学ツアーは90分の体験プログラムです。創業300年の歴史ある蔵で、杜氏による解説とプレミアムテイスティング（5種）をお楽しみいただけます。10言語対応で海外のお客様にも安心です！';
        }
        
        return 'ありがとうございます！私は益々酒造専属のAI杜氏です。日本酒のこと、料理とのペアリング、醸造方法など何でもお聞きください。お客様に最適な日本酒をご提案いたします。';
    }
    
    // English responses
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
        const randomProduct = sakeData[Math.floor(Math.random() * sakeData.length)];
        return `I recommend trying "${randomProduct.name.en}" from ${randomProduct.brewery.en}. It's a ${randomProduct.type.en} with ${randomProduct.tastingNotes.en}. Perfect for connoisseurs!`;
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return 'Our premium sake collection ranges from ¥8,000 to ¥30,000. Each bottle represents exceptional craftsmanship and tradition. Would you like me to recommend something within a specific price range?';
    }
    
    if (lowerMessage.includes('daiginjo') || lowerMessage.includes('junmai')) {
        return 'Excellent choice! Daiginjo and Junmai are among the highest grades of sake. Daiginjo uses rice polished to at least 50%, while Junmai is made with only rice, water, yeast, and koji. Both offer exceptional purity and complexity.';
    }
    
    if (lowerMessage.includes('food') || lowerMessage.includes('pairing')) {
        return 'Sake pairs wonderfully with many foods! Junmai types complement rich dishes like grilled fish, while Daiginjo is perfect with delicate sashimi or light appetizers. Would you like specific pairing suggestions for any of our bottles?';
    }
    
    if (lowerMessage.includes('tour') || lowerMessage.includes('visit')) {
        return 'Our brewery tour is a 90-minute experience showcasing 300 years of sake-making tradition. Includes expert guidance from our master brewer and premium tasting of 5 varieties. Available in 10 languages for international guests!';
    }
    
    if (lowerMessage.includes('limited') || lowerMessage.includes('exclusive')) {
        const limitedProducts = sakeData.filter(p => p.limited);
        return `We have ${limitedProducts.length} limited edition bottles available! These include rare finds like "${limitedProducts[0]?.name.en}" and "${limitedProducts[1]?.name.en}". Limited editions often feature unique brewing techniques or seasonal ingredients.`;
    }
    
    return 'Thank you for your question! As your AI Sake Sommelier, I\'m here to help you discover the perfect sake. Feel free to ask about our collection, food pairings, brewing methods, or for personalized recommendations based on your preferences.';
}

function generateQR(productId) {
    const product = sakeData.find(p => p.id === productId);
    if (!product) return;

    // Simulate QR code generation
    alert(`QR Code generated for ${product.name.en}!\n\nThis QR code would contain:\n- Product details\n- Direct purchase link\n- Tasting notes\n- Brewery information\n\nScan to share or access on mobile devices.`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: var(--color-accent);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .cart-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        border-bottom: 1px solid var(--color-gray-200);
    }

    .cart-item-image {
        font-size: 32px;
        width: 48px;
        text-align: center;
    }

    .cart-item-info {
        flex: 1;
    }

    .cart-item-info h4 {
        margin: 0 0 4px 0;
        font-size: 16px;
        color: var(--color-primary);
    }

    .cart-item-info p {
        margin: 0 0 8px 0;
        color: var(--color-accent);
        font-weight: 600;
    }

    .cart-item-controls {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .cart-item-controls button {
        background: var(--color-gray-200);
        border: none;
        width: 28px;
        height: 28px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        transition: var(--transition-fast);
    }

    .cart-item-controls button:hover {
        background: var(--color-accent);
        color: white;
    }

    .cart-item-controls .remove-btn {
        background: #ef4444;
        color: white;
        margin-left: 8px;
    }

    .cart-item-controls .remove-btn:hover {
        background: #dc2626;
    }

    .modal-product {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 40px;
    }

    .modal-product-image {
        font-size: 200px;
        text-align: center;
        background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-200) 100%);
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 400px;
    }

    .modal-product-name {
        font-family: var(--font-heading);
        font-size: 32px;
        margin-bottom: 8px;
        color: var(--color-primary);
    }

    .modal-product-brewery {
        color: var(--color-gray-600);
        margin-bottom: 16px;
        font-size: 18px;
    }

    .modal-product-price {
        font-family: var(--font-heading);
        font-size: 36px;
        color: var(--color-accent);
        font-weight: 700;
        margin-bottom: 24px;
    }

    .modal-product-description {
        margin-bottom: 32px;
        line-height: 1.6;
        color: var(--color-gray-700);
    }

    .modal-product-details h4 {
        color: var(--color-primary);
        margin: 24px 0 12px 0;
        font-size: 18px;
    }

    .modal-specs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin: 24px 0;
        padding: 20px;
        background: var(--color-gray-50);
        border-radius: var(--border-radius);
    }

    .spec {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .spec-label {
        color: var(--color-gray-600);
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .spec-value {
        color: var(--color-primary);
        font-weight: 600;
    }

    .modal-actions {
        display: flex;
        gap: 16px;
        margin-top: 32px;
    }

    .modal-actions .btn-primary {
        flex: 1;
    }

    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 80px 20px;
        color: var(--color-gray-600);
    }

    .no-products h3 {
        font-size: 24px;
        margin-bottom: 16px;
        color: var(--color-primary);
    }

    @media (max-width: 768px) {
        .modal-product {
            grid-template-columns: 1fr;
            gap: 24px;
        }

        .modal-product-image {
            height: 200px;
            font-size: 120px;
        }

        .modal-specs {
            grid-template-columns: 1fr;
        }

        .modal-actions {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(notificationStyles);

// Media Player Functions
class MediaPlayerController {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
        this.audioData = this.initializeAudioData();
        this.videoData = this.initializeVideoData();
        this.init();
    }

    init() {
        this.setupAudioPlayer();
    }

    initializeAudioData() {
        return {
            'master-brewer-intro': {
                title: '杜氏からのご挨拶',
                duration: '2:30',
                description: '益々酒造の杜氏が、酒造りへの想いをお話しします。'
            },
            'brewing-philosophy': {
                title: '酒造りの哲学',
                duration: '3:45',
                description: '300年受け継がれてきた酒造りの哲学と、現代への継承について。'
            },
            'history-300years': {
                title: '300年の歴史物語',
                duration: '4:20',
                description: '1724年の創業から現在まで、益々酒造の歴史を辿ります。'
            },
            'sake-tasting-guide': {
                title: '日本酒テイスティングガイド',
                duration: '5:10',
                description: '日本酒の正しい味わい方と、テイスティングのポイント。'
            }
        };
    }

    initializeVideoData() {
        return {
            'brewery-tour': {
                title: '蔵内部ツアー',
                duration: '5:30',
                description: '益々酒造の蔵内部をご案内。醸造設備と職人の技をご覧ください。',
                // プレースホルダー動画URL（実際の実装では実際の動画ファイルを使用）
                url: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDE='
            },
            'brewing-process': {
                title: '醸造工程詳細',
                duration: '8:15',
                description: '日本酒造りの全工程を詳細に解説。米洗いから瓶詰めまで。',
                url: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDE='
            },
            'master-interview': {
                title: '杜氏インタビュー',
                duration: '6:45',
                description: '杜氏が語る、酒造りの極意と未来への展望。',
                url: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDE='
            }
        };
    }

    setupAudioPlayer() {
        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer) {
            this.updateAudioDisplay();
        }
    }

    updateAudioDisplay(audioId = null) {
        const currentAudioInfo = document.getElementById('currentAudioInfo');
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (audioId && this.audioData[audioId]) {
            const audioInfo = this.audioData[audioId];
            currentAudioInfo.innerHTML = `
                <div class="audio-title">${audioInfo.title}</div>
                <div class="audio-description">${audioInfo.description}</div>
            `;
            
            // Update duration display
            const totalTime = document.getElementById('totalTime');
            if (totalTime) {
                totalTime.textContent = audioInfo.duration;
            }
        } else {
            currentAudioInfo.innerHTML = `
                <div class="audio-title" data-translate="select_audio">音声ガイドを選択してください</div>
            `;
        }
    }

    playVideo(videoId) {
        const videoData = this.videoData[videoId];
        if (!videoData) {
            console.warn(`Video not found: ${videoId}`);
            return;
        }

        // Update modal content
        const videoModal = document.getElementById('videoModal');
        const videoModalTitle = document.getElementById('videoModalTitle');
        const videoPlayer = document.getElementById('videoPlayer');
        const videoDescription = document.getElementById('videoDescription');

        videoModalTitle.textContent = videoData.title;
        videoDescription.innerHTML = `<p>${videoData.description}</p>`;
        
        // For demo purposes, show a placeholder message
        videoPlayer.innerHTML = `
            <div style="
                width: 100%; 
                height: 300px; 
                background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                color: #666;
                font-size: 16px;
                text-align: center;
                flex-direction: column;
                gap: 16px;
            ">
                <div style="font-size: 48px;">🎬</div>
                <div>
                    <div style="font-weight: bold; margin-bottom: 8px;">${videoData.title}</div>
                    <div style="font-size: 14px; opacity: 0.8;">動画プレーヤー（デモ版）</div>
                    <div style="font-size: 14px; opacity: 0.8;">${videoData.description}</div>
                </div>
            </div>
        `;

        // Show modal
        videoModal.style.display = 'flex';
        
        // Track video play event
        if (window.masumasuAnalytics) {
            window.masumasuAnalytics.trackEvent('video_play', {
                videoId: videoId,
                videoTitle: videoData.title
            });
        }
    }

    closeVideoModal() {
        const videoModal = document.getElementById('videoModal');
        const videoPlayer = document.getElementById('videoPlayer');
        
        videoModal.style.display = 'none';
        
        // Stop any playing video
        videoPlayer.innerHTML = `
            <source src="" type="video/mp4">
            <p data-translate="video_not_supported">お使いのブラウザは動画再生に対応していません。</p>
        `;
    }

    playAudio(audioId) {
        const audioData = this.audioData[audioId];
        if (!audioData) {
            console.warn(`Audio not found: ${audioId}`);
            return;
        }

        // Stop current audio if playing
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }

        // Update display
        this.updateAudioDisplay(audioId);
        
        // For demo purposes, simulate audio playback
        this.simulateAudioPlayback(audioData);
        
        // Update all audio items to show which is playing
        document.querySelectorAll('.audio-item').forEach(item => {
            item.classList.remove('playing');
        });
        
        const clickedItem = document.querySelector(`[onclick="playAudio('${audioId}')"]`);
        if (clickedItem) {
            clickedItem.classList.add('playing');
        }

        // Track audio play event
        if (window.masumasuAnalytics) {
            window.masumasuAnalytics.trackEvent('audio_play', {
                audioId: audioId,
                audioTitle: audioData.title
            });
        }
    }

    simulateAudioPlayback(audioData) {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const progressBar = document.getElementById('progressBar');
        const currentTime = document.getElementById('currentTime');
        
        // Change button to pause
        playPauseBtn.textContent = '⏸️';
        this.isPlaying = true;
        
        // Simulate progress for demo
        let progress = 0;
        const duration = this.parseDuration(audioData.duration);
        
        const progressInterval = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(progressInterval);
                return;
            }
            
            progress += 1;
            const percentage = (progress / duration) * 100;
            
            if (progressBar) {
                progressBar.style.width = percentage + '%';
            }
            
            if (currentTime) {
                currentTime.textContent = this.formatTime(progress);
            }
            
            if (progress >= duration) {
                clearInterval(progressInterval);
                this.stopAudio();
            }
        }, 1000);
    }

    parseDuration(duration) {
        // Convert "2:30" to seconds
        const parts = duration.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    toggleAudio() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (this.isPlaying) {
            this.pauseAudio();
        } else {
            this.resumeAudio();
        }
    }

    pauseAudio() {
        this.isPlaying = false;
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = '▶️';
        }
    }

    resumeAudio() {
        this.isPlaying = true;
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = '⏸️';
        }
    }

    stopAudio() {
        this.isPlaying = false;
        this.currentAudio = null;
        
        const playPauseBtn = document.getElementById('playPauseBtn');
        const progressBar = document.getElementById('progressBar');
        const currentTime = document.getElementById('currentTime');
        
        if (playPauseBtn) playPauseBtn.textContent = '▶️';
        if (progressBar) progressBar.style.width = '0%';
        if (currentTime) currentTime.textContent = '0:00';
        
        // Remove playing class from all audio items
        document.querySelectorAll('.audio-item').forEach(item => {
            item.classList.remove('playing');
        });
        
        // Reset audio display
        this.updateAudioDisplay();
    }
}

// Initialize media player
let mediaPlayerController;

// Global functions for onclick handlers
function playVideo(videoId) {
    if (mediaPlayerController) {
        mediaPlayerController.playVideo(videoId);
    }
}

function closeVideoModal() {
    if (mediaPlayerController) {
        mediaPlayerController.closeVideoModal();
    }
}

function playAudio(audioId) {
    if (mediaPlayerController) {
        mediaPlayerController.playAudio(audioId);
    }
}

function toggleAudio() {
    if (mediaPlayerController) {
        mediaPlayerController.toggleAudio();
    }
}

// Initialize media player when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after a short delay to ensure other components are ready
    setTimeout(() => {
        mediaPlayerController = new MediaPlayerController();
    }, 100);
});

// Console welcome message
console.log('%c🍶 益々酒造', 'color: #D4A574; font-size: 24px; font-weight: bold;');
console.log('%cVan Cleef & Arpels Inspired Design', 'color: #1A1A1A; font-size: 14px;');
console.log('Application initialized successfully! ✨');