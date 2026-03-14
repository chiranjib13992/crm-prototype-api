DROP PROCEDURE IF EXISTS InsertLead;

DELIMITER $$

CREATE PROCEDURE InsertLead(
    IN p_full_name VARCHAR(150),
    IN p_email VARCHAR(150),
    IN p_phone VARCHAR(20),
    IN p_whatsapp_number VARCHAR(20),
    IN p_destination VARCHAR(150),
    IN p_travel_start_date DATE,
    IN p_travel_end_date DATE,
    IN p_number_of_travelers INT,
    IN p_adults INT,
    IN p_children INT,
    IN p_budget DECIMAL(10,2),
    IN p_lead_source VARCHAR(100),
    IN p_lead_status VARCHAR(50),
    IN p_priority ENUM('low','medium','high'),
    IN p_assigned_to INT,
    IN p_last_contact_date DATETIME,
    IN p_next_followup_date DATETIME,
    IN p_customer_notes TEXT,
    IN p_internal_notes TEXT,
    IN p_created_by INT,
    IN p_updatedBy INT
)
BEGIN

INSERT INTO leads (
    full_name,
    email,
    phone,
    whatsapp_number,
    destination,
    travel_start_date,
    travel_end_date,
    number_of_travelers,
    adults,
    children,
    budget,
    lead_source,
    lead_status,
    priority,
    assigned_to,
    last_contact_date,
    next_followup_date,
    customer_notes,
    internal_notes,
    created_by,
    updatedBy
)
VALUES (
    p_full_name,
    p_email,
    p_phone,
    p_whatsapp_number,
    p_destination,
    p_travel_start_date,
    p_travel_end_date,
    p_number_of_travelers,
    p_adults,
    p_children,
    p_budget,
    p_lead_source,
    p_lead_status,
    p_priority,
    p_assigned_to,
    p_last_contact_date,
    p_next_followup_date,
    p_customer_notes,
    p_internal_notes,
    p_created_by,
    p_updatedBy
);

END $$

DELIMITER ;