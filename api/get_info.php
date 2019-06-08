<?php

error_reporting(-1);

set_include_path("./includes/");
require_once("mysqli.php");

// Initialize SQL result storage
if (!isset($resultData)) 
    $resultData = new stdClass();
$resultData->status = "Fail";
$resultData->data[] = array();

$sql = "SELECT * FROM luau_tickets_info";

$result = $mysqli->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $resultData->data[] = $row;
    }
    $resultData->status = "Success";
}

echo json_encode($resultData);

mysqli_close($mysqli);
exit();
?>