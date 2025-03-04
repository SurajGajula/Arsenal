import Arsenal from './arsenal.js';

const arsenal = new Arsenal();

document.querySelector('.arsenal-button').onclick = function() {
    console.log('arsenal');
    document.querySelector('.display-area').textContent = arsenal.value();
};
