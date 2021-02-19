function start() {

var masstr1 = document.getElementById("str_1");
var masstr2 = document.getElementById("str_2");

const filt = /(?<=(\s|^))\d[02468][13579][a-zа-яё](?=(\s|$))/gi

var result_all_str = masstr1.value + " " + masstr2.value;

const result_for_masstr1 = masstr1.value.match(filt);
const result_for_masstr2 = masstr2.value.match(filt);

result_all_mas = result_all_str.match(filt);

if ((result_for_masstr1 != null) || (result_for_masstr2 != null)) {

	document.getElementById('str_3').value = union(result_all_mas,filt);

	document.getElementById('str_4').value = cross(result_for_masstr1,result_for_masstr2,filt);

	document.getElementById("str_5").value = diff(result_for_masstr1,result_for_masstr2,filt);

	document.getElementById("str_6").value = diff(result_for_masstr2,result_for_masstr1,filt);

	if ((diff(result_for_masstr2,result_for_masstr1,filt) == "Данного множества не существует!") || (diff(result_for_masstr1,result_for_masstr2,filt) == "Данного множества не существует!")) {
		if (diff(result_for_masstr2,result_for_masstr1,filt) == "Данного множества не существует!") {
			document.getElementById("str_7").value = diff(result_for_masstr1,result_for_masstr2,filt);
		}
		else {
			document.getElementById("str_7").value = diff(result_for_masstr2,result_for_masstr1,filt)
		}
	}
	else {
		document.getElementById("str_7").value = diff(result_for_masstr2,result_for_masstr1,filt) + diff(result_for_masstr1,result_for_masstr2,filt);
	}

	if ((result_for_masstr1 == null) || (result_for_masstr2 == null)) {
		
		document.getElementById("str_8").value = "Данного множества не существует!";

		document.getElementById("str_9").value = "Данного множества не существует!";				
	}
	else {
		document.getElementById("str_8").value = add(result_for_masstr1,result_for_masstr2,filt);

		document.getElementById("str_9").value = add(result_for_masstr2,result_for_masstr1,filt);
	}
}

}

function union (start_output, filt) {
let end_output = "";
let start_long = check_mas(start_output);
	for (let i = 0; i < start_long; i++) {
	let nomber = true;
	for (let j = i+1; j < start_long; j++) {
		if (start_output[i] == start_output[j]) {
			nomber = false; break;
		}
	}
	if (nomber == true) {
		end_output += start_output[i] + " ";
	}
}
return(end_output);
}

function cross(mas1, mas2, filt) {
let end_output ="";
let mas1_long = check_mas(mas1);
let mas2_long = check_mas(mas2);
for (let i = 0; i < mas1_long; i++) {
	for(let j = 0; j < mas2_long; j++) {
		if (mas1[i] == mas2[j]) {
			end_output += mas1[i] + " ";
		}
	}
}
end_mas_output = end_output.match(filt);
if (end_mas_output != null) {
	return(union(end_mas_output,filt));	
} 
else {
	return("Данного множества не существует!");
}
}

function diff(mas1,mas2, filt) {
end_output ="";
mas1_long = check_mas(mas1);
mas2_long = check_mas(mas2);
for (let i = 0; i < mas1_long; i++) {
	let nomber = true;
	for(let j = 0; j < mas2_long; j++) {
		if (mas1[i] == mas2[j]) {
			nomber = false;
		}
	}
	if (nomber == true) {
		end_output += mas1[i] + " ";
	}
}
end_mas_output = end_output.match(filt);
if (end_mas_output != null) {
	return(union(end_mas_output,filt));	
} 
else {
	return("Данного множества не существует!");
}

}

function add(mas1,mas2, filt) {
end_output ="";
mas1_long = check_mas(mas1);
mas2_long = check_mas(mas2);
let check_2 = true;
for (let i = 0; i < mas1_long; i++) {
	let check_1 = false;
	for (let j = 0; j < mas2_long; j++) {
		if (mas1[i] == mas2[j]) {
			check_1 = true;
		}
	}
	if (check_1 == false) {
		check_2 = false;
	}
}
if (check_2 == true) {
	let long_mas1 = union(mas1,filt).match(filt);
	let long_mas2 = union(mas2,filt).match(filt);
	mas1_long = check_mas(long_mas1);
	mas2_long = check_mas(long_mas2);
	if (mas2 == null) {
	check_2 = true;
	}
	if (mas1_long >= mas2_long) {
		check_2 = false;
	}
}
if (check_2 == true) {
	end_output = diff(mas2,mas1,filt);
}
else {
	end_output = "Данного множества не существует!";
}
return(end_output);
}

function check_mas (mas1) {
if (mas1 == null) {
	mas1_long_p = 0;
} 
else {
	mas1_long_p = mas1.length;
}
return(mas1_long_p);
}