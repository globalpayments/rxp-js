<?php

$referrer = $_SERVER['HTTP_REFERER'];

if (empty($_POST['hppResponse'])) {
    header('Location: ' . $referrer);
    exit();
}

$hppResponse = $originalHppResponse = $_POST['hppResponse'];

try {
    if (null === ($hppResponse = json_decode($hppResponse, true))) {
        throw new Exception();
    }

    foreach ($hppResponse as $k => $v) {
        try {
            $hppResponse[$k] = base64_decode($v);
        } catch (Exception $e) {
            /* */
        }
    }
}
catch (Exception $e) {
    $hppResponse = $originalHppResponse;
}

?><!DOCTYPE html>
<html>
<head>
    <title>HPP Demo Response</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>HPP Demo Response</h1>
    <div>
        <pre><?php print_r($hppResponse); ?></pre>
    </div>
    <div>
        <a href="<?php echo $referrer; ?>">Try Again</a>
    </div>
</body>
</html>
