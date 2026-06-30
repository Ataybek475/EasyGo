<?php

namespace OpenEMR\Modules\ClinicalUx\Dto;

class OrderStatusDto
{
    public function __construct(
        public readonly int     ,
        public readonly string  ,
        public readonly int     11268,
        public readonly string  ,
        public readonly string  ,
        public readonly string  ,
        public readonly string  ,
        public readonly ?string ,
        public readonly string  ,
    ) {
    }

    public static function fromRow(array ): self
    {
        return new self(
            orderId:     (int)['order_id'],
            orderType:   ['order_type'] ?? 'lab',
            pid:         (int)['pid'],
            patientName: trim(['patient_name'] ?? ''),
            title:       ['title'] ?? '',
            status:      ['status'] ?? 'pending',
            orderedAt:   ['ordered_at'] ?? '',
            dueDate:     ['due_date'] ?? null,
            urgency:     ['urgency'] ?? 'ok',
        );
    }

    public function toArray(): array
    {
        return [
            'order_id'     => ->orderId,
            'order_type'   => ->orderType,
            'pid'          => ->pid,
            'patient_name' => ->patientName,
            'title'        => ->title,
            'status'       => ->status,
            'ordered_at'   => ->orderedAt,
            'due_date'     => ->dueDate,
            'urgency'      => ->urgency,
        ];
    }
}
