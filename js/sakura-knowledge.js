/**
 * サクラAIの専門知識データベース
 * 新しい知識はここに追加してください
 */

const SAKURA_KNOWLEDGE = {
    // 基本情報
    brewery: {
        name: "益々酒造",
        founded: "1724年",
        location: "新潟県清流町",
        employees: 145,
        master_brewers: 12
    },

    // 商品情報
    products: {
        junmai_ginjo: {
            name: "純米吟醸「益々」",
            rice: "五百万石",
            polish_ratio: "50%",
            alcohol: "16.0%",
            characteristics: "メロンやリンゴの香り、軽快でキレの良い後味"
        },
        honjozo: {
            name: "本醸造「益々」", 
            rice: "こしいぶき",
            polish_ratio: "65%",
            alcohol: "15.0%",
            characteristics: "スッキリとした辛口、抜群のキレ"
        }
        // 他の商品も追加可能
    },

    // よくある質問
    faq: {
        "日本酒の保存方法": "冷暗所で保存し、開栓後は冷蔵庫で1週間以内に飲み切ってください。",
        "おすすめの飲み方": "純米吟醸は8-12度、本醸造は6-10度が最適です。",
        "料理との相性": "純米吟醸は刺身や寿司、本醸造は焼き魚や天ぷらに合います。"
    },

    // 専門用語解説
    terms: {
        "精米歩合": "玄米を削って残った部分の割合。数字が小さいほど贅沢な酒。",
        "杜氏": "酒造りの最高責任者。技術と経験を持つ職人。",
        "麹": "米に麹菌を繁殖させたもの。日本酒造りに不可欠。"
    },

    // カスタム知識（ここに新しい知識を追加）
    custom: {
        // 例: 季節限定商品、イベント情報、特別な製法など
        seasonal: "春の限定酒「桜咲く」は4月のみの販売です。",
        events: "毎月第2土曜日に蔵見学ツアーを開催しています。",
        special_process: "古酒は5年以上熟成させた希少な日本酒です。"
    }
};

// 知識検索関数
function searchKnowledge(query) {
    const results = [];
    const searchText = query.toLowerCase();
    
    // FAQから検索
    for (const [question, answer] of Object.entries(SAKURA_KNOWLEDGE.faq)) {
        if (question.includes(searchText) || searchText.includes(question)) {
            results.push({ type: 'FAQ', question, answer });
        }
    }
    
    // 専門用語から検索
    for (const [term, definition] of Object.entries(SAKURA_KNOWLEDGE.terms)) {
        if (term.includes(searchText) || searchText.includes(term)) {
            results.push({ type: '用語', term, definition });
        }
    }
    
    return results;
}

// グローバルに公開
window.SAKURA_KNOWLEDGE = SAKURA_KNOWLEDGE;
window.searchKnowledge = searchKnowledge;