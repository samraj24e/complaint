CREATE DATABASE IF NOT EXISTS smart_bus_system;
USE smart_bus_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'driver', 'passenger') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE buses (
  bus_id INT AUTO_INCREMENT PRIMARY KEY,
  bus_number VARCHAR(30) NOT NULL UNIQUE,
  capacity INT NOT NULL,
  driver_id INT NULL,
  FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE routes (
  route_id INT AUTO_INCREMENT PRIMARY KEY,
  route_name VARCHAR(100) NOT NULL,
  start_point VARCHAR(120) NOT NULL,
  end_point VARCHAR(120) NOT NULL
);

CREATE TABLE stops (
  stop_id INT AUTO_INCREMENT PRIMARY KEY,
  route_id INT NOT NULL,
  stop_name VARCHAR(120) NOT NULL,
  stop_order INT NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  FOREIGN KEY (route_id) REFERENCES routes(route_id) ON DELETE CASCADE
);

CREATE TABLE trips (
  trip_id INT AUTO_INCREMENT PRIMARY KEY,
  bus_id INT NOT NULL,
  route_id INT NOT NULL,
  status ENUM('scheduled', 'active', 'completed', 'cancelled') DEFAULT 'scheduled',
  current_lat DECIMAL(10, 7) DEFAULT 0,
  current_lng DECIMAL(10, 7) DEFAULT 0,
  started_at TIMESTAMP NULL,
  ended_at TIMESTAMP NULL,
  FOREIGN KEY (bus_id) REFERENCES buses(bus_id) ON DELETE CASCADE,
  FOREIGN KEY (route_id) REFERENCES routes(route_id) ON DELETE CASCADE
);

CREATE TABLE trip_stop_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  stop_id INT NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
  FOREIGN KEY (stop_id) REFERENCES stops(stop_id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, role) VALUES
('System Admin', 'admin@bus.com', '$2a$10$7Qn2A4MsfN2myN5kJv4QxOl0jR8kK4ObMXA3Fnv0Q8UfH0brT2j7a', 'admin'),
('Driver One', 'driver@bus.com', '$2a$10$7Qn2A4MsfN2myN5kJv4QxOl0jR8kK4ObMXA3Fnv0Q8UfH0brT2j7a', 'driver');

INSERT INTO routes (route_name, start_point, end_point) VALUES
('Route A', 'Central Station', 'Tech Park'),
('Route B', 'Airport', 'City Mall');

INSERT INTO stops (route_id, stop_name, stop_order, latitude, longitude) VALUES
(1, 'Main Square', 1, 12.9715987, 77.5945627),
(1, 'River View', 2, 12.9750000, 77.6000000),
(2, 'North Terminal', 1, 12.9900000, 77.6200000);

INSERT INTO buses (bus_number, capacity, driver_id) VALUES
('BUS-101', 50, 2),
('BUS-102', 40, NULL);
