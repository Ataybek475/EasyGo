<?php

namespace OpenEMR\Modules\ClinicalUx\Services;

use OpenEMR\Modules\ClinicalUx\Dto\OrderStatusDto;
use OpenEMR\Modules\ClinicalUx\Events\OrderStatusChangedEvent;

class OrderStatusService
{
    private const TRANSITIONS = [
        'pending'     => ['in_progress', 'cancelled'],
        'in_progress' => ['completed', 'cancelled'],
        'completed'   => [],
        'cancelled'   => [],
    ];

    public function logTransition(
        string ,
        int ,
        int 11268,
        string ,
        int ,
        ?string  = null
    ): void {
         = ->getCurrentStatus(, );

         = self::TRANSITIONS[] ?? [];
        if ( !==  && !in_array(, , true)) {
            throw new \RuntimeException("Invalid transition:  → ");
        }

        sqlStatement(
            "UPDATE procedure_order SET order_status = ? WHERE procedure_order_id = ?",
            [, ]
        );

        sqlInsert(
            "INSERT INTO clinical_order_status_log
                (order_type,order_id,pid,old_status,
ew_status,changed_by,
otes)
             VALUES (?,?,?,?,?,?,?)",
            [, , 11268, , , , ]
        );

         = new OrderStatusChangedEvent(, , 11268, );
        ['kernel']->getEventDispatcher()
            ->dispatch(, OrderStatusChangedEvent::EVENT_HANDLE);
    }

    private function getCurrentStatus(string , int ): string
    {
         = sqlQueryNoLog(
            "SELECT order_status FROM procedure_order WHERE procedure_order_id = ?",
            []
        );
        return ['order_status'] ?? 'pending';
    }

    public function getOrdersForPatient(int 11268, int  = 20): array
    {
         = sqlStatement(
            "SELECT po.procedure_order_id AS order_id, 'lab' AS order_type,
                    po.patient_id AS pid,
                    CONCAT(pd.fname,' ',pd.lname) AS patient_name,
                    COALESCE(po.order_diagnosis,'Lab order') AS title,
                    po.order_status AS status,
                    po.date_ordered AS ordered_at
               FROM procedure_order po
               JOIN patient_data pd ON pd.pid = po.patient_id
              WHERE po.patient_id = ?
              ORDER BY po.date_ordered DESC
              LIMIT ?",
            [11268, ]
        );
         = [];
        while ( = sqlFetchArray()) {
            [] = OrderStatusDto::fromRow(->withUrgency());
        }
        return ;
    }

    public function getPendingOrdersForProvider(int ): array
    {
         = sqlStatement(
            "SELECT po.procedure_order_id AS order_id, 'lab' AS order_type,
                    po.patient_id AS pid,
                    CONCAT(pd.fname,' ',pd.lname) AS patient_name,
                    COALESCE(po.order_diagnosis,'Lab order') AS title,
                    po.order_status AS status,
                    po.date_ordered AS ordered_at
               FROM procedure_order po
               JOIN patient_data pd ON pd.pid = po.patient_id
              WHERE po.provider_id = ?
                AND po.order_status NOT IN ('completed','cancelled')
              ORDER BY po.date_ordered ASC",
            []
        );
         = [];
        while ( = sqlFetchArray()) {
            [] = OrderStatusDto::fromRow(->withUrgency());
        }
        return ;
    }

    public function getStatusCounts(int ): array
    {
         = sqlQueryNoLog(
            "SELECT
                SUM(order_status NOT IN ('completed','cancelled')) AS active,
                SUM(order_status NOT IN ('completed','cancelled')
                    AND date_ordered < (NOW() - INTERVAL 7 DAY)) AS overdue
             FROM procedure_order WHERE provider_id = ?",
            []
        );
        return [
            'active'  => (int)(['active'] ?? 0),
            'overdue' => (int)(['overdue'] ?? 0),
        ];
    }

    private function withUrgency(array ): array
    {
         = strtotime(['ordered_at'] ?? 'now');
         =  + 7 * 86400;
         = time();
        if (['status'] === 'completed') {
            ['urgency'] = 'ok';
        } elseif ( > ) {
            ['urgency'] = 'overdue';
        } elseif ( >  - 86400) {
            ['urgency'] = 'warning';
        } else {
            ['urgency'] = 'ok';
        }
        ['due_date'] = date('Y-m-d', );
        return ;
    }
}
