<?php

$json = file_get_contents('https://dev.rlxcarts.com/mobileSDKsV2/request.php');
error_log('received: ' . $json);

$data = json_decode($json);

$response = array();
foreach ($data as $key => $value) {
    if (!$value) {
        continue;
    }
    $response[$key] = $value;
}

$response["HPP_POST_RESPONSE"] = $_SERVER["HTTP_REFERER"];
unset($response["HPP_VERSION"]);

$jsonResponse = json_encode($response);

error_log('sending: ' . $jsonResponse);
echo $jsonResponse;
