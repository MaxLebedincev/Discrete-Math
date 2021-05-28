<?php
if(isset($_POST["SizeMatrix"]) && !isset($_POST["start_point"]) && !isset($_POST["end_point"])) {

    $result = "";
    $result .= createtable($_POST['SizeMatrix']);

    echo $result;
}
/**
 * В случае если $line > 0 возвращает матрицу размером $line x $line
 * и объекты doc типа input для введения значений
 * так же возвращает форму для следующего аякс запросу
 * в случае ошибки возвращает строку "Ошибка ввода"  
 * [createtable description]
 * @param  [Intenger] $line [description]
 * @return [String] [description]
 */
function createtable($line) {
    if (preg_match( "/\d+/",$line) && ($line > 0)) {
        $result = "<form method='post' id='FormFinal' action=''><table><tr>";
        $i = 0;

        while($i <= $line) {
            $result .= '<td class="orange"> '.$i.'</td>';
            $i++;
        }
        $i =0; $g=1; $result .="</tr>";
        while($i < $line) {
            $k = 0;
            $result .= '<tr><td class="orange"> '.$g.' </td>';
            while($k < $line) {
                $result .= "<td><input type='text' name='cell".$i.$k."' class='tab'></td>";
                $k++;
            }
            $i++; $g++;
            $result .= "</tr>";
        }
        $result .= "</table>";
        $result .= "<br>Введите начальную вершину<input type='text' name='start_point'><br>";
        $result .= "<br>Введите конечную вершину<input type='text' name='end_point'><br>";
        $result .= '<input type="button" id="ButtonFinal" value="Отправить">';
        $result .= "</form><div id='ResultFinal'></div>";
    }
    else {
        $result = "Ошибка ввода!";
    }

    return $result;
}

if (isset($_POST['start_point']) && isset($_POST['end_point'])) {
    // //Проверка
    // $result = "<br>Nice!";
    $error_key = false;

    $temp_i = 0;
    $temp_k = 0;
    $temp_input_name = "cell".$temp_i.$temp_k;
    while (isset($_POST[$temp_input_name])) {
        while (isset($_POST[$temp_input_name])) {
            if (preg_match("/\d+/",$_POST[$temp_input_name]) && ($_POST[$temp_input_name]>=0)) {
                $mas[$temp_i][$temp_k] = $_POST[$temp_input_name];
            }
            else {
                $error_key = true; break;
            }
            if (($temp_i == $temp_k) && ($mas[$temp_i][$temp_k] != 0)) {
                $error_key = true; break;
            }
            $temp_k++;
            $temp_input_name = "cell".$temp_i.$temp_k;
        }
        if ($error_key == true) {
            break;
        }
        $temp_i++; $temp_k = 0;
        $temp_input_name = "cell".$temp_i.$temp_k;
    }

    $temp_k = 0;
    $temp_i = 0;
    for ($temp_i = 0; $temp_i < count($mas)-1; $temp_i++) {
        for($temp_k = 1; $temp_k < count($mas[0]); $temp_k++) {
            if($mas[$temp_i][$temp_k] != $mas[$temp_k][$temp_i]){
                $error_key = true; break;
            }
        }
        if ($error_key == true) {
            break;
        }
    }

    if (($_POST['start_point'] > count($mas)) || ($_POST['start_point'] == 0)) {
        $error_key = true;
    }
    if (($_POST['end_point'] > count($mas)) || ($_POST['end_point'] == 0)) {
        $error_key = true;
    }

    if ($error_key == true) {
        $result = "Ошибка при вводе!";
    }
    else {
        // Выполнения процесса
        // Инициализация
        $result .= algoritmdistrik($_POST['start_point'], $_POST['end_point'], count($mas), $mas);

    }

    echo $result;
}

/**
 * [algoritmdistrik description] Алгоритм Дейкстры
 * Возвращает кратчайшее расстояние до стартовой вершины
 * Возвращает кратчайший путь от стартовой до конечной вершины
 * @param  [Integer] $start_point [description]
 * @param  [Integer] $end_point   [description]
 * @param  [Integer] $line        [description]
 * @param  [Array[Integer][Integer]] $mas         [description]
 * @return [String]              [description]
 */
function algoritmdistrik ($start_point, $end_point, $line, $mas) {

        // Массив узлов (максимально возможное значение, в идеале бесконечность)
        for($temp_i = 0; $temp_i < $line; $temp_i++) {
            $mas_point[$temp_i] = 10000; // Вес каждого узла (изначально неизвезстное значение максимально)
            $check[$temp_i] = false; // Отметка для обозначение пройдена ли точка (true = пройдена/false = не пройдена)
        }
        $mas_point[$start_point-1] = 0;

        $max = 0;
        for ($i = 0; $i < count($mas); $i++) {
            for ($k = 0; $k < count($mas[0]); $k++) {
                $max += $mas[$i][$k];
            }
        }

        do {
            // Инициализация минимальных значение (изначально максимально возможные значения)
            $min_i = $max;
            $min_value = $max;

            // Выбор графа для проверки (проверяется был ли пройден граф и учитывается его вес (сначала проверяется минимальный))
            for ($temp_i = 0; $temp_i < $line; $temp_i++) {
                if(($check[$temp_i]==false) && ($mas_point[$temp_i]<$min_value)) {
                    $min_value = $mas_point[$temp_i];
                    $min_i = $temp_i;
                }
            }

            // Записываются новые минимальные значения для графов, связанных по ребрам от выброного ранее
            if ($min_i != $max) {
                for($temp_i = 0; $temp_i < $line; $temp_i++) {
                    if($mas[$min_i][$temp_i] > 0) {
                        $value = $min_value + $mas[$min_i][$temp_i];
                        if ($value < $mas_point[$temp_i]) {
                            $mas_point[$temp_i] = $value;
                        }
                    }
                }
                $check[$min_i] = true;
            }
        } while ($min_i < $max);

        // Создание таблицы для вывода кратчайшего расстояния до вершины
        $result = "<br><h2>Кратчайшие расстояния до вершин</h2><table><tr>";
        for($temp_i = 0; $temp_i <= $line; $temp_i++) {
            $result .= "<td class='orange'>".$temp_i."</td>";
        }
        $result .= "</tr><tr>";
        $result .= "<td class='orange'>".$start_point."</td>";
        for($temp_i = 0; $temp_i < $line; $temp_i++) {
            $result .= "<td>".$mas_point[$temp_i]."</td>";
        }
        $result .="</tr></table><br><br>";


        $end = $end_point-1;
        $weight = $mas_point[$end];
        $path[0] = $end_point;         // Массив для посещенных вершин (выводится в обратном направлении)
        $index_back = 1;
        while($end != $start_point-1) {
            for ($temp_i = 0; $temp_i < $line; $temp_i++) {
                if($mas[$temp_i][$end] != 0) {
                    $value = $weight - $mas[$temp_i][$end];
                    if($value == $mas_point[$temp_i]) {
                        $weight = $value;
                        $end = $temp_i;
                        $path[$index_back] = $temp_i +1;
                        $index_back++;
                    }
                }
            }
        }

        $index_back--;
        $result .= "<h2>Кратчайший путь</h2><table><tr>";
        for($temp_i = $index_back; $temp_i >= 0; $temp_i--) {
            $result .= "<td>".$path[$index_back]."</td>";
            if ($index_back != 0) {
                $result .= "<td class='orange'>=></td>";
            }
            $index_back--;
        }
        $result .= "</tr></table>";

        return $result;
}
?>