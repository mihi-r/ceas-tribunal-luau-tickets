<?php
error_reporting(-1);

set_include_path("./includes/");
require_once("mysqli.php");

// Initialize SQL result storage
if (!isset($resultData)) 
    $resultData = new stdClass();
$resultData->status = "error";
$resultData->data[] = array();

$sql = "SELECT description, price, venmo_recipient FROM luau_tickets_info";

$result = $mysqli->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $resultData->data[] = $row;
    }
    $resultData->status = "success";
}

echo json_encode($resultData);

mysqli_close($mysqli);
?>