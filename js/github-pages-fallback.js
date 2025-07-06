/**
 * GitHub Pages Fallback for Server-side Features
 * Provides basic functionality when server APIs are not available
 */

// Check if we're running on GitHub Pages
// フォールバックを無効化 - GitHub PagesでもVercel APIを使用
const isGitHubPages = false; // window.location.hostname.includes('github.io');

// Fallback translation data for GitHub Pages
const fallbackTranslations = {
    'ja': {
        searchPlaceholder: 'お酒を検索...',
        addToCart: 'カートに追加',
        outOfStock: '在庫切れ',
        bottles: '本',
        alcohol: 'アルコール度数',
        ricePalish: '精米歩合',
        riceType: '使用米',
        region: '産地',
        tastingNotes: 'テイスティングノート',
        servingTemp: '提供温度',
        pairing: '料理との相性'
    },
    'en': {
        searchPlaceholder: 'Search sake...',
        addToCart: 'Add to Cart',
        outOfStock: 'Out of Stock',
        bottles: 'bottles',
        alcohol: 'Alcohol',
        ricePalish: 'Rice Polish',
        riceType: 'Rice Type',
        region: 'Region',
        tastingNotes: 'Tasting Notes',
        servingTemp: 'Serving Temperature',
        pairing: 'Food Pairing'
    },
    'fr': {
        searchPlaceholder: 'Rechercher saké...',
        addToCart: 'Ajouter au panier',
        outOfStock: 'Rupture de stock',
        bottles: 'bouteilles',
        alcohol: 'Alcool',
        ricePalish: 'Polissage du riz',
        riceType: 'Type de riz',
        region: 'Région',
        tastingNotes: 'Notes de dégustation',
        servingTemp: 'Température de service',
        pairing: 'Accord mets'
    },
    'zh': {
        searchPlaceholder: '搜索清酒...',
        addToCart: '添加到购物车',
        outOfStock: '库存不足',
        bottles: '瓶',
        alcohol: '酒精度',
        ricePalish: '精米步合',
        riceType: '使用米',
        region: '产地',
        tastingNotes: '品鉴笔记',
        servingTemp: '饮用温度',
        pairing: '食物搭配'
    }
};

// GitHub Pages fallback for DeepL translation
class GitHubPagesFallback {
    constructor() {
        this.isAvailable = !isGitHubPages;
        this.translations = fallbackTranslations;
    }

    async translateText(text, targetLang, sourceLang = 'ja') {
        // If server is available, try to use DeepL
        if (this.isAvailable && window.deepLTranslation) {
            try {
                return await window.deepLTranslation.translateText(text, targetLang, sourceLang);
            } catch (error) {
                console.warn('DeepL API not available, using fallback');
            }
        }

        // Use predefined translations as fallback
        const translations = this.translations[targetLang];
        if (translations && translations[text]) {
            return translations[text];
        }

        // Return original text if no translation available
        return text;
    }

    async translateProduct(product, targetLang) {
        if (targetLang === 'ja' || !product) {
            return product;
        }

        // Use existing multilingual data if available
        const translatedProduct = { ...product };
        
        const fieldsToTranslate = [
            'name', 'brewery', 'type', 'riceType', 'description', 
            'tastingNotes', 'servingTemp', 'pairing', 'labelDescription', 
            'yeast', 'region'
        ];

        for (const field of fieldsToTranslate) {
            if (product[field] && typeof product[field] === 'object') {
                // Use existing translation if available
                translatedProduct[field] = product[field][targetLang] || product[field].en || product[field].ja;
            }
        }

        return translatedProduct;
    }

    async translatePage(targetLang) {
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        
        for (const element of elementsToTranslate) {
            const key = element.getAttribute('data-translate');
            const originalText = element.getAttribute('data-original') || element.textContent;
            element.setAttribute('data-original', originalText);
            
            const translation = await this.translateText(originalText, targetLang);
            element.textContent = translation;
        }
    }

    getSupportedLanguages() {
        return {
            'ja': '日本語',
            'en': 'English',
            'fr': 'Français',
            'zh': '中文'
        };
    }

    showNotification(message) {
        // Simple notification for GitHub Pages
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize fallback system
window.githubPagesFallback = new GitHubPagesFallback();

// Override DeepL translation if on GitHub Pages
if (isGitHubPages) {
    // GitHub PagesでもVercel APIを使用するため、オーバーライドしない
    // window.deepLTranslation = window.githubPagesFallback;
    
    console.log('✅ Running on GitHub Pages with full API functionality');
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
`;
document.head.appendChild(style);