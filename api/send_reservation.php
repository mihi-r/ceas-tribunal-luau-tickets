<?php
error_reporting(-1);

set_include_path("./includes/");
require_once("mysqli.php");
require_once("check_file.php");
require_once("/PHPMailer/Exception.php");
require_once("/PHPMailer/PHPMailer.php");

DEFINE('BUS_WAVIER_MAX_FILE_SIZE', 6);
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
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'png' => 'image/png',
    'jpeg' => 'image/jpeg',
    'jpg' => 'image/jpeg'
);

$transaction_image_mime_types = array(
    'png' => 'image/png',
    'jpeg' => 'image/jpeg',
    'jpg' => 'image/jpeg'
);

// Initialize data validation and SQL result
if (!isset($result_data)) 
    $result_data = new stdClass();
$result_data->status = "error";
$result_data->message = "";

// Check bus wavier file
$bus_wavier_check_result = checkFile($bus_wavier, BUS_WAVIER_MAX_FILE_SIZE, $bus_wavier_mime_types);
if (!$bus_wavier_check_result->$fileSafe) {
    $result_data->message = $bus_wavier_check_result->message;
    echo json_encode($result_data);
    die();
}

// Check transaction image file
$transaction_image_check_result = checkFile($transaction_image, TRANSACTION_IMAGE_MAX_FILE_SIZE, $bus_wavier_mime_types);
if (!$transaction_image_check_result->$fileSafe) {
    $result_data->message = $transaction_image_check_result->message;
    echo json_encode($result_data);
    die();
}

// Check name
if (!preg_match("/^[\w\ \'\.]{1,128}$/", $name)) {
    $result_data->message = "Your name, " . htmlentities($name) . ", is invalid. Please only use latin characters a-z with an optional "
        . "apostrophe or period. Your name is also limited to 128 characters.";
    echo json_encode($result_data);
    die();
}

// Check phone
if(!preg_match("/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/", $phone)) {
    $result_data->message = "Your phone number, " . htmlentities($phone) . ", is invalid. Please format it in the following way: xxx-xxx-xxxx.";
    echo json_encode($result_data);
    die();
}

// Check email
if(!preg_match("/^[\w\W]+@[\w\W\d]{1,128}$/", $email)) {
    $result_data->message = "Your email, " . htmlentities($email) . ", is invalid. Please use an email in the following format: <>@<>. "
        . "Your email is also limited to 128 characters.";
    echo json_encode($result_data);
    die();
}

// Check date of birth
if(!preg_match("/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/", $date_of_birth)) {
    $result_data->message = "Your date of birth, " . htmlentities($date_of_birth) . ", is invalid. Please format it in the following way: mm/dd/yyyy.";
    echo json_encode($result_data);
    die();
}

// Get admin name and email
$admin_name = "";
$admin_email = "";

$sql = "SELECT admin_name, admin_email FROM luau_tickets_info";
$result = $mysqli->query($sql);

if ($result) {
	while ($row = $result->fetch_assoc()) {
        $admin_name = $row["admin_name"];
        $admin_email = $row['admin_email'];
        $super_email = $row['super_email'];
    }
}

if ($admin_email === "" || $admin_name === "" || $super_email === "") {
    $result_data->message = "Error occurred while retrieving admin information. Please try again. "
        . "If the error persists, email the admin in the description.";
    echo json_encode($result_data);
    die();
}

// Update student resevation data
$sql = "INSERT INTO luau_tickets_reserved (name, phone, email, date_of_birth) "
    . "VALUES ('".$name."','".$phone."','".$email."','".$date_of_birth."')";

$result = $mysqli->query($sql);

if (!result) {
    $result_data->message = "Error occurred while sending your reservation. Please try again. "
    . "If the error persists, email the admin in the description.";
    echo json_encode($result_data);
    die();
}

// Email user
$mail = new PHPMailer(true);

try {
    $mail->Subject = "Luau Tickets Reserved";

    $email_msg = "Hello " . $name . ", \n \n";
    $email_msg .= "This email is to confirm we have recieved your request to reserve Luau tickets.";
    $email_msg .= "Your transaction image will be evaluated and if we require any further information, we will contact you. \n \n";
    $email_msg .= "If you have any questions, feel free to reply back to this email. Otherwise, mark your calendar and we ";
    $email_msg .= "look forward to seeing you there! \n \n";
    $email_msg .= "Best regards, \n";
    $email_msg .= $admin_name;

    $mail->Body = $email_msg;
    $mail->setFrom($admin_email, $admin_name);
    $mail->addAddress($email, $name);
    $mail->send();
} catch (Exception $e) {
    $result_data->message = "Error occurred while sending your confirmation email. Please email the admin in the description notifying of this error.";
    echo json_encode($result_data);
    die();
}

// Email admin
$mail = new PHPMailer(true);

try {
    $mail->Subject = "Luau Tickets - Reservation Created";

    $email_msg = "Hello " . $admin_name . ", \n \n";
    $email_msg .= "A reservation has been created with the following information: \n";
    $email_msg .= "Name: " . $name . " \n";
    $email_msg .= "Phone: " . $phone . " \n";
    $email_msg .= "Email: " . $email . " \n";
    $email_msg .= "Date of birth: " . $date_of_birth . " \n \n";
    $email_msg .= "The transaction image and the bus waiver is attached to this email.";
    $email_msg .= "Please review these files to ensure that they have paid the correct amount and have completed the waiver.";
    $email_msg .= "Best regards, \n";
    $email_msg .= $super_email;

    $mail->Body = $email_msg;
    $mail->setFrom($super_email);
    $mail->addAddress($admin_email, $admin_name);

    // Attach files
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $bus_wavier["tmp_name"]);
    $mail->AddAttachment($bus_wavier["tmp_name"], $bus_wavier["name"], "base64", $mine);

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $transaction_image["tmp_name"]);
    $mail->AddAttachment($transaction_image["tmp_name"], $transaction_image["name"], "base64", $mine);

    $mail->send();
} catch (Exception $e) {
    $result_data->message = "Error occurred while sending the admin the confirmation email. Please email the admin in the description notifying of this error.";
    echo json_encode($result_data);
    die();
}

$result_data->status = "success";
echo json_encode($result_data);

mysqli_close($mysqli);
?>
