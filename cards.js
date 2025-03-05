class Cards {
    constructor() {
        this.cards = {
            "Arsenal": "Common",
            "Damage": "Common",
            "Explosive": "Common"
        };
        this.probability = {
            "Common": 1.0,
            "Uncommon": 0.0,
            "Rare": 0.0,
            "Legendary": 0.0
        };
    }

    getCard() {
        const totalProbability = Object.values(this.probability).reduce((acc, prob) => acc + prob, 0);
        let random = Math.random() * totalProbability;
        for (const [card, rarity] of Object.entries(this.cards)) {
            random -= this.probability[rarity];
            if (random <= 0) {
                return card;
            }
        }
        return null;
    }
}

export default Cards;