import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    const {
        elements: { delay, step, amount }
    } = e.currentTarget;

    let position = 1;
    let delayValue = Number(delay.value);
    const delayStep = Number(step.value);
    const number = Number(amount.value);

    for (let i = 1; i <= number; i += 1) {
        createPromise(position, delayValue)
            .then(({ position, delay }) => {
                Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });

        position += 1;
        delayValue += delayStep;
    }

    e.currentTarget.reset();
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay })
            } else {
                reject({ position, delay })
            }
        }, delay)
    })
}

Notify.init({
    width: '280px',
    position: 'right-top',
    distance: '30px',
    borderRadius: '10px',
    timeout: 4000,
    cssAnimationStyle: 'from-right',
})