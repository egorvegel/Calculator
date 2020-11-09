let numbers = document.querySelectorAll('.number');
let signesOfGragually = document.querySelectorAll('.sign.gradually');
let signesOfImmediatly = document.querySelectorAll('.sign.immediatly');
let poly = document.querySelector('.calc__poly');
let minus = document.querySelector('.minus');
let search = document.querySelector('.calc__search');
let eraser = document.querySelector('.eraser');
let eraserX = document.querySelector('.eraser-x');
let popUp = document.querySelector('.calc__tip');
let historyLink = document.querySelector('.history__link');
let results = document.querySelector('.results');


historyLink.addEventListener('click', function (evt) {
	evt.preventDefault();
	let calcHistory = document.querySelector('.calc__history');
	calcHistory.classList.toggle('visible');
})

document.addEventListener('keydown', function (evt) {
	if (evt.keyCode == 189) {
		poly.textContent += evt.key;
	} else if (evt.keyCode == 187) {
		poly.textContent += evt.key;
	} else if (evt.keyCode == 8) {
		poly.textContent = poly.textContent.substring(0, poly.textContent.length - 1);
	} else if (evt.keyCode == 13) {
		calc();
	} else if (evt.key == '/') {
		poly.textContent += evt.key;
	}

	for (var j = 48; j <= 57; j++) {
		if (evt.keyCode == j) {
			poly.textContent += evt.key;
		}
	}
	for (var j = 96; j <= 111; j++) {
		if (evt.keyCode == j && !poly.textContent.includes('*') && !poly.textContent.includes('/') && !poly.textContent.includes('+') && poly.textContent.indexOf('-', 2) == -1) {
			poly.textContent += evt.key;
		}
	}
})


eraser.addEventListener('click', function () {
	poly.textContent = '';
})

minus.addEventListener('click', function () {
	if (!poly.textContent.includes('-')) {
		poly.textContent = '-' + poly.textContent;
	}
})

eraserX.addEventListener('click', function () {
	poly.textContent = poly.textContent.substring(0, poly.textContent.length - 1);
})


for (var i = 0; i < numbers.length; i++) {
	numbers[i].addEventListener('click', function () {
		poly.textContent += this.textContent;
		return poly.textContent;
	});
}

for (var i = 0; i < signesOfImmediatly.length; i++) {
	signesOfImmediatly[i].onclick = function () {
		let resultIm = poly.textContent;
		if (this.textContent == '^') {
			resultIm *= resultIm;
		} else if (this.textContent == '√') {
			resultIm = Math.sqrt(resultIm);
		}
		poly.textContent = resultIm;
		console.log(resultIm);
	}

}

for (var i = 0; i < signesOfGragually.length; i++) {
	signesOfGragually[i].addEventListener('click', function () {
		if (!poly.textContent.includes('*') && !poly.textContent.includes('/') && !poly.textContent.includes('+') && poly.textContent.indexOf('-', 2) == -1) {
			poly.textContent += this.textContent;
			return poly.textContent;
		}
	});
}



let calc = function () {
	let arrayStr = poly.textContent;
	arrayStr = arrayStr.split('');

	for (var i = 0; i < arrayStr.length; i++) {
		if (!poly.textContent.match(/[0-9]\+[0-9]/) && !poly.textContent.match(/[0-9]\-[0-9]/) && !poly.textContent.match(/[0-9]\*[0-9]/) && !poly.textContent.match(/[0-9]\/[0-9]/)) {
			console.log(poly.textContent.match(/[0-9]\+/));
			popUp.textContent = 'Введите правильное выражение!';
			errors();
			return 0;
		}
	}
	let a = aDef(arrayStr);
	let sign = signDef(arrayStr);
	let b = bDef(arrayStr);

	let sumA = '';
	let sumB = '';
	for (var i = 0; i < a.length || i < b.length; i++) {
		sumA += a[i];
		sumB += b[i];
	}

	a = parseFloat(sumA);
	b = parseFloat(sumB);

	let result;
	if (sign == '+') {
		result = a + b;
	} else if (sign == '-') {
		result = a - b;
	} else if (sign == '*') {
		result = a * b;
	} else if (sign == '/') {
		if (b == 0) {
			errors();
			popUp.textContent = 'На 0 делить нельзя!';
			result = poly.textContent;
		} else {
			result = a / b;
			if (a % b != 0) {
				result = result.toFixed(2);
			}
		}
	}
	poly.textContent = result;

	let resultHistory = document.createElement('li');
	let resultsHistory = results.childNodes;
	if (resultsHistory.length > 7) {
		results.childNodes[1].remove();
		resultHistory.textContent = poly.textContent;
		results.appendChild(resultHistory);
	} else {
		resultHistory.textContent = poly.textContent;
		results.appendChild(resultHistory);
	}
	console.log(results.childNodes);
	return results.childNodes;
}


let aDef = function (arrayStr) {
	a = [];
	for (var i = 0; i < arrayStr.length; i++) {
		if (arrayStr[i] != '+' && arrayStr[i] != '*' && arrayStr[i] != '/' && arrayStr[i].indexOf('-', 2) == -1) {
			a.push(arrayStr[i]);

		} else {
			break;
		}
	}
	return a;
}

let signDef = function (arrayStr) {
	sign = '';
	for (var i = 0; i < arrayStr.length; i++) {
		if (arrayStr[i] === '+' || arrayStr[i] === '*' || arrayStr[i] === '/' || arrayStr[i] === '-') {
			sign = arrayStr[i];
		}
	}
	return sign;
}

let bDef = function (arrayStr) {
	b = [];
	for (var i = arrayStr.length - 1; i > 0; i--) {
		if (arrayStr[i] != '+' && arrayStr[i] != '*' && arrayStr[i] != '/' && arrayStr[i] != '-') {
			b.push(arrayStr[i]);

		} else {
			break;
		}
	}
	b.reverse();
	return b;
}

let errors = function () {
	poly.classList.add('error');
	popUp.classList.add('err');
	setTimeout(function () {
		popUp.classList.remove('err');
		poly.classList.remove('error');
	}, 1500);
}
search.addEventListener('click', calc);



