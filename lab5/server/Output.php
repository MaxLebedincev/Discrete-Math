<?php
if(isset($_POST["cell00"])) {

    $error = false;
    $result = "";

    $i = 0;
    $g = 0;
    $temp_str = "cell".$i.$g;
    $mas_unit[0][0] = "";

    while(isset($_POST[$temp_str])) {
        while(isset($_POST[$temp_str])) {
            $mas_main[$i][$g] = $_POST[$temp_str];
             $mas[$i][$g] = $mas_main[$i][$g];
            // if ($i == $g) {
            //     $mas_unit[$i][$g] = 1;
            // }
            // else {
            //     $mas_unit[$i][$g] = 0;
            // }
            $g++;
            $temp_str = "cell".$i.$g;
        }
        $g = 0;
        $i++;
        $temp_str = "cell".$i.$g;
    }

    $line = $i;
    $all_mas = $mas_main;
    $result .= OutputTableMain($mas_main,"Изначальная матрица");

    for ($i = 0; $i < $line-2; $i++) {
        $mas_main_next = NextStep($mas_main, $mas);
        $result .= OutputTable($mas_main,$mas,$mas_main_next,$i+1);
        $mas_main = $mas_main_next;
        $all_mas = PlusArray($all_mas,$mas_main);

    }
//    $all_mas = PlusArray($all_mas,$mas_unit);
//    $result .= OutputTableMain($all_mas,"Матрица достижимости<br>Сложение матриц");
    $all_mas = NoPlusMas($all_mas);
    $result .= OutputTableMain($all_mas,"Матрица достижимости");

    echo $result;

}
/**
 * [OutputTable description] Вывод действия умножения
 * между первой и второй матрицой и их результат
 * в третьей матрице
 * Последний аргумент номер действия. 
 * @param [Array[Integer][Integer]] $array       [description]
 * @param [Array[Integer][Integer]] $array_two   [description]
 * @param [Array[Integer][Integer]] $array_three [description]
 * @param [Integer] $nomber      [description]
 */
function OutputTable($array,$array_two,$array_three,$nomber) {
    $str = "<br><table>";
    $h = 0;
    $k = 0;
    while(isset($array[$h][$k])){
        $str .= "<tr>";

        if($h == 0) {
            $str .= "<td class='orange'> ".$nomber.") </td>";
        }
        else {
            $str .= "<td class='orange'></td>";
        }
        while(isset($array[$h][$k])){
            $str .= "<td>".$array[$h][$k]."</td>";
            $k++;
        }

        if($h == ceil(count($array[$h])/2-1)) {
            $str .= "<td class='orange'> * </td>";
        }
        else {
            $str .= "<td class='orange'></td>";
        }
        $k = 0;
        while(isset($array_two[$h][$k])){
            $str .= "<td>".$array_two[$h][$k]."</td>";
            $k++;
        }

        if($h == ceil(count($array[$h])/2-1)) {
            $str .= "<td class='orange'> = </td>";
        }
        else {
            $str .= "<td class='orange'></td>";
        }
        $k = 0;
        while(isset($array_three[$h][$k])){
            $str .= "<td>".$array_three[$h][$k]."</td>";
            $k++;
        }

        $h++;
        $k = 0;
        $str .= "</tr>";
    }
    $str .= "</table>";
    return  $str;
}
/**
 * [NextStep description] Перемножение матриц
 * возвращает перемноженную матрицу
 * @param [Array[Integer][Integer]] $array_main  [description]
 * @param [Array[Integer][Integer]] $array_first [description]
 */
function NextStep($array_main, $array_first) {

    $h = 0;
    $k = 0;
    while(isset($array_main[$h][$k])){
        $k=0;
        while(isset($array_main[$h][$k])){
           $l = 0; $key = false;
           while(isset($array_first[$l][$h])) {
                if (($array_first[$l][$k] * $array_main[$h][$l]) == 1) {
                    $key = true;
                }
                $l++;
           }
           $key ? $output_mas[$h][$k] = 1 : $output_mas[$h][$k] = 0;
           $l = 0;
           $k++;
        }
        $k = 0;
        $h++;
    }

    return $output_mas;
}
/**
 * Возвращает матрицу с оглавлением
 * [OutputTableMain description] 
 * @param [Array[Integer][Integer]] $arr     [description]
 * @param [String] $MainStr [description]
 */
function OutputTableMain($arr,$MainStr) {
    $str = "<br><h1>".$MainStr."</h1><table><tr>";
    for ($h = 0; $h < count($arr)+1; $h++) {
        $str .= "<td class='orange'>".$h."</td>";
    }
    $str .= "</tr>";

    for ($h = 0; $h < count($arr); $h++) {
        $k = $h +1;
        $str .= "<tr><td class='orange'>".$k."</td>";
        for ($l = 0; $l < count($arr); $l++) {
            $str .= "<td>".$arr[$h][$l]."</td>";
        }
        $str .= "</tr>";
    }
    $str .= "</table>";
    return $str;
}

/**
 * [PlusArray description] Сложение матриц
 * возвращает матрицу
 * @param [Array[Integer][Integer]] $first_mas [description]
 * @param [Array[Integer][Integer]] $help_mas  [description]
 */
function PlusArray ($first_mas,$help_mas) {

    for ($h = 0; $h < count($first_mas); $h++) {
        for ($l = 0; $l < count($first_mas); $l++) {
            $first_mas[$h][$l] += $help_mas[$h][$l];
        }
    }
    return $first_mas;

}

/**
 * Логическое сложение матриц
 * возвращает матрицу
 * [NoPlusMas description]
 * @param [Array[Integer][Integer]] $final_mas [description]
 */
function NoPlusMas ($final_mas) {

    for ($h = 0; $h < count($final_mas); $h++) {
        for ($l = 0; $l < count($final_mas); $l++) {
            if ($final_mas[$h][$l] != 0) {
                $final_mas[$h][$l] = 1;
            }
        }
    }
    return $final_mas;

}

?>

