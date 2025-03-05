import { Arsenal, Arm } from './arsenal.js';
import Cards from './cards.js';

let round = 1;
let value = 10;
const arsenal = new Arsenal();
const cards = new Cards();
const arsenalButton = document.querySelector('.arsenal-button');

function updateInfoArea() {
    document.querySelector('.info-area').textContent = `Round: ${round}, Value: ${value}`;
}

updateInfoArea();

arsenalButton.onclick = function() {
    console.log('arsenal');
    const arsenalValue = arsenal.value();
    document.querySelector('.display-area').textContent = arsenalValue;
    if (arsenalValue >= value) {
        round += 1;
        value = nextRound(arsenalValue, value);
        showCards();
    } else {
        round = 1;
        value = 10;
        arsenal.arms = [new Arm()];
        updateGrid();
    }
    updateInfoArea();
};

function updateGrid() {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';
    for (let i = 0; i < arsenal.arms.length; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        if (arsenal.arms[i].type === 'explosive') {
            square.style.backgroundColor = '#b22222';
        }
        gridContainer.appendChild(square);
    }
}

updateGrid();

function showCards() {
    document.body.classList.add('blur');
    const cardContainer = document.querySelector('.card-container');
    cardContainer.style.display = 'flex';
    arsenalButton.disabled = true;

    const selectedCards = [cards.getCard(), cards.getCard(), cards.getCard()];

    cardContainer.querySelectorAll('.card').forEach((card, index) => {
        card.classList.remove('explosive');
        const selectedCard = selectedCards[index];
        card.textContent = selectedCard;
        if (selectedCard === 'Explosive') {
            card.classList.add('explosive');
        }
        card.onclick = function() {
            console.log(`Card ${card.dataset.card} has been selected`);
            if (selectedCard === 'Arsenal') {
                arsenal.incrementArm();
                updateGrid();
            } else if (selectedCard === 'Damage') {
                arsenal.incrementDamage();
            } else if (selectedCard === 'Explosive') {
                const normalArm = arsenal.arms.find(arm => arm.type === 'normal');
                if (normalArm) {
                    normalArm.setType('explosive');
                }
                updateGrid();
            }
            document.body.classList.remove('blur');
            cardContainer.style.display = 'none';
            arsenalButton.disabled = false;
        };
    });
}

function nextRound(arsenalValue, value) {
    const diff = arsenalValue -value;
    let increment = Math.ceil((10 + Math.pow(round, 3) / 1000 + Math.log10(diff + 1) * 10) / 10) * 10;
    return value + increment;
}

showCards();