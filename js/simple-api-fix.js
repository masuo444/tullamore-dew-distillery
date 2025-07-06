/**
 * 簡単なAPI修正スクリプト
 * メインサイトでAPIが動作しない場合の緊急修正
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Simple API Fix - Starting...');

    // チャット機能の修正
    function fixChatFunction() {
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.querySelector('.chat-send-btn, .send-button, [onclick*="sendMessage"]');
        
        if (chatInput && sendButton) {
            console.log('✅ Chat elements found - Fixing...');
            
            // 新しい送信機能
            async function sendChatMessage() {
                const message = chatInput.value.trim();
                if (!message) return;
                
                // ユーザーメッセージを表示
                addChatMessage(message, 'user');
                chatInput.value = '';
                
                // タイピング表示
                addChatMessage('入力中...', 'bot', true);
                
                try {
                    const response = await fetch('https://brewery-website10.vercel.app/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            messages: [
                                {
                                    role: 'system',
                                    content: 'あなたは「サクラ」、益々酒造の専門AIソムリエアシスタントです。簡潔で的確な回答を心がけ、聞かれたことに直接答えてください。毎回の自己紹介や挨拶は不要です。'
                                },
                                { role: 'user', content: message }
                            ],
                            model: 'gpt-4o-mini',
                            max_tokens: 500
                        })
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        // タイピング削除
                        removeTypingMessage();
                        // ボットの回答を表示
                        addChatMessage(data.choices[0].message.content, 'bot');
                    } else {
                        removeTypingMessage();
                        addChatMessage('申し訳ございません。現在技術的な問題が発生しています。', 'bot');
                    }
                } catch (error) {
                    console.error('Chat Error:', error);
                    removeTypingMessage();
                    addChatMessage('接続エラーが発生しました。少し後でもう一度お試しください。', 'bot');
                }
            }
            
            // メッセージ表示関数
            function addChatMessage(text, sender, isTyping = false) {
                const messagesContainer = document.getElementById('chatMessages') || 
                                        document.querySelector('.chat-messages') ||
                                        document.querySelector('.messages-container');
                
                if (messagesContainer) {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = `chat-message ${sender}-message ${isTyping ? 'typing' : ''}`;
                    messageDiv.innerHTML = `
                        <div class="message-content">
                            ${sender === 'user' ? '' : '<div class="avatar">🌸</div>'}
                            <div class="text">${text}</div>
                        </div>
                    `;
                    messagesContainer.appendChild(messageDiv);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
            }
            
            function removeTypingMessage() {
                const typingMsg = document.querySelector('.chat-message.typing');
                if (typingMsg) typingMsg.remove();
            }
            
            // イベントリスナー設定
            sendButton.onclick = sendChatMessage;
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendChatMessage();
                }
            });
            
            console.log('✅ Chat function fixed!');
        }
    }
    
    // 翻訳機能の修正
    function fixTranslationFunction() {
        // Google Translate要素があるか確認
        const googleTranslateElement = document.getElementById('google_translate_element');
        
        if (googleTranslateElement) {
            console.log('✅ Google Translate found - Adding DeepL backup...');
            
            // DeepL翻訳のバックアップ機能
            window.translateWithDeepL = async function(text, targetLang = 'EN') {
                try {
                    const response = await fetch('https://brewery-website10.vercel.app/api/translate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text, target_lang: targetLang })
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        return data.translations[0].text;
                    }
                } catch (error) {
                    console.error('Translation Error:', error);
                }
                return text; // フォールバック
            };
            
            console.log('✅ Translation function added!');
        }
    }
    
    // すべての修正を実行
    setTimeout(() => {
        fixChatFunction();
        fixTranslationFunction();
    }, 1000);
    
    console.log('🔧 Simple API Fix - Completed!');
});

// CSSスタイルの追加
const style = document.createElement('style');
style.textContent = `
.chat-message { margin: 10px 0; padding: 10px; border-radius: 10px; }
.user-message { background: #007bff; color: white; margin-left: 20%; }
.bot-message { background: #f1f3f4; margin-right: 20%; }
.message-content { display: flex; align-items: flex-start; }
.avatar { margin-right: 8px; font-size: 18px; }
.text { flex: 1; }
.typing { opacity: 0.7; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
`;
document.head.appendChild(style);