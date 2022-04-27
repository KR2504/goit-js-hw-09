const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
}

let changeColor = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onBtnClickStartToChangeColor);
refs.stopBtn.addEventListener('click', onBtnClickStopChangeColor);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnClickStartToChangeColor() {
    changeColor = setInterval(() => {
        const backgroundColor = getRandomHexColor();
        refs.body.style.backgroundColor = backgroundColor;
    }, 1000)

    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function onBtnClickStopChangeColor() {
    clearInterval(changeColor);

    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}