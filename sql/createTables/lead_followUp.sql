CREATE TABLE lead_followups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_id INT,
    followup_type ENUM('call','whatsapp','email','meeting'),
    notes TEXT,
    next_followup DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
);