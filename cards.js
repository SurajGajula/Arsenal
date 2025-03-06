import { Arsenal } from './arsenal.js';

class Cards {
    constructor() {
        this.cards = {
            "Arsenal": "Common",
            "Damage": "Common",
            "Explosive": "Common",
            "Surpressor": "Uncommon"
        };
        this.probability = {
            "Common": 10,
            "Uncommon": 0,
            "Rare": 0,
            "Legendary": 0
        };
        this.arsenal = new Arsenal();
    }

    getCard() {
        const totalRarityProbability = Object.values(this.probability).reduce((acc, prob) => acc + prob, 0);
        let randomRarity = Math.random() * totalRarityProbability;
        let selectedRarity = null;

        for (const [rarity, prob] of Object.entries(this.probability)) {
            randomRarity -= prob;
            if (randomRarity <= 0) {
                selectedRarity = rarity;
                break;
            }
        }

        const cardsOfSelectedRarity = Object.entries(this.cards).filter(([card, rarity]) => rarity === selectedRarity);
        const totalCards = cardsOfSelectedRarity.length;
        const randomCardIndex = Math.floor(Math.random() * totalCards);

        return cardsOfSelectedRarity[randomCardIndex][0];
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
        } else if (card === "Surpressor") {
            const normalArm = this.arsenal.arms.find(arm => arm.type === 'normal');
            if (normalArm) {
                normalArm.setType('surpressor');
            }
        }
    }
    addCard(card) {
        this.probability[this.cards[card]] += 1;
    }
    reset() {
        this.cards = {
            "Arsenal": "Common",
            "Damage": "Common",
            "Explosive": "Common",
            "Surpressor": "Rare"
        };
        this.probability = {
            "Common": 10,
            "Uncommon": 0,
            "Rare": 0,
            "Legendary": 0
        };
        this.arsenal.reset();
    }
}

export default Cards;