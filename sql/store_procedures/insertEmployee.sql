DELIMITER $$

CREATE PROCEDURE InsertEmployee(
    IN p_empId VARCHAR(50),
    IN p_fullName VARCHAR(150),
    IN p_email VARCHAR(150),
    IN p_phone VARCHAR(20),
    IN p_password VARCHAR(255),
    IN p_role ENUM('admin','manager','sales','support'),
    IN p_status ENUM('active','inactive'),
    IN p_department VARCHAR(100),
    IN p_profileImage VARCHAR(255)
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
        profileImage
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
        p_profileImage
    );

END $$

DELIMITER ;