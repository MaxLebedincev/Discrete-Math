var main_mas_two = [];																						// Инициализация трёх основных массивов
var main_mas = [];
var output_string = "";

var main_mas_long = 0;

const check_string = /(?<=(\s\(|^\())\d[02468][13579][a-zа-яё]\,\d[02468][13579][a-zа-яё](?=(\)\s|\)$))/gi  // Регулярные выражения для проверки и разделения массивов;
const check_mas = /\d[02468][13579][a-zа-яё]/gi

function delet() {
	
	main_mas_one = [];																						// Обнуление основных элементов
	main_mas_two = [];
	main_mas = [];
	document.getElementById('output_input').value = "";
	console.clear();
	output_string = "";
	document.getElementById('answer1').value = "";
	document.getElementById('answer2').value = "";
	document.getElementById('answer3').value = "";

}

function start() {

	let str_input = document.getElementById("main_input").value;											// Инициализация вспомогательных переменных
	let help_mas = str_input.match(check_string);
	let help_string = "";
	let answer_1 = "";
	let answer_2 = "";
	let answer_3 = "";



	if (help_mas != null) {
		help_mas.forEach(element_mas => help_string += " (" + element_mas + ")"); 	
		main_mas_two = main_mas_two.concat(help_mas);														// Инициализация неочищенно массива пример: ["123l,123p"]
		output_string += help_string;
		help_mas = help_mas.map(value => value.split(','))													// Инициализация двумерного массива, пример: [[123l, 123p][123p,123r]]		
		main_mas = main_mas.concat(help_mas);											
	}

	document.getElementById('output_input').value = output_string;
	document.getElementById("main_input").value = "";

	if (str_input == "") {

	}
	else if (help_string != (" " + str_input)) {															// Ввывод ошибок
		alert("Ввод возможно был не корректен введены, только следующие значения: " + help_string);
	}

	if (main_mas != null) {
		main_mas_long = main_mas.length;		
	}

	if (main_mas_long > 1) {																				// Вывод рефлексии и симметрии
		answer_1 = reflexivity(main_mas_two);
		answer_2 = symmetry(main_mas);
	}
	if (main_mas_long > 2) {																				// Вывод транзитивности
		answer_3 = transitivity(main_mas);
	}
	
	document.getElementById('answer1').value = answer_1;
	document.getElementById('answer2').value = answer_2;
	document.getElementById('answer3').value = answer_3;
}

function reflexivity(mas) {

	let key_one = true;
	let key_two = true;
	let answer = "";
	for (let i = 0; i < mas.length; i++) {
		let key = false;
		for (let j = 0; j < i; j++) {
			if (mas[i] == mas[j]) {
				key = true;
			}
		}
		for (let j = i+1; j < mas.length; j++ ) {
			if (mas[i] == mas[j]) {
				key = true;
			}
		}
		if (key === false) {
			key_two = false;
		}
		else {
			key_one = false;
		}
	}
	if (key_one === true) {
		answer = "Антирефлексивные";
	}
	if (key_two === true) {
		answer = "Рефлексивные";	
	}
	return answer;
}

function symmetry(mas) {

	let key_one = true;
	let key_two = true;
	let answer = "Антисимметричные";
	for (let i = 0; i < mas.length; i++) {
		let key = false;
		for (let j = 0; j < i; j++) {
			if ((mas[i][0] == mas[j][1]) & (mas[i][1] == mas[j][0])) {
				key = true;
			}
		}
		for (let j = i+1; j < mas.length; j++ ) {
			if ((mas[i][0] == mas[j][1]) & (mas[i][1] == mas[j][0])) {
				key = true;
			}
		}
		if (key === false) {
			key_two = false;
		}
		else {
			key_one = false;
		}
	}
	if (key_one === true) {
		answer = "Асимметричные";
	}
	if (key_two === true) {
		answer = "Симметричные";	
	}
	return answer;
}

function transitivity(mas) {

	let key_one = true;
	let key_two = true;
	let answer = "";
	
	for (let i = 0; i < mas.length; i++) {
		if (mas[i][0] != mas[i][1]) {
			for (let j = 0; j < mas.length; j++) {
				if ((mas[i][1] == mas[j][0]) & (mas[i][0] != mas[j][1]) & (mas[i][1] != mas[j][1])) {
					let key = false;
					for (let k = 0; k < mas.length; k++) {
						if ((mas[i][0] == mas[k][0]) & (mas[k][1] == mas[j][1])) {
							key = true;
						}
					}
					if (key === false) {
						key_two = false;
					}
					else {
						key_one = false;
					}
				}
			}
		}
	}
	if ((key_one === true) & (key_two === true)) {

	}
	else if (key_one === true) {
		answer = "Антитранзитивные";
	}
	else if (key_two === true) {
		answer = "Транзитивные";	
	}
	return answer;
}