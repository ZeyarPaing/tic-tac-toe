const main = document.querySelector('main');
const board = document.querySelector('.board');

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
	board.addEventListener('click',(e) => {
		const clickedElement = e.target;
		if (clickedElement.classList.value !== 'board') {
			clickedElement.textContent = isX ? "X" : "O";
			isX = !isX;
			++moves;
			moves > 4 && (winner = checkIfWin(boxes));
			winner && setTimeout(() => alert('Winner is ' + winner),500);
		}
	});
}

function checkIfWin(boxes) {
	// let predicates = [
	// 	{ init: boxes[0], check: boxes[0].textContent == boxes[1].textContent == boxes[2].textContent },
	// 	{ init: boxes[3], check: boxes[3].textContent == boxes[4].textContent == boxes[5].textContent },
	// 	{ init: boxes[6], check: boxes[6].textContent == boxes[7].textContent == boxes[8].textContent },
	// 	{ init: boxes[0], check: boxes[0].textContent == boxes[3].textContent == boxes[6].textContent },
	// 	{ init: boxes[1], check: boxes[1].textContent == boxes[4].textContent == boxes[7].textContent },
	// 	{ init: boxes[2], check: boxes[2].textContent == boxes[5].textContent == boxes[8].textContent },
	// 	{ init: boxes[0], check: boxes[0].textContent == boxes[4].textContent == boxes[8].textContent },
	// 	{ init: boxes[2], check: boxes[2].textContent == boxes[4].textContent == boxes[6].textContent },
	// ];
	//Horizontal rows
	//console.log(boxes)
	for (let i of boxes) {
		if (i.every((ele) => ele.textContent === 'X')) {
			return 'X';
		} else if (i.every((ele) => ele.textContent === 'O')) {
			return 'O';
		}
	}
}

var boxes = renderBoxes(board,[[1,2,3],
															 [4,5,6],
															 [7,8,9]]);
detectClick(boxes);
///console.log(boxes)
