<?php
$url = 'https://obichaite-se.com/api/daily-cron?token=I8XS82rk4Jvk06RpGA9Wcw5Lscoa5B867J7039yJqEqwUxxcsbmU7Uyuh6PdYzcA';

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_CONNECTTIMEOUT => 10,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error    = curl_error($ch);
curl_close($ch);

if ($response === false || $httpCode >= 400) {
    error_log(sprintf(
        "[%s] Cron failed (%d): %s\n",
        date('c'),
        $httpCode,
        $error ?: $response
    ));
    exit(1);
}