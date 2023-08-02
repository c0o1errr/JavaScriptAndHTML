export default class View {
    static colors = {
        '1': '#CD2682',
        '2': 'Magenta',
        '3': 'GreenYellow',
        '4': 'LawnGreen',
        '5': 'Khaki',
        '6': 'yellow',
        '7': 'Crimson'
    };

    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas'); // создание холста
        this.canvas.width = this.width;   // ширина холста 
        this.canvas.height = this.height; // высота холста
        this.context = this.canvas.getContext('2d'); // контекст с помощью которого будем рисовать

        this.blockWidth = this.width / columns; // вычисление ширины блока
        this.blockHeight = this.height / rows;  // высоты блока
        
        this.element.appendChild(this.canvas); // добавить элемент в контекст в корень
    }

    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);
    }

    renderStartScreen() {
        this.context.textAlign = 'center';
        this.context.font = '800px';
        const gradient = this.context.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.5, 'yellow');
        gradient.addColorStop(1, 'blue');
        this.context.fillStyle = gradient; 
        this.context.font = 'bold 18px Arial'; 
        this.context.fillText('Press Enter to Start', this.width / 2, this.height / 2);
    }

    renderEndScreen() {
        this.clearScreen();
        this.context.textAlign = 'center';
        const gradient = this.context.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(0.5, 'yellow');
        gradient.addColorStop(1, 'red');
        this.context.fillStyle = gradient;
        this.context.font = 'bold 18px Arial'; 
        this.context.fillText('Game Over', this.width / 2, this.height / 2);
    }

    renderPlayfield({ playfield }) {

        for(let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if(block) {
                    this.renderShape(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight, View.colors[block]);
                }
            }
        }
    }

    renderShape(x, y, width, height, color) {
        this.context.fillStyle = color;  // цвет заливки
        this.context.strokeStyle = 'black'; // цвет обводки
        this.context.lineWidth = 2; // ширина обводки
                    
        this.context.fillRect(x, y, width, height); //рисовка прямоугольника
        this.context.strokeRect(x, y, width, height); // создание обводки
    }

    renderPanel({ level, score, lines}) {
        this.context.textAlign = 'start';  // текст отформатирован по левому краю
        this.context.textBaseline = 'top'; // текст отформатирован по верхнему краю
        this.context.fillStyle = 'white'; // цвет текста
        this.context.font = '14px';  // шрифт текста

        this.context.fillText(`Level: ${level}`, 0, 0);   // вывести текст
        this.context.fillText(`Score: ${score}`, 0, 15);
        this.context.fillText(`Lines: ${lines}`, 0, 30);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height); // очистка холста после движения
    }
}