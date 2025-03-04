import Arsenal from './arsenal.js';

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
        value += 10;
        showCards();
    } else {
        round = 1;
        value = 10;
    }
    updateInfoArea();
};

function updateGrid() {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';
    for (let i = 0; i < arsenal.count; i++) {
        const square = document.createElement('div');
        square.className = 'square';
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

    cardContainer.querySelectorAll('.card').forEach((card, index) => {
        card.onclick = function() {
            console.log(`Card ${card.dataset.card} has been selected`);
            if (index === randomCardIndex) {
                arsenal.increment();
                updateGrid();
            }
            document.body.classList.remove('blur');
            cardContainer.style.display = 'none';
            arsenalButton.disabled = false;
        };
    });
}
