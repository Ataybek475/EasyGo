<?php

 = true;
require_once dirname(__DIR__, 6) . '/interface/globals.php';

use OpenEMR\Modules\ClinicalUx\Services\OrderStatusService;
use Twig\Loader\FilesystemLoader;
use Twig\Environment;

 = new OrderStatusService();
 = (int)['authUserID'];

 = array_map(fn() => ->toArray(), ->getPendingOrdersForProvider());

 = new FilesystemLoader(dirname(__DIR__) . '/templates');
 = new Environment(, [
    'cache' => dirname(__DIR__, 2) . '/var/cache/twig',
    'auto_reload' => true,
]);

echo ->render('pages/orders.html.twig', [
    'orders' => ,
    'webroot' => ['webroot'] ?? '',
    'api_url' => ['webroot'] . '/public/api/orders.php',
]);
