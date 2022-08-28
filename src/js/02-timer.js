// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    text: document.querySelector('#datetime-picker'),
    start: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
}
refs.start.disabled = true;

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
        window.alert('Please choose a date in the future');
        refs.start.disabled = true;
    } else {
        refs.start.disabled = false;
    }
},
};
flatpickr(refs.text, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

  // Remaining days
const days = Math.floor(ms / day);
  // Remaining hours
const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

refs.start.addEventListener('click', () => {
    let timerId = setInterval(() => {
        let countDown = new Date(refs.text.value) - new Date();
        refs.start.disabled = true;
        if (countDown >= 0) {
            let timeObject = convertMs(countDown);
            refs.days.textContent = addLeadingZero(timeObject.days);
            refs.hours.textContent = addLeadingZero(timeObject.hours);
            refs.minutes.textContent = addLeadingZero(timeObject.minutes);
            refs.seconds.textContent = addLeadingZero(timeObject.seconds);
            if (countDown <= 10000) {
            }
        } else {
            clearInterval(timerId);
        }
    }, 1000);
});