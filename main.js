import { Arsenal, Arm } from './arsenal.js';

let round = 1;
let value = 10;
const arsenal = new Arsenal();
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

    const randomCardIndex = Math.floor(Math.random() * 3);
    const randomDamageCardIndex = (randomCardIndex + 1) % 3;

    cardContainer.querySelectorAll('.card').forEach((card, index) => {
        card.classList.remove('explosive');
        if (index === randomCardIndex) {
            card.textContent = 'Arsenal + 1';
        } else if (index === randomDamageCardIndex) {
            card.textContent = 'Damage + 10';
        } else {
            card.textContent = 'Explosive';
            card.classList.add('explosive');
        }
        card.onclick = function() {
            console.log(`Card ${card.dataset.card} has been selected`);
            if (index === randomCardIndex) {
                arsenal.incrementArm();
                updateGrid();
            } else if (index === randomDamageCardIndex) {
                arsenal.incrementDamage();
            } else {
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
    let increment = Math.ceil((10 + round * (diff / round)) / 10) * 10;
    return value + increment;
}