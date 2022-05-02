import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const TIME_DELAY = 1000;
let timeId = null;
let selectedDate = null;

refs.btnStart.disabled = true;

refs.btnStart.addEventListener('click', handleClick);


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            Notify.failure('Please choose a date in the future');
            return;
        }
        refs.btnStart.disabled = false;
        selectedDate = selectedDates[0];
    },
    onOpen() {
        clearInterval(timeId);
        refs.btnStart.disabled = true;

        refs.days.textContent = '00';
        refs.hours.textContent = '00';
        refs.minutes.textContent = '00';
        refs.seconds.textContent = '00';
    },
};

flatpickr("#datetime-picker", options);

function handleClick() {
    timeId = setInterval(() => {
            const currentDate = Date.now();
            const convertSelectedDate = selectedDate.getTime();
            const deltaTime = convertSelectedDate - currentDate;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);

            refs.days.textContent = `${days}`;
            refs.hours.textContent = `${hours}`;
            refs.minutes.textContent = `${minutes}`;
            refs.seconds.textContent = `${seconds}`;
            refs.btnStart.disabled = true;

            if (`${days}` === '00' && `${hours}` === '00' && `${minutes}` === '00' && `${seconds}` === '00') {
                clearInterval(timeId);
            }
        },
        TIME_DELAY)
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

Notify.init({
    width: '280px',
    position: 'center-top',
    distance: '30px',
    borderRadius: '10px',
    timeout: 3000,
    cssAnimationStyle: 'from-top',
})