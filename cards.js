import { Arsenal } from './arsenal.js';

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
        this.arsenal = new Arsenal();
    }

    getCard() {
        const rarityCards = Object.entries(this.cards).filter(([card, rarity]) => this.probability[rarity] > 0);
        const totalProbability = rarityCards.reduce((acc, [card, rarity]) => acc + this.probability[rarity], 0);
        let random = Math.random() * totalProbability;
        for (const [card, rarity] of rarityCards) {
            random -= this.probability[rarity];
            if (random <= 0) {
                return card;
            }
        }
        return null;
    }

    useCard(card) {
        if (card === "Arsenal") {
            this.arsenal.incrementArm();
        } else if (card === "Damage") {
            this.arsenal.incrementDamage();
        } else if (card === "Explosive") {
            const normalArm = this.arsenal.arms.find(arm => arm.type === 'normal');
            if (normalArm) {
                normalArm.setType('explosive');
            }
        }
    }
}

export default Cards;