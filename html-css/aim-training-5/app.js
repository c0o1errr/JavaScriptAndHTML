const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeL = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#ADFF2F', '#00FA9A', '#FF8C00', '#00FFFF', '#FF00FF', '#9932CC', '#F4A460', '#DC143C', '#FFFF00'];
let time = 0;
let score = 0;


startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up')
        startGame();
    }
})

board.addEventListener('click', event =>{
    if(event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRamdomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRamdomCircle();
    setTime(time);
}

function decreaseTime() {
    if(time === 0) {
        finishGame();
    } else {
        let currenTime = --time;
        if(currenTime < 10) {
            currenTime = `0${currenTime}`;
        }
        setTime(currenTime);
    }
    
}

function setTime(value) {
    timeL.innerHTML = `00:${value}`;
}

function finishGame() {
    timeL.parentNode.classList.add('hide')
    board.innerHTML = `<h2>Cчет: <span class="primary">${score}</span></h2>`
}

function createRamdomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 30);
    const color = getRandomColor()
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);


    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;
    circle.style.boxShadow = `width ${color}, heigth ${color}`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}