var mas_A = [];
var mas_B = [];
var long_A = 0;
var long_B = 0;

var string_main_mas = "";
var main_mas = [];
var main_long = 0;
const check_string = /(?<=(\s\(|^\())([a-zа-яё\d]+)\,([a-zа-яё\d]+)(?=(\)\s|\)$))/gi
const check_mas = /(?<=(\,|^))([a-zа-яё\d]+)(?=(\,|$))/gi
var answer = "";

function start_mas() {
	
	let string_A = document.getElementById('input_A').value;
	let string_B = document.getElementById('input_B').value;

		

	if (string_A != "") {
		mas_A = mas_A.concat(string_A.match(check_mas));
	}
	if (string_B != "") {
		mas_B = mas_B.concat(string_B.match(check_mas));
	}
	long_A = mas_A.length;
	long_B = mas_B.length;

	let string_time_A = "";
	let string_time_B = "";
	mas_A.forEach(value_mas => string_time_A += value_mas + ',');
	mas_B.forEach(value_mas => string_time_B += value_mas + ',');
	if ((string_A + ',' != string_time_A) | (string_B + ',' != string_time_B)) {
		alert("Одно или два множества введены не корректно!");
	}


	let time_long_A = 0;
	let time_long_B = 0;

	if (Array.from(new Set(mas_A)) != null) {
		time_long_A = Array.from(new Set(mas_A)).length;
	}
	if (Array.from(new Set(mas_B)) != null) {
		time_long_B = Array.from(new Set(mas_B)).length;
	}

	if ((long_A != time_long_A) || (long_B != time_long_B)) {
		alert("В одном множестве или в обоих сразу были повторения, повторения удалены!")
	}

	mas_A = Array.from(new Set(mas_A));
	mas_B = Array.from(new Set(mas_B));

	if (mas_A.length != 0) {
		string_A = "";	
		mas_A.forEach(value_A => string_A += value_A + ", ");
		document.getElementById('answer2').value = string_A;
	}
	if (mas_B.length != 0) {
		string_B = "";
		mas_B.forEach(value_B => string_B += value_B + ", ");
		document.getElementById('answer3').value = string_B;
	}
	
	document.getElementById('input_A').value = "";
	document.getElementById('input_B').value = "";	
}

function delet_mas() {

	mas_A = [];
	mas_B = [];
	long_A = 0;
	long_B = 0;
	document.getElementById('answer2').value = "";
	document.getElementById('answer3').value = "";	

}

function start() {

	let string_main = document.getElementById('main_input').value;

	let time_main_mas = string_main.match(check_string);

	check_string_output = "";

	if (time_main_mas != null) {
		time_main_mas.forEach(value => check_string_output += ' (' + value + ')');
		string_main_mas += check_string_output;
		if (check_string_output != ' ' + string_main) {
			alert("Возможна ошибка в записи отношения! Введены только следующие значения:" + check_string_output);
		}
	}
	if (time_main_mas != null) {

		time_main_mas = time_main_mas.map(value => value.split(','))	
		main_mas = main_mas.concat(time_main_mas);
		main_long = main_mas.length;
	} 

	if ((mas_B.length == 0) | (mas_A.length == 0)) {
		alert("Одно или два множества пусты!");
	}
	else {

		if (main_mas != null) {

		let main_key = true;

		if (main_long == long_A) {

			main_mas.forEach(value_1 => {
				let key_one = false;
				let key_two = false;
				let nomber = 0;
				for(let value_2 of mas_A) {
					if (value_1[0] == value_2) {
						key_one = true;
						nomber++;
					}
				}
				for (let value_3 of mas_B) {
					if (value_1[1] == value_3) {
						key_two = true;
					}
				}
				if ((key_two == false) | ((key_one == false) | (nomber != 1))) {
					main_key = false;
				}
			})

		}
		else {
			main_key = false;
		}

		if (main_key == true) {
			answer = "Отношение является функций!";
		}
		else {
			answer = "Отношение не является функций!";	
		}
		}
	document.getElementById('answer1').value = answer;
	document.getElementById('answer4').value = string_main_mas;

	}

	document.getElementById('main_input').value = "";

}

function delet() {
	answer = "";
	main_mas = [];
	main_long = 0;
	string_main_mas = "";
	document.getElementById('answer1').value = "";
	document.getElementById('answer4').value = "";
}