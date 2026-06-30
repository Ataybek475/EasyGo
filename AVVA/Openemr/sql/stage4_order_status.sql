CREATE TABLE IF NOT EXISTS clinical_order_status_log (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_type  ENUM('lab','imaging','referral','prescription') NOT NULL,
    order_id    INT UNSIGNED NOT NULL,
    pid         INT UNSIGNED NOT NULL,
    old_status  VARCHAR(50)  DEFAULT NULL,
    
ew_status  VARCHAR(50)  NOT NULL,
    changed_by  INT UNSIGNED NOT NULL,
    changed_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
otes       TEXT         DEFAULT NULL,
    INDEX idx_pid_type (pid, order_type),
    INDEX idx_order (order_type, order_id),
    INDEX idx_changed_at (changed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
