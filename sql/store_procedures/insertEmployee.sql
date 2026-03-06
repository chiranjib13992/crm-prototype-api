DROP PROCEDURE IF EXISTS InsertEmployee;

DELIMITER $$

CREATE PROCEDURE InsertEmployee(
    IN p_empId VARCHAR(50),
    IN p_fullName VARCHAR(150),
    IN p_email VARCHAR(150),
    IN p_phone VARCHAR(20),
    IN p_password VARCHAR(255),
    IN p_role VARCHAR(20),
    IN p_status VARCHAR(20),
    IN p_department VARCHAR(100),
    IN p_profileImage VARCHAR(255),
    IN p_lastLogin DATETIME,
    IN p_em_status VARCHAR(20)
)
BEGIN

INSERT INTO employees (
    empId,
    fullName,
    email,
    phone,
    password,
    role,
    status,
    department,
    profileImage,
    lastLogin,
    em_status
)
VALUES (
    p_empId,
    p_fullName,
    p_email,
    p_phone,
    p_password,
    p_role,
    p_status,
    p_department,
    p_profileImage,
    p_lastLogin,
    p_em_status
);

SELECT LAST_INSERT_ID() AS employeeId;

END $$

DELIMITER ;