<?php
$file = "invalid-combinations.txt";

$data = $_POST['data'];

$fh  = fopen($file, 'a');

// $old  = file_get_contents($file);
// $new  = $old . "\n" . $data;
// fwrite($fh, $new);

fwrite($fh, "\n" . $data);

fclose($fh);