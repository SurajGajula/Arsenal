import Cards from './cards.js';

let round = 1;
let value = 10;
const cards = new Cards();
const arsenalButton = document.querySelector('.arsenal-button');
const refreshButton = document.querySelector('.refresh-button');

function updateInfoArea() {
    document.querySelector('.info-area').textContent = `Round: ${round}, Value: ${value}`;
}

updateInfoArea();

function updateRefreshButton() {
    refreshButton.style.display = document.body.classList.contains('blur') ? 'block' : 'none';
    refreshButton.disabled = cards.arsenal.refresh <= 0;
}

refreshButton.onclick = function() {
    if (cards.arsenal.refresh > 0) {
        cards.arsenal.refresh -= 1;
        showCards();
        updateRefreshButton();
    }
};

arsenalButton.onclick = function() {
    const arsenalValue = cards.arsenal.value();
    document.querySelector('.display-area').textContent = arsenalValue;
    if (arsenalValue >= value) {
        round += 1;
        value = nextRound(arsenalValue, value);
        if (round % 25 === 0) {
            cards.arsenal.refresh += 1;
            cards.addCard('Surpressor', 'Uncommon');
        }
        showCards();
    } else {
        round = 1;
        value = 10;
        cards.arsenal.reset();
        updateGrid();
        showCards();
    }
    updateInfoArea();
    updateRefreshButton();
};

function updateGrid() {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';
    for (let i = 0; i < cards.arsenal.arms.length; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        if (cards.arsenal.arms[i].type === 'explosive') {
            square.style.background = 'linear-gradient(145deg, #8b0000, #b22222)';
            console.log('Explosive arm detected, gradient applied:', square.style.background);
        }
        const damageText = document.createElement('span');
        damageText.textContent = cards.arsenal.arms[i].value();
        square.appendChild(damageText);
        gridContainer.appendChild(square);
    }
}

updateGrid();

function showCards() {
    document.body.classList.add('blur');
    const cardContainer = document.querySelector('.card-container');
    cardContainer.style.display = 'flex';
    arsenalButton.disabled = true;

    const numberOfCards = round >= 25 ? 4 : 3;
    const selectedCards = Array.from({ length: numberOfCards }, () => cards.getCard());

    cardContainer.querySelectorAll('.card').forEach((card, index) => {
        if (index < numberOfCards) {
            card.style.display = 'flex';
            card.classList.remove('explosive');
            const selectedCard = selectedCards[index];
            card.textContent = selectedCard;
            if (selectedCard === 'Explosive') {
                card.classList.add('explosive');
            }
            card.onclick = function() {
                cards.useCard(selectedCard);
                updateGrid();
                document.body.classList.remove('blur');
                cardContainer.style.display = 'none';
                arsenalButton.disabled = false;
            };
        } else {
            card.style.display = 'none';
        }
    });
}

function nextRound(arsenalValue, value) {
    const diff = arsenalValue - value;
    let increment = Math.ceil((10 + Math.pow(round, 3) / 1000 + Math.log10(diff + 1) * 10) / 10) * 10;
    const surpressorCount = cards.arsenal.arms.filter(arm => arm.type === 'surpressor').length;
    const adjustedIncrement = Math.ceil(increment * (1 - 0.05 * surpressorCount) / 10) * 10;
    const adjustedValue = value + adjustedIncrement;
    return adjustedValue;
}

showCards();
updateRefreshButton();

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !arsenalButton.disabled) {
        arsenalButton.click();
    }

    if (document.body.classList.contains('blur')) {
        const cardContainer = document.querySelector('.card-container');
        const cards = cardContainer.querySelectorAll('.card');
        if (event.key === '1' && cards[0]) {
            cards[0].click();
        } else if (event.key === '2' && cards[1]) {
            cards[1].click();
        } else if (event.key === '3' && cards[2]) {
            cards[2].click();
        } else if (event.key === '4' && cards[3]) {
            cards[3].click();
        }
    }
});