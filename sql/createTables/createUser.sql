CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(20) NOT NULL,
    alternativenum VARCHAR(20),
    dob DATE,
    
    user_address TEXT,
    city VARCHAR(100),
    user_state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(20),

    source VARCHAR(100), 
    is_from_lead BOOLEAN DEFAULT FALSE,

    note TEXT,

    assigned_employeeid INT,

    user_status ENUM('active','inactive') DEFAULT 'active',

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_user_phone (phone),
    INDEX idx_user_email (email),

    FOREIGN KEY (assigned_employeeid) REFERENCES employees(id) ON DELETE SET NULL
);