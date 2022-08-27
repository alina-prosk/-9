
const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]')
}

let intervalId;

refs.start.addEventListener('click', onStartColors);
refs.stop.addEventListener('click', onStopColors);

function onStartColors() {
    intervalId = setInterval(() => {
        const color = getRandomHexColor();
        document.body.style.background = color;
    }, 1000);
    buttonStatus(true, false)
}

function onStopColors() {
    clearInterval(intervalId);
    buttonStatus(false, true)
}

function buttonStatus(start, stop) {
    refs.start.disabled = start
    refs.stop.disabled = stop
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}