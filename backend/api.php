<?php

require_once __DIR__ . '/src/Basket.php';
use AcmeWidgetCo\Basket;

// Enable CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Product catalog
$products = [
    ['code' => 'R01', 'name' => 'Red Widget', 'price' => 32.95],
    ['code' => 'G01', 'name' => 'Green Widget', 'price' => 24.95],
    ['code' => 'B01', 'name' => 'Blue Widget', 'price' => 7.95],
];

// Delivery rules
$deliveryRules = [
    ['minAmount' => 0, 'maxAmount' => 50, 'cost' => 4.95],
    ['minAmount' => 50, 'maxAmount' => 90, 'cost' => 2.95],
    ['minAmount' => 90, 'maxAmount' => PHP_FLOAT_MAX, 'cost' => 0],
];

// Special offers
$offers = [
    ['type' => 'buy_one_get_second_half_price', 'productCode' => 'R01'],
];

try {
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    
    // Simple router
    if (strpos($requestPath, '/api/products') !== false && $requestMethod === 'GET') {
        echo json_encode([
            'success' => true,
            'products' => $products,
            'deliveryRules' => $deliveryRules,
            'offers' => $offers
        ]);
    } 
    
    else {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Endpoint not found']);
    }
} 
catch (\Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
