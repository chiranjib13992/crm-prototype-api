CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Customer Details
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(20) NOT NULL,
    whatsapp_number VARCHAR(20),

    -- Travel Requirement
    destination VARCHAR(150),
    travel_start_date DATE,
    travel_end_date DATE,
    number_of_travelers INT,
    adults INT,
    children INT,
    budget DECIMAL(10,2),

    -- Lead Tracking
    lead_source VARCHAR(100),
    lead_status VARCHAR(50),

    priority ENUM('low','medium','high') DEFAULT 'medium',

    -- Sales Assignment
    assigned_to INT,
    
    -- Followup Tracking
    last_contact_date DATETIME,
    next_followup_date DATETIME,

    -- Notes
    customer_notes TEXT,
    internal_notes TEXT,

    -- System Tracking
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    created_by INT
);