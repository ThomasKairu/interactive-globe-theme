<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Load the JSON data
$jsonData = file_get_contents(__DIR__ . '/data/sample-data.json');
$locations = json_decode($jsonData, true);

$continent = isset($_GET['continent']) ? $_GET['continent'] : null;
$type = isset($_GET['type']) ? $_GET['type'] : null;

if ($continent && isset($locations[$continent])) {
    $data = $locations[$continent];
    
    // If type is specified, sort and filter by that metric
    if ($type) {
        usort($data, function($a, $b) use ($type) {
            return $b['metrics'][$type] - $a['metrics'][$type];
        });
    }
    
    echo json_encode($data);
} else {
    echo json_encode(array());
} 