CREATE DATABASE IF NOT EXISTS bloodbank;
USE bloodbank;

CREATE TABLE donors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  blood_group VARCHAR(5) NOT NULL,
  contact VARCHAR(15),
  location VARCHAR(255)
);

CREATE TABLE requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(100) NOT NULL,
  hospital VARCHAR(255) NOT NULL,
  blood_group VARCHAR(5) NOT NULL,
  quantity INT NOT NULL,
  contact VARCHAR(15),
  status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending'
);

CREATE TABLE blood_stock (
  blood_group VARCHAR(5) PRIMARY KEY,
  quantity INT NOT NULL DEFAULT 0
);

INSERT INTO blood_stock (blood_group, quantity) VALUES
('A+', 0), ('A-', 0), ('B+', 0), ('B-', 0),
('AB+', 0), ('AB-', 0), ('O+', 0), ('O-', 0);

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Password: admin123
INSERT INTO admins (username, password) VALUES ('admin', 'admin123');