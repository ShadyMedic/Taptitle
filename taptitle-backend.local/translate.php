<?php

const TARGET_URL = 'https://api-free.deepl.com/v2/translate';
const API_KEY = 'SECRET';
const USER_AGENT = 'Taptitle/0.0.1';

######################################################################

function logMessage($message) {
    file_put_contents('backend.log', $message.PHP_EOL, FILE_APPEND);
}

######################################################################

if (!empty($_GET)) {
    logMessage('Reading from GET variables');
    $word = $_GET['text'];
    $targetLang = $_GET['target_lang'];
} else {
    logMessage('Reading from POST variables');
    $word = $_POST['text'];
    $targetLang = $_POST['target_lang'];
}

logMessage('Forwarding request to translate '.$word.' to language with code '.$targetLang);

$curl = curl_init(TARGET_URL);
curl_setopt($curl, CURLOPT_URL, TARGET_URL);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$headers = array(
    'User-Agent: '.USER_AGENT,
    'Authorization: DeepL-Auth-Key '.API_KEY,
    'Content-Type: application/x-www-form-urlencoded',
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$data = "text=$word&target_lang=$targetLang";
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

$response = curl_exec($curl);
curl_close($curl);

header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
logMessage($response);
logMessage('##########');
echo $response;
