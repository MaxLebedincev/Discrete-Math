<?php
if(isset($_POST["SizeMatrix"])) {

    $error = false;
    $line = $_POST['SizeMatrix'];
    $result = "";


    if (preg_match("/\d+/",$line) && ($line > 0)) {

        $result = "<form method='post' id='AnswerForm' action=''><table>";

        for($i = 0; $i < $line; $i++) {
            $result .= "<tr>";
            for($g = 0; $g < $line; $g++) {
                $result .= "<td class='short_input'><label><input type='text' readonly='readonly' class='short' name='cell".$i.$g."' onclick='Button(".'"cell'.$i.$g.'")'."' value='0'></label></td>";
            }
            $result .= "</tr>";
        }
        $result .= "</table><br><input type='button' id='AnswerStart' value='Отправить'></form><div id='Answer'></div>";

    }
    else {
        $error = true;
    }

    if ($error == true) {
        $result = "Ошибка в вводе!";
    }

    echo $result;
}

?>