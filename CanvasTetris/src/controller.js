export default class Controller {
    constructor (game, view) {
        this.game = game;
        this.view = view;
        this.isPlaying = false;
        this.intervalId = null;

        this.view.renderStartScreen();

        document.addEventListener('keydown', this.handelKyeDown.bind(this));  // привязывает к объекту
    }

    update() {
        this.game.movePieceDown();
        this.updateView();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    updateView() {
        const state = this.game.getState();

        if(state.isGameOver) {
            this.view.renderEndScreen(state);
        } else {
            this.view.renderMainScreen(state); 
        }
    }

    startTimer() {
        const speed = 600 - this.game.getState().level * 100;

        if(!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed: 100);
        }
    }

    stopTimer() {
        if(this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    handelKyeDown (event) {
        switch (event.keyCode) {
            case 13:
                if(this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }   
                break;
            case 37:
                this.game.movePieceLeft();
                this.updateView();
                break;
            case 38:
                this.game.rotatePiece();
                this.updateView();
                break;
            case 39:
                this.game.movePieceRight();
                this.updateView();
                break;
            case 40:
                this.game.movePieceDown();
                this.updateView();
                break;
        }
    }
}