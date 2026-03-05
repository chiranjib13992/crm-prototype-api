DELIMITER $$

CREATE PROCEDURE InsertLead(
    IN p_fullName VARCHAR(150),
    IN p_email VARCHAR(150),
    IN p_phone VARCHAR(20),
    IN p_alternativeNum VARCHAR(20),
    IN p_dob DATE,

    IN p_lead_address TEXT,
    IN p_city VARCHAR(100),
    IN p_lead_state VARCHAR(100),
    IN p_country VARCHAR(100),
    IN p_pincode VARCHAR(20),

    IN p_companyName VARCHAR(150),
    IN p_designation VARCHAR(100),

    IN p_source VARCHAR(100),
    IN p_status ENUM(
        'new',
        'contacted',
        'interested',
        'not_interested',
        'follow_up',
        'converted',
        'lost'
    ),

    IN p_priority ENUM('low','medium','high'),

    IN p_assigned_employeeid INT,

    IN p_next_followup_date DATETIME,
    IN p_last_contacted_at DATETIME,

    IN p_note TEXT,
    IN p_lead_score INT
)
BEGIN

    INSERT INTO leads (
        fullName,
        email,
        phone,
        alternativeNum,
        dob,
        lead_address,
        city,
        lead_state,
        country,
        pincode,
        companyName,
        designation,
        source,
        status,
        priority,
        assigned_employeeid,
        next_followup_date,
        last_contacted_at,
        note,
        lead_score
    )
    VALUES (
        p_fullName,
        p_email,
        p_phone,
        p_alternativeNum,
        p_dob,
        p_lead_address,
        p_city,
        p_lead_state,
        p_country,
        p_pincode,
        p_companyName,
        p_designation,
        p_source,
        p_status,
        p_priority,
        p_assigned_employeeid,
        p_next_followup_date,
        p_last_contacted_at,
        p_note,
        p_lead_score
    );

END $$

DELIMITER ;