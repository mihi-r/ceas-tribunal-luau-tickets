<?php
error_reporting(-1);

/** 
 * Check the file size and the file type to see if it's the expected format.
 * 
 * @param array $file The file to evaluate.
 * @param int $mb_size_limit The limit of the maximum size in megabytes a file can be.
 * @param array $expected_mime_types The allowed MIME types of the files.
 * 
 * @return object A $fileCheckResult which holds the status of the check and an optional message.
*/
function checkFile($file, $mb_size_limit, $expected_mime_types) {
    if (!isset($fileCheckResult)) 
        $fileCheckResult = new stdClass();
    $fileCheckResult->fileSafe = true;
    $fileCheckResult->message = "";

    switch ($file['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            $fileCheckResult->$fileSafe = false;
            $fileCheckResult->message = 'No file sent.';
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            $fileCheckResult->$fileSafe = false;
            $fileCheckResult->message = 'Exceeded resume filesize limit of ' . $mb_size_limit . "MB.";
        default:
            $fileCheckResult->$fileSafe = false;
            $fileCheckResult->message = 'Unknown errors. Try registering again. If the problem persists, select a different resume file or contact the number in the description.';
    }
    
    // Check file size
    $b_size_limit = (2**20) * $mb_size_limit;
    if ($file['size'] > $b_size_limit) {
        $fileCheckResult->$fileSafe = false;
        $fileCheckResult->message = 'Exceeded resume filesize limit of' . $mb_size_limit . "MB.";
    }
    
    // Check file type
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $ext = array_search($finfo->file($file['tmp_name']), $expected_mime_types, true);
    if ($ext === false) {
        $fileCheckResult->$fileSafe = false;

        $fileTypes = array_keys($expected_mime_types);
        $fileTypesStr = "";

        foreach ($fileTypes as $fileType) {
            $fileTypesStr .= $fileType;
            $fileTypesStr .= ", ";
        }

        $fileTypesStr = substr($fileTypesStr, 0, -2);

        $fileCheckResult->message = 'Invalid resume file format. Please only use ' . $fileTypesStr . 'format(s).';
    }

    return $fileCheckResult;
}
?>