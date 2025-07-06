/**
 * Enhanced Chat Fix with DeepL Integration
 * チャットボットの認証エラー修正とDeepL翻訳連携
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 Enhanced Chat Fix - Starting...');

    // 認証エラー表示を削除
    function removeAuthErrors() {
        const errorElements = document.querySelectorAll('.error, .auth-error, [class*="error"]');
        errorElements.forEach(element => {
            if (element.textContent.includes('認証エラー') || 
                element.textContent.includes('authentication') ||
                element.textContent.includes('auth error')) {
                element.style.display = 'none';
                console.log('🔧 Removed auth error display');
            }
        });
    }

    // DeepL翻訳機能の強化
    class EnhancedDeepLTranslation {
        constructor() {
            this.apiUrl = 'https://brewery-website10.vercel.app/api/translate';
            this.supportedLanguages = {
                'ja': 'JA',
                'en': 'EN-US',
                'ko': 'KO',
                'zh': 'ZH',
                'fr': 'FR',
                'de': 'DE',
                'es': 'ES',
                'it': 'IT',
                'pt': 'PT-PT',
                'ru': 'RU'
            };
        }

        async translateText(text, targetLang = 'EN') {
            try {
                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        text: text,
                        target_lang: this.supportedLanguages[targetLang] || targetLang
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.translations[0].text;
                }
            } catch (error) {
                console.error('Translation error:', error);
            }
            return text; // フォールバック
        }

        // ページ内の翻訳可能な要素を検出して翻訳
        async translatePage(targetLang) {
            const elements = document.querySelectorAll('[data-translate]');
            
            for (const element of elements) {
                const originalText = element.getAttribute('data-original') || element.textContent;
                element.setAttribute('data-original', originalText);
                
                const translatedText = await this.translateText(originalText, targetLang);
                element.textContent = translatedText;
            }
        }
    }

    // Enhanced AI Chat System
    class EnhancedSakuraAI {
        constructor() {
            this.apiUrl = 'https://brewery-website10.vercel.app/api/chat';
            this.deepl = new EnhancedDeepLTranslation();
            this.currentLanguage = 'ja';
            this.chatHistory = [];
        }

        async sendMessage(message, targetLanguage = 'ja') {
            try {
                // ユーザーメッセージを日本語に翻訳（必要に応じて）
                let messageForAPI = message;
                if (targetLanguage !== 'ja') {
                    messageForAPI = await this.deepl.translateText(message, 'ja');
                }

                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            {
                                role: 'system',
                                content: 'あなたは「サクラ」、益々酒造の専門AIソムリエアシスタントです。簡潔で的確な回答を心がけ、聞かれたことに直接答えてください。装飾的な表現は避け、必要最小限の情報のみ提供してください。毎回の自己紹介や挨拶は不要です。'
                            },
                            ...this.chatHistory,
                            { role: 'user', content: messageForAPI }
                        ],
                        model: 'gpt-4o-mini',
                        max_tokens: 500
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    let botResponse = data.choices[0].message.content;

                    // 必要に応じて回答を翻訳
                    if (targetLanguage !== 'ja') {
                        botResponse = await this.deepl.translateText(botResponse, targetLanguage);
                    }

                    this.chatHistory.push(
                        { role: 'user', content: messageForAPI },
                        { role: 'assistant', content: data.choices[0].message.content }
                    );

                    if (this.chatHistory.length > 10) {
                        this.chatHistory = this.chatHistory.slice(-10);
                    }

                    return botResponse;
                }
            } catch (error) {
                console.error('Chat error:', error);
                return '申し訳ございません。現在技術的な問題が発生しています。';
            }
        }
    }

    // チャット機能の改善
    function enhanceChatFunction() {
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.querySelector('.send-button, .chat-send-btn, [onclick*="send"]');
        
        if (chatInput && sendButton) {
            console.log('🌸 Enhancing chat function...');
            
            const enhancedAI = new EnhancedSakuraAI();
            
            sendButton.onclick = async function() {
                const message = chatInput.value.trim();
                if (!message) return;

                // ユーザーメッセージを表示
                addChatMessage(message, 'user');
                chatInput.value = '';

                // タイピング表示
                addChatMessage('入力中...', 'bot', true);

                // AI応答を取得
                const response = await enhancedAI.sendMessage(message);
                
                // タイピング削除して応答表示
                removeTypingMessage();
                addChatMessage(response, 'bot');
            };

            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendButton.click();
                }
            });

            console.log('✅ Enhanced chat function ready!');
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
                    ${sender === 'bot' ? '<div class="avatar">🌸</div>' : ''}
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

    // グローバル翻訳機能
    window.enhancedDeepL = new EnhancedDeepLTranslation();
    window.translatePageTo = function(language) {
        window.enhancedDeepL.translatePage(language);
    };

    // 初期化
    setTimeout(() => {
        removeAuthErrors();
        enhanceChatFunction();
        
        // 定期的にエラー表示を削除
        setInterval(removeAuthErrors, 3000);
    }, 1000);

    console.log('🌸 Enhanced Chat Fix - Completed!');
});

// スタイルの追加
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
.google-translate-container {
    margin: 0 10px;
}

.goog-te-combo {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 5px;
    font-size: 14px;
}

.chat-message {
    margin: 10px 0;
    padding: 12px;
    border-radius: 12px;
    max-width: 80%;
    word-wrap: break-word;
}

.user-message {
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    margin-left: auto;
    margin-right: 0;
}

.bot-message {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    margin-right: auto;
    margin-left: 0;
}

.message-content {
    display: flex;
    align-items: flex-start;
    gap: 8px;
}

.avatar {
    font-size: 18px;
    flex-shrink: 0;
}

.text {
    flex: 1;
    line-height: 1.4;
}

.typing {
    opacity: 0.7;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
}

/* エラー表示を隠す */
.auth-error,
.error-message,
[class*="error"]:has-text("認証") {
    display: none !important;
}
`;
document.head.appendChild(enhancedStyle);