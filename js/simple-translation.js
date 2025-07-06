/**
 * 簡易翻訳システム（GitHub Pages用）
 * サーバー不要の基本的な翻訳機能
 */

// 基本的な翻訳データ
const basicTranslations = {
    'ja': {
        'お酒を検索...': 'お酒を検索...',
        'カートに追加': 'カートに追加',
        '在庫切れ': '在庫切れ',
        'もっと詳しく': 'もっと詳しく',
        'アルコール度数': 'アルコール度数',
        '精米歩合': '精米歩合',
        '使用米': '使用米',
        '産地': '産地',
        '本': '本'
    },
    'en': {
        'お酒を検索...': 'Search sake...',
        'カートに追加': 'Add to Cart',
        '在庫切れ': 'Out of Stock',
        'もっと詳しく': 'Learn More',
        'アルコール度数': 'Alcohol Content',
        '精米歩合': 'Rice Polish',
        '使用米': 'Rice Type',
        '産地': 'Region',
        '本': 'bottles'
    },
    'fr': {
        'お酒を検索...': 'Rechercher saké...',
        'カートに追加': 'Ajouter au panier',
        '在庫切れ': 'Rupture de stock',
        'もっと詳しく': 'En savoir plus',
        'アルコール度数': 'Teneur en alcool',
        '精米歩合': 'Polissage du riz',
        '使用米': 'Type de riz',
        '産地': 'Région',
        '本': 'bouteilles'
    },
    'zh': {
        'お酒を検索...': '搜索清酒...',
        'カートに追加': '添加到购物车',
        '在庫切れ': '库存不足',
        'もっと詳しく': '了解更多',
        'アルコール度数': '酒精度',
        '精米歩合': '精米步合',
        '使用米': '使用米',
        '産地': '产地',
        '本': '瓶'
    }
};

// 商品データの翻訳マッピング
const productTranslations = {
    'en': {
        '純米吟醸「益々」': 'Junmai Ginjo "Masumasu"',
        '本醸造「益々」': 'Honjozo "Masumasu"',
        '純米酒「益々スパークリング」': 'Junmai "Masumasu Sparkling"',
        '大吟醸「益々ヴィンテージ」': 'Daiginjo "Masumasu Vintage"',
        '梅酒「益々プラム」': 'Plum Wine "Masumasu Plum"',
        '益々酒造': 'Masumasu Brewery',
        '純米吟醸': 'Junmai Ginjo',
        '本醸造': 'Honjozo',
        '純米酒': 'Junmai',
        '大吟醸': 'Daiginjo',
        '梅酒': 'Plum Wine',
        '新潟県': 'Niigata Prefecture'
    },
    'fr': {
        '純米吟醸「益々」': 'Junmai Ginjo "Masumasu"',
        '本醸造「益々」': 'Honjozo "Masumasu"',
        '純米酒「益々スパークリング」': 'Junmai "Masumasu Pétillant"',
        '大吟醸「益々ヴィンテージ」': 'Daiginjo "Masumasu Millésime"',
        '梅酒「益々プラム」': 'Vin de Prune "Masumasu"',
        '益々酒造': 'Brasserie Masumasu',
        '純米吟醸': 'Junmai Ginjo',
        '本醸造': 'Honjozo',
        '純米酒': 'Junmai',
        '大吟醸': 'Daiginjo',
        '梅酒': 'Vin de Prune',
        '新潟県': 'Préfecture de Niigata'
    },
    'zh': {
        '純米吟醸「益々」': '纯米吟酿「益々」',
        '本醸造「益々」': '本酿造「益々」',
        '純米酒「益々スパークリング」': '纯米酒「益々气泡」',
        '大吟醸「益々ヴィンテージ」': '大吟酿「益々年份」',
        '梅酒「益々プラム」': '梅酒「益々梅子」',
        '益々酒造': '益々酒造',
        '純米吟醸': '纯米吟酿',
        '本醸造': '本酿造',
        '純米酒': '纯米酒',
        '大吟醸': '大吟酿',
        '梅酒': '梅酒',
        '新潟県': '新潟县'
    }
};

// 簡易翻訳クラス
class SimpleTranslation {
    constructor() {
        this.currentLanguage = 'ja';
        this.translations = basicTranslations;
        this.productTranslations = productTranslations;
    }

    translate(text, targetLang) {
        if (targetLang === 'ja') return text;
        
        // 基本翻訳をチェック
        if (this.translations[targetLang] && this.translations[targetLang][text]) {
            return this.translations[targetLang][text];
        }
        
        // 商品翻訳をチェック
        if (this.productTranslations[targetLang] && this.productTranslations[targetLang][text]) {
            return this.productTranslations[targetLang][text];
        }
        
        // 翻訳が見つからない場合は元のテキストを返す
        return text;
    }

    translateElement(element, targetLang) {
        const originalText = element.getAttribute('data-original') || element.textContent;
        element.setAttribute('data-original', originalText);
        
        const translatedText = this.translate(originalText, targetLang);
        element.textContent = translatedText;
    }

    translatePage(targetLang) {
        this.currentLanguage = targetLang;
        
        // data-translate属性を持つ要素を翻訳
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        elementsToTranslate.forEach(element => {
            this.translateElement(element, targetLang);
        });
        
        // 商品名を翻訳
        const productNames = document.querySelectorAll('.product-name');
        productNames.forEach(element => {
            this.translateElement(element, targetLang);
        });
        
        // 商品タイプを翻訳
        const productTypes = document.querySelectorAll('.product-type');
        productTypes.forEach(element => {
            this.translateElement(element, targetLang);
        });
        
        // ブルワリー名を翻訳
        const breweryNames = document.querySelectorAll('.product-brewery');
        breweryNames.forEach(element => {
            this.translateElement(element, targetLang);
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// グローバルに利用可能にする
window.simpleTranslation = new SimpleTranslation();

// GitHub Pagesでの動作を通知
if (window.location.hostname.includes('github.io')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            window.simpleTranslation.showNotification('📘 GitHub Pages版 - 基本翻訳機能のみ利用可能');
        }, 2000);
    });
}

// CSS追加
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;
document.head.appendChild(style);