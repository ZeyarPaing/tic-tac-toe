const main = document.querySelector('main');
const board = document.querySelector('.board');
const dialog = document.querySelector('.overlay');
const winnerText = document.querySelector('.display-winner')

function renderBoxes(parentEle,arr) {
	return arr.map(ele => ele.map(e => {
		const newEle = document.createElement('div');
		newEle.classList.add('box');
		newEle.id = e;
		parentEle.appendChild(newEle);
		return newEle;
	}));
}
function detectClick(boxes) {
	let isX = false;
	let moves = 0;
	let winner = '';
	
	function showWinnerDialog(winner) {
		dialog.classList.remove('hide');
		winnerText.textContent = winner ? `${winner} wins the game.`: 'Draw';
	}
	board.addEventListener('click',(e) => {
		const clickedElement = e.target;
		let eleClassList = clickedElement.classList.value

		if (!(eleClassList.includes('board') || eleClassList.includes('clicked'))) {
			clickedElement.textContent = isX ? "X" : "O";
			isX = !isX;
			++moves;
			clickedElement.classList.add('clicked')
			moves > 4 && (winner = checkIfWin(boxes));
			if (winner) {
				setTimeout(() => showWinnerDialog(winner), 300);
			} else if(moves >= 9){
				setTimeout(() => showWinnerDialog(), 300)
			}
		}
	});
}

function checkIfWin(boxes) {
	let j = 0
	for (let i of boxes) {
		if (i.every((ele) => ele.textContent === 'X')) {
			return 'X';
		} else if (i.every((ele) => ele.textContent === 'O')) {
			return 'O';
		}

		let r1 = boxes[0][j].textContent;
		let r2 = boxes[1][j].textContent;
		let r3 = boxes[2][j].textContent;
		let predicate = (r1 === 'X' || r1 === 'O') && (r2 === 'X' || r2 === 'O') && (r3 === 'X' || r3 === 'O') && r1 == r2 && r2 == r3;
		if (predicate) {
			return r1
		}
		j++;
	}
	function checkByPredicate([a,b],[c,d],[e,f])
	{
		let r1 = boxes[a][b].textContent;
		let r2 = boxes[c][d].textContent;
		let r3 = boxes[e][f].textContent;
		let predicate = (r1 === 'X' || r1 === 'O') && (r2 === 'X' || r2 === 'O') && (r3 === 'X' || r3 === 'O')  && r1 == r2 && r2 == r3;
		if (predicate) {
			return r1
		}
	}
	return (checkByPredicate([0,0],[1,1],[2,2]) || checkByPredicate([0,2],[1,1],[2,0]))
}

var boxes = renderBoxes(board,[[1,2,3],
															 [4,5,6],
															 [7,8,9]]);
detectClick(boxes);

function resetGame() {
	history.go('/');
}
///console.log(boxes)
