CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,

    fullName VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(20) NOT NULL,
    alternativeNum VARCHAR(20),
    dob DATE,

    lead_address TEXT,
    city VARCHAR(100),
    lead_state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(20),

    companyName VARCHAR(150),
    designation VARCHAR(100),

    source VARCHAR(100) NOT NULL,
    status ENUM(
        'new',
        'contacted',
        'interested',
        'not_interested',
        'follow_up',
        'converted',
        'lost'
    ) DEFAULT 'new',

    priority ENUM('low','medium','high') DEFAULT 'medium',

    assigned_employeeid INT,

    next_followup_date DATETIME,
    last_contacted_at DATETIME,

    note TEXT,

    lead_score INT DEFAULT 0,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_lead_phone (phone),
    INDEX idx_lead_email (email),
    INDEX idx_lead_status (status),
    INDEX idx_lead_source (source),

    FOREIGN KEY (assigned_employeeid)
        REFERENCES employees(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;