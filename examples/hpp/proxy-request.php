<?php

$json = file_get_contents('https://dev.rlxcarts.com/mobileSDKs/request.php');
$data = json_decode($json);

$response = array();
foreach ($data as $key => $value) {
  $response[$key] = base64_decode($value);
}

echo json_encode($response);
