CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empId VARCHAR(50) UNIQUE NOT NULL,
    fullName VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','manager','sales','support') DEFAULT 'sales',
    status ENUM('active','inactive') DEFAULT 'active',
    department_id INT,
    profileImage VARCHAR(255),
    lastLogin DATETIME,
    em_status ENUM('probation','confirmed','resigned','terminated') DEFAULT 'probation',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    CONSTRAINT fk_employee_department
    FOREIGN KEY (department_id) REFERENCES departments(id)
);