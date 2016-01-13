<?php
$filename = $_POST['filename'];
$append   = $_POST['append'];
$data     = $_POST['data'];

$write_mode = "w";

if ( $append ) {
  $write_mode = "a";
}

// $fh  = fopen($filename, $write_mode);
$fh  = fopen($filename, "w");

// fwrite($fh, "\n" . $data);
fwrite($fh, $data);

fclose($fh);
