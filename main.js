import Arsenal from './arsenal.js';

let round = 1;
let value = 10;
const arsenal = new Arsenal();

function updateInfoArea() {
    document.querySelector('.info-area').textContent = `Round: ${round}, Value: ${value}`;
}

updateInfoArea();

document.querySelector('.arsenal-button').onclick = function() {
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

function showCards() {
    document.body.classList.add('blur');
    const cardContainer = document.querySelector('.card-container');
    cardContainer.style.display = 'flex';

    cardContainer.querySelectorAll('.card').forEach(card => {
        card.onclick = function() {
            console.log(`Card ${card.dataset.card} has been selected`);
            document.body.classList.remove('blur');
            cardContainer.style.display = 'none';
        };
    });
}
