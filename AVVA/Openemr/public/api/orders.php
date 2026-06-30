<?php

 = true;
require_once dirname(__DIR__, 6) . '/interface/globals.php';

use OpenEMR\Modules\ClinicalUx\Services\OrderStatusService;

header('Content-Type: application/json');

if (empty(['authUserID'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

 = new OrderStatusService();
  = ['action'] ?? '';
  = (int)['authUserID'];

try {
    switch () {
        case 'list':
            11268 = (int)(['pid'] ?? 0);
             = array_map(fn() => ->toArray(), ->getOrdersForPatient(11268));
            echo json_encode(['orders' => ]);
            break;

        case 'pending':
             = array_map(fn() => ->toArray(), ->getPendingOrdersForProvider());
            echo json_encode(['orders' => ]);
            break;

        case 'update':
             = json_decode(file_get_contents('php://input'), true) ?: [];
            ->logTransition(
                ['order_type'] ?? 'lab',
                (int)(['order_id'] ?? 0),
                (int)(['pid'] ?? 0),
                ['status'] ?? '',
                ,
                ['notes'] ?? null
            );
            echo json_encode(['status' => 'ok']);
            break;

        default:
            http_response_code(400);
            echo json_encode(['error' => 'unknown action']);
    }
} catch (\Throwable ) {
    http_response_code(500);
    echo json_encode(['error' => ->getMessage()]);
}
