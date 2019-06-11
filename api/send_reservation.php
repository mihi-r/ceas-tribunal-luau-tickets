<?php
error_reporting(-1);

set_include_path("./includes/");
require_once("mysqli.php");
require_once("check_file.php");
require_once("/PHPMailer/Exception.php");
require_once("/PHPMailer/PHPMailer.php");

DEFINE('BUS_WAVIER_MAX_FILE_SIZE', 2);
DEFINE('TRANSACTION_IMAGE_MAX_FILE_SIZE', 6);

$name = "";
$phone = "";
$email = "";
$date_of_birth = "";

$name = mysqli_real_escape_string($mysqli, strip_tags(trim($_POST["nameText"])));
$phone = mysqli_real_escape_string($mysqli, strip_tags(trim($_POST["phoneText"])));
$email = mysqli_real_escape_string($mysqli, strip_tags(trim($_POST["emailText"])));
$date_of_birth = mysqli_real_escape_string($mysqli, strip_tags(trim($_POST["dateOfBirthText"])));
$bus_wavier = $_FILES['busWavierFile'];
$transaction_image = $_FILES['transactionImageFile'];

$bus_wavier_mime_types = array(
    'pdf' => 'application/pdf',
    'doc' => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
);

$transaction_image_mime_types = array(
    'png' => 'image/png',
    'jpeg' => 'image/jpeg',
    'jpg' => 'image/jpeg'
);

// Initialize data validation and SQL result
if (!isset($resultData)) 
    $resultData = new stdClass();
$resultData->status = "error";
$resultData->message = "";

// Check bus wavier file
$bus_wavier_check_result = checkFile($bus_wavier, BUS_WAVIER_MAX_FILE_SIZE, $bus_wavier_mime_types);
if (!$bus_wavier_check_result->$fileSafe) {
    $resultData->message = $bus_wavier_check_result->message;
    echo json_encode($resultData);
    die();
}

// Check transaction image file
$transaction_image_check_result = checkFile($transaction_image, TRANSACTION_IMAGE_MAX_FILE_SIZE, $bus_wavier_mime_types);
if (!$transaction_image_check_result->$fileSafe) {
    $resultData->message = $transaction_image_check_result->message;
    echo json_encode($resultData);
    die();
}

// Check name
if (!preg_match("/^[\w\ \'\.]{1,128}$/", $name)) {
    $resultData->message = "Your name, " . htmlentities($name) . ", is invalid. Please only use latin characters a-z with an optional "
        . "apostrophe or period. Your name is also limited to 128 characters.";
    echo json_encode($resultData);
    die();
}

// Check phone
if(!preg_match("/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/", $phone)) {
    $resultData->message = "Your phone number, " . htmlentities($phone) . ", is invalid. Please format it in the following way: xxx-xxx-xxxx.";
    echo json_encode($resultData);
    die();
}

// Check email
if(!preg_match("/^[\w\W]+@[\w\W\d]{1,128}$/", $email)) {
    $resultData->message = "Your email, " . htmlentities($email) . ", is invalid. Please use an email in the following format: <>@<>. "
        . "Your email is also limited to 128 characters.";
    echo json_encode($resultData);
    die();
}

// Check date of birth
if(!preg_match("/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/", $date_of_birth)) {
    $resultData->message = "Your date of birth, " . htmlentities($date_of_birth) . ", is invalid. Please format it in the following way: mm/dd/yyyy.";
    echo json_encode($resultData);
    die();
}

// Get admin name and email
$adminName = "";
$adminEmail = "";
$querySuccess = false;

$sql = "SELECT admin_name, admin_email FROM luau_tickets_info";
$result = $mysqli->query($sql);

if ($result) {
	while ($row = $result->fetch_assoc()) {
        $adminName = $row["admin_name"];
        $adminEmail = $row['admin_email'];
    }
}

if ($adminEmail === "" || $adminName === "") {
    $resultData->message = "Error occurred while retrieving admin information. Please try again. "
        . "If the error persists, email the admin in the description.";
    echo json_encode($resultData);
    die();
}

// Update student resevation data
$sql = "INSERT INTO luau_tickets_reserved (name, phone, email, date_of_birth) "
    . "VALUES ('".$name."','".$phone."','".$email."','".$date_of_birth."')";

$result = $mysqli->query($sql);

if (!result) {
    $resultData->message = "Error occurred while sending your reservation. Please try again. "
    . "If the error persists, email the admin in the description.";
    echo json_encode($resultData);
    die();
}

// Email user
$mail = new PHPMailer(true);

try {
    $mail->Subject = "Luau Tickets Reserved";

    $emailMsg = "Hello " . $name . ", \n \n";
    $emailMsg .= "This email is to confirm we have recieved your request to reserve Luau tickets.";
    $emailMsg .= "Your transaction image will be evaluated and if we require any further information, we will contact you. \n \n";
    $emailMsg .= "If you have any questions, feel free to reply back to this email. Otherwise, mark your calendar and we ";
    $emailMsg .= "look forward to seeing you there! \n \n";
    $emailMsg .= "Best regards, \n";
    $emailMsg .= $adminName;

    $mail->Body = $emailMsg;
    $mail->setFrom($adminEmail, $adminName);
    $mail->addAddress($email, $name);
    $mail->send();
} catch (Exception $e) {
    $resultData->message = "Error occurred while sending your confirmation email. Please email the admin in the description notifying this error.";
    echo json_encode($resultData);
    die();
}

// Email admin
$mail = new PHPMailer(true);

try {
    $mail->Subject = "Luau Tickets - Reservation Created";

    $emailMsg = "A reservation has been created with the following information: \n";
    $emailMsg .= "Name: " . $name . " \n";
    $emailMsg .= "Phone: " . $phone . " \n";
    $emailMsg .= "Email: " . $email . " \n";
    $emailMsg .= "Date of birth: " . $date_of_birth . " \n \n";
    $emailMsg .= "The transaction image and the bus waiver is attached to this email.";

    $mail->Body = $emailMsg;
    $mail->setFrom($adminEmail, $adminName);
    $mail->addAddress($adminEmail, $adminName);

    // Attach files
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $bus_wavier["tmp_name"]);
    $mail->AddAttachment($bus_wavier["tmp_name"], $bus_wavier["name"], "base64", $mine);

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $transaction_image["tmp_name"]);
    $mail->AddAttachment($transaction_image["tmp_name"], $transaction_image["name"], "base64", $mine);

    $mail->send();
} catch (Exception $e) {
    $resultData->message = "Error occurred while sending the admin the confirmation email. Please email the admin in the description notifying this error.";
    echo json_encode($resultData);
    die();
}

$resultData->status = "success";
echo json_encode($resultData);

mysqli_close($mysqli);
?>
