$(document).ready(function(){
    $("#ButtonOutput").click(
        function(){
            CheckAndOutput('ResultForm','FormSizeMatrix','server/CheckAndOutput.php');
            return false;
        }
    );
});


function CheckAndOutput(ResultForm, Form, url) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: $("#"+Form).serialize(),
        success: function(response) {
            result = response;
            console.log("YES");
            $('#ResultForm').html(result);
            $("#ButtonFinal").click(
                function(){
                    CheckAndFinal('ResultFinal','FormFinal','server/CheckAndOutput.php');
                    return false;
                }
            );
        },
        error: function(response) {
            $('#ResultForm').html('Ошибка. Данные не отправлены.');
        }
    });
}

function CheckAndFinal(ResultForm, Form, url) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: $("#"+Form).serialize(),
        success: function(response) {
            result = response;
            console.log("YES");
            $('#ResultFinal').html(result);
        },
        error: function(response) {
            $('#ResultFinal').html('Ошибка. Данные не отправлены.');
        }
    }).then(function(e){
        let res = e;
    })
}