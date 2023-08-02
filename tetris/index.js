let main = document.querySelector('.main');

let score = 0;
let line = 0;
let currentLevel = 1;   
let scoreElem = document.getElementById('score');
let lineElem = document.getElementById('line');
let levelElem = document.getElementById('level');

let playfield = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

let	possibleLevel = {
		1: {
			scoreLine: 10,
			speed: 400,
			nextLevelScore: 50,
		},
		2: {
			scoreLine: 30,
			speed: 300,
			nextLevelScore: 250,
		},
		3: {
			scoreLine: 60,
			speed: 200,
			nextLevelScore: 700,
		},
		4: {
			scoreLine: 120,
			speed: 100,
			nextLevelScore: 1500,
		},
		5: {
			scoreLine: 180,
			speed: 50,
			nextLevelScore: Infinity,
		},
	}

let figures = {
	O: [
		[1,1],
		[1,1]
	],
	I: [
		[0,1,0,0], 
		[0,1,0,0], 
		[0,1,0,0],
		[0,1,0,0]
	],
	S: [
		[0,1,1], 
		[1,1,0],
		[0,0,0]
	],
	Z: [
		[1,1,0], 
		[0,1,1],
		[0,0,0]
	],
	L: [
		[0,1,0], 
		[0,1,0],
		[0,1,1]
	],
	J: [
		[0,1,0], 
		[0,1,0],
		[1,1,0]
	],
	T: [
		[1,1,1], 
		[0,1,0],
		[0,0,0]
	],
};

activePiece = newRandomPiece();
isPaused = true;

function draw() {
	let mainInnerHtml ='';
	for (let y = 0; y < playfield.length; y++){
    	for (let x = 0; x < playfield[y].length; x++) {
			if(playfield[y][x] === 1){
				mainInnerHtml += '<div class="cell movingCell"></div>';
			} else if (playfield[y][x] === 2){
				mainInnerHtml += '<div class="cell fixedCell"></div>';
			} else {
				mainInnerHtml += '<div class="cell"></div>';
			}
    	}
	}
	main.innerHTML = mainInnerHtml;
}

function removePrevActivePiece() {
	for (let y = 0; y < playfield.length; y++){
		for (let x = 0; x < playfield[y].length; x++) {
			if(playfield[y][x] === 1) {
				playfield[y][x] = 0;
			}
		}
	}
}

function updateActivePiece() {
	removePrevActivePiece();
	for(let y = 0; y < activePiece.shape.length; y++) {
		for(let x = 0; x < activePiece.shape[y].length; x++) {
			if(activePiece.shape[y][x] ) {
				playfield[activePiece.y + y][activePiece.x + x] = activePiece.shape[y][x];
			}
		}
	}
}

function rotatePiece() {
	const prevPieceState = activePiece.shape;

	activePiece.shape = activePiece.shape[0].map((val, index) => 
		activePiece.shape.map((row) => row[index]).reverse()
	); 
	if(hasCollisions()) {
		activePiece.shape = prevPieceState;
	}
}

function hasCollisions() {
	for(let y = 0; y < activePiece.shape.length; y++) {
		for(let x = 0; x < activePiece.shape[y].length; x++) {
			if(activePiece.shape[y][x] && 
			(playfield[activePiece.y + y] === undefined ||
			playfield[activePiece.y + y][activePiece.x + x] === undefined ||
			playfield[activePiece.y + y][activePiece.x + x] === 2)
			) {
				return true;
			}
		}
	}
	return false;
}

function checkFullLines() {
	let canRemoveLine = true,
		bonusRemoveLine = 0;

	for (let y = 0; y < playfield.length; y++){
		for (let x = 0; x < playfield[y].length; x++) {
			if(playfield[y][x] !== 2) {
				canRemoveLine = false;
			}
		}
		if(canRemoveLine) {
			playfield.splice(y, 1);
			playfield.splice(0, 0, [0,0,0,0,0,0,0,0,0,0]);
			bonusRemoveLine +=1;
			line += 1;
			lineElem.innerHTML = line;	
		}
		canRemoveLine = true;
	}	
	switch(bonusRemoveLine) {
		case 1: 
			score +=possibleLevel[currentLevel].scoreLine;
		break;
		case 2:
			score += possibleLevel[currentLevel].scoreLine * 3;
		break;
		case 3: 
			score +=possibleLevel[currentLevel].scoreLine * 6;
		break;
		case 4: 
			score +=possibleLevel[currentLevel].scoreLine * 12;
		break;	
	}
	scoreElem.innerHTML = score;
	if (score >= possibleLevel[currentLevel].nextLevelScore) {
		currentLevel +=1;
		levelElem.innerHTML = currentLevel;
	}
}

function moveDown() {
	activePiece.y += 1;
	if(hasCollisions()){
		activePiece.y -= 1;
		fixMove();
		checkFullLines();
		activePiece = newRandomPiece(); 
		if(hasCollisions()) {
			reset();
		}
	}
}

function reset() {
	isPaused = false;
	setTimeout(startGame, possibleLevel[currentLevel].speed);
	alert('Game Over');
}

function newRandomPiece() {
	const figuresPiece = 'IOLJSZT';
	const random = Math.floor(Math.random()*7); 
	const newPiece = figures[figuresPiece[random]];
	return {
		 x: Math.floor((10 - newPiece[0].length) /2),
		y: 0,
		shape: newPiece,
	};
}

function fixMove() {
	for (let y = 0; y < playfield.length; y++){
		for (let x = 0; x < playfield[y].length; x++) {
			if(playfield[y][x] === 1) {
				playfield[y][x] = 2;
			}
		}
	}
}   

document.onkeydown = function(e) {
	if(e.key === 'ArrowLeft') {
		activePiece.x -= 1;
		if(hasCollisions()){
			activePiece.x += 1;
		}
	} else if (e.key === 'ArrowRight') {
		activePiece.x += 1;
		if(hasCollisions()){
			activePiece.x -= 1;
		}
	} else if (e.key === 'ArrowDown') {
		moveDown();
	} else if (e.key === 'ArrowUp') {
		rotatePiece();
	}
	updateActivePiece();
	draw();
}

updateActivePiece();
draw();

function startGame() {
	if(isPaused) {
		moveDown();
		updateActivePiece();
		draw();
	}
	setTimeout(startGame, possibleLevel[currentLevel].speed);
}

setTimeout(startGame, possibleLevel[currentLevel].speed);