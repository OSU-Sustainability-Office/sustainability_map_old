<?php
/* This sends a get request to avoid cross-domain JS errors. */
$response = file_get_contents($_GET["url"]);
print($response);
?>
