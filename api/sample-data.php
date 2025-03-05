<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$continent = isset($_GET['continent']) ? $_GET['continent'] : null;
$type = isset($_GET['type']) ? $_GET['type'] : null;

// Sample office locations with metrics
$locations = array(
    'North America' => array(
        array(
            'name' => 'New York HQ',
            'lat' => 40.7128,
            'lng' => -74.0060,
            'type' => 'headquarters',
            'metrics' => array(
                'revenue' => 45000000,
                'employees' => 850,
                'market_share' => 28
            ),
            'address' => '350 Fifth Avenue, New York, NY 10118',
            'contact_info' => 'Tel: +1 212-555-0123\nEmail: ny@example.com'
        ),
        array(
            'name' => 'Tokyo Branch',
            'lat' => 35.6762,
            'lng' => 139.6503,
            'type' => 'branch',
            'metrics' => array(
                'revenue' => 32000000,
                'employees' => 380,
                'market_share' => 18
            ),
            'address' => '1-1 Marunouchi, Tokyo 100-0005',
            'contact_info' => 'Tel: +81 3-555-0125\nEmail: tokyo@example.com'
        ),
        array(
            'name' => 'Sydney Office',
            'lat' => -33.8688,
            'lng' => 151.2093,
            'type' => 'branch',
            'metrics' => array(
                'revenue' => 18000000,
                'employees' => 180,
                'market_share' => 8
            ),
            'address' => '1 Market Street, Sydney NSW 2000',
            'contact_info' => 'Tel: +61 2-555-0127\nEmail: sydney@example.com'
        )
    ),
    'Europe' => array(
        array(
            'name' => 'London Office',
            'lat' => 51.5074,
            'lng' => -0.1278,
            'type' => 'regional_office',
            'metrics' => array(
                'revenue' => 28000000,
                'employees' => 420,
                'market_share' => 15
            ),
            'address' => '30 St Mary Axe, London EC3A 8BF',
            'contact_info' => 'Tel: +44 20-555-0124\nEmail: london@example.com'
        ),
        array(
            'name' => 'Singapore Hub',
            'lat' => 1.3521,
            'lng' => 103.8198,
            'type' => 'regional_office',
            'metrics' => array(
                'revenue' => 25000000,
                'employees' => 290,
                'market_share' => 12
            ),
            'address' => '1 Raffles Place, Singapore 048616',
            'contact_info' => 'Tel: +65 6555-0126\nEmail: singapore@example.com'
        )
    ),
    // Add data for other continents...
);

if ($continent && isset($locations[$continent])) {
    $data = $locations[$continent];
    
    // If type is specified, sort and filter by that metric
    if ($type) {
        usort($data, function($a, $b) use ($type) {
            return $b['metrics'][$type] - $a['metrics'][$type];
        });
    }
    
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo json_encode(array());
} 