<?php

namespace OpenEMR\Modules\ClinicalUx\Events;

use Symfony\Contracts\EventDispatcher\Event;

class OrderStatusChangedEvent extends Event
{
    public const EVENT_HANDLE = 'clinical_ux.order_status_changed';

    public function __construct(
        public readonly string ,
        public readonly int    ,
        public readonly int    11268,
        public readonly string ,
    ) {
        // DO NOT call parent::__construct() — breaks on PHP 8.4
    }
}
