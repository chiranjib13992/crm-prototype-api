DROP PROCEDURE IF EXISTS insert_user;

DELIMITER $$

CREATE PROCEDURE insert_user(
    IN p_fullname VARCHAR(150),
    IN p_email VARCHAR(150),
    IN p_phone VARCHAR(20),
    IN p_alternativenum VARCHAR(20),
    IN p_dob DATE,
    IN p_user_address TEXT,
    IN p_city VARCHAR(100),
    IN p_user_state VARCHAR(100),
    IN p_country VARCHAR(100),
    IN p_pincode VARCHAR(20),
    IN p_source VARCHAR(100),
    IN p_is_from_lead BOOLEAN,
    IN p_note TEXT,
    IN p_assigned_employeeid INT,
    IN p_user_status VARCHAR(20)
)
BEGIN

INSERT INTO users (
    fullname,
    email,
    phone,
    alternativenum,
    dob,
    user_address,
    city,
    user_state,
    country,
    pincode,
    source,
    is_from_lead,
    note,
    assigned_employeeid,
    user_status,
    createdAt,
    updatedAt
)
VALUES (
    p_fullname,
    p_email,
    p_phone,
    p_alternativenum,
    p_dob,
    p_user_address,
    p_city,
    p_user_state,
    p_country,
    p_pincode,
    p_source,
    p_is_from_lead,
    p_note,
    p_assigned_employeeid,
    p_user_status,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

END $$

DELIMITER ;