const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
}

const TIME_DELAY = 1000;
let changeColor = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClickToChangeColor);
refs.stopBtn.addEventListener('click', onStopBtnClickToChangeColor);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClickToChangeColor() {
    changeColor = setInterval(() => {
        const backgroundColor = getRandomHexColor();
        refs.body.style.backgroundColor = backgroundColor;
    }, TIME_DELAY)

    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function onStopBtnClickToChangeColor() {
    clearInterval(changeColor);

    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}