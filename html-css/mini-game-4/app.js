const board = document.querySelector('#board');
const SQUARES_NUMBER = 500;
const colors = ['#ADFF2F', '#00FA9A', '#FF8C00', '#00FFFF', '#FF00FF', '#9932CC', '#F4A460', '#DC143C', '#FFFF00'];

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', () =>
    setColor(square));

    square.addEventListener('mouseleave', () =>
    removeColor(square))
    

    board.append(square);
}

function setColor(element) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d';
    element.style.boxShadow = `0 0 2px #000`;
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}