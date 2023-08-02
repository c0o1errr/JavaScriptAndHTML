export default class Game {
    static points = {
        '1': 40,
        '2': 120,
        '3': 250,
        '4': 1000
    };

    score = 0;
    lines = 0;
    topOut = false;
    playfield = this.createPlayfield();
    activePiece = this.createRandPiece();
    nextPiece = this.createRandPiece();

    get level() {
        return Math.floor(this.lines * 0.1);
    }

    getState() {
        const playfield = this.createPlayfield();
        const { y: pieceY, x: pieceX, shapes } = this.activePiece; // реструктуризация объекта
        
        for(let y = 0; y < this.playfield.length; y++) {
            playfield[y] = [];

            for(let x = 0; x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x];
            }
        }
        
        for (let y = 0; y < shapes.length; y++) {
            for (let x = 0; x < shapes[y].length; x++) {
                if(shapes[y][x]) {
                    playfield[pieceY + y][pieceX + x] = shapes[y][x];
                }
            }            
        }

        return {
            score: this.score,
            level: this.level,
            lines: this.lines,
            playfield,
            isGameOver: this.topOut
        };
    }

    createPlayfield() {
        const playfield = [];

        for(let y = 0; y < 20; y++) {
            playfield[y] = [];

            for(let x = 0; x < 10; x++) {
                playfield[y][x] = 0;
            }
        }
        return playfield;
    }

    createRandPiece() {
        const random = Math.floor(Math.random() * 7); 
        const type = 'IOLJSZT'[random];
        const newPiece = {};
        switch(type) {
            case 'I': newPiece.shapes = [
                    [0,0,0,0], 
                    [1,1,1,1], 
                    [0,0,0,0],
                    [0,0,0,0]
                ];
                break;
            case 'O': newPiece.shapes = [
                    [2,2],
                    [2,2]
                ];
                break;
            case 'L': newPiece.shapes = [
                    [0,3,0], 
                    [0,3,0],
                    [0,3,3]
                ];
                break;
            case 'J': newPiece.shapes = [
                    [0,4,0], 
                    [0,4,0],
                    [4,4,0]
                ];
                break;
            case 'S': newPiece.shapes = [
                    [0,5,5], 
                    [5,5,0],
                    [0,0,0]
                ];
                break;
            case 'Z': newPiece.shapes = [
                    [6,6,0], 
                    [0,6,6],
                    [0,0,0]
                ];
                break;
            case 'T': newPiece.shapes = [
                    [7,7,7], 
                    [0,7,0],
                    [0,0,0]
                ];
                break;
        }
        
        newPiece.x = Math.floor((10 - newPiece.shapes[0].length) / 2);
        newPiece.y = 0;        
        
        return newPiece;
    }

    movePieceLeft() {
        this.activePiece.x -= 1;

        if(this.hasCollision()) {
            this.activePiece.x +=1;
        } 
    }
    
    movePieceRight() {
        this.activePiece.x += 1;

        if(this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    }

    movePieceDown() {
        if(this.topOut) return;

        this.activePiece.y += 1;

        if(this.hasCollision()) {
            this.activePiece.y -= 1;
            this.fixPiece();
            const clearedLines = this.checkFullLines();
            this.removeBonusLine(clearedLines);
            this.updateActivePiece();
        }

        if(this.hasCollision()) {
            this.topOut = true;
        }
    }

    rotatePiece() {
        this.rotateShape();

        if(this.hasCollision()) {
            this.rotateShape(false);
        }
    }

    rotateShape(clockwise = true) {
        const shapes = this.activePiece.shapes;
        const length = shapes.length;
        const x = Math.floor(length / 2);
        const y = length - 1;

        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++){
                const temp = shapes[i][j];

                if(clockwise) {
                    shapes[i][j] = shapes[y-j][i];
                    shapes[y-j][i] = shapes[y-i][y-j];
                    shapes[y-i][y-j] = shapes[j][y-i];
                    shapes[j][y-i] = temp;
                } else {
                    shapes[i][j] = shapes[j][y-i];
                    shapes[j][y-i] = shapes[y-i][y-j];
                    shapes[y-i][y-j] = shapes[y-j][i];
                    shapes[y-j][i] = temp;
                }
            }
        }
    }

    hasCollision() {
        const { y: pieceY, x: pieceX, shapes } = this.activePiece;

        for(let y = 0; y < shapes.length; y++){
            for(let x = 0; x < shapes[y].length; x++ ) {
                if(
                    shapes[y][x] && 
                    ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX  + x] === undefined) ||
                      this.playfield[pieceY + y][pieceX + x])
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    fixPiece() {
        const { y: pieceY, x: pieceX, shapes} = this.activePiece; 
        
        for(let y = 0; y < shapes.length; y++){
            for(let x = 0; x < shapes[y].length; x++ ) {
                if(shapes[y][x]) {
                    this.playfield[pieceY + y][pieceX + x] = shapes[y][x];
                }
            }
        }
    }

    checkFullLines() {
        const rows = 20;
        const columns = 10;
        let lines = [];

        for (let y = rows - 1; y >= 0; y--) {
            let numberOfBlocks = 0;
            for (let x = 0; x < columns; x++) {
                if(this.playfield[y][x]) {
                    numberOfBlocks += 1;
                }
            }
            if(numberOfBlocks === 0) {
                break;
            } else if (numberOfBlocks < columns) {
                continue;
            } else {
                lines.unshift(y); 
            }
        }

        for (let index of lines) {
            this.playfield.splice(index, 1);
            this.playfield.unshift(new Array(columns).fill(0));    // добавление ряда сверху
        }

        return lines.length;
    }

    removeBonusLine(clearedLines) {
        if(clearedLines > 0 ) {
            this.score += Game.points[clearedLines] * (this.level + 1);
            this.lines += clearedLines;
        }
    }

    updateActivePiece() {
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createRandPiece();
    }
}