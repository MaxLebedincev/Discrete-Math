$(document).ready(function(){
    $("#ButtonSizeForm").click(
        function(){
            StartMainForm('MainForm','SizeForm','server/Start.php');
            return false;
        }
    );
});

function StartMainForm(ResultForm, Form, url) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: $("#"+Form).serialize(),
        success: function(response) {
            result = response;
            console.log("YES");
            $('#MainForm').html(result);
            $("#AnswerStart").click(
                function(){
                    Final('Answer','AnswerForm','server/Output.php');
                    return false;
                }
            );
        },
        error: function(response) {
            $('#MainForm').html('Ошибка. Данные не отправлены.');
        }
    });
}

function Final(ResultForm, Form, url) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: $("#"+Form).serialize(),
        success: function(response) {
            result = response;
            console.log("YES_YES");
            $('#Answer').html(result);
        },
        error: function(response) {
            $('#Answer').html('Ошибка. Данные не отправлены.');
        }
    });
}

function Button(name) {
    console.log(name);
    document.getElementsByName(name)[0].value == "1" ? document.getElementsByName(name)[0].value = 0 : document.getElementsByName(name)[0].value = 1;
}