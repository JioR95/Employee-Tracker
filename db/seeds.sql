INSERT INTO departments (name) VALUES
('Law'),
('Engineering'),
('Sales'),
('Customer Service'),
('Development');

INSERT INTO roles (title, salary, department_id) VALUES
('Lawyer', 20000, 1),
('Engineer', 50000, 2),
('Software Egineer', 70000, 3),
('Sales Lead',6000, 2),
('Front Desk', 40000, 3),
('Web Developer', 75000, 4);

INSERT INTO employees (first_name, last_name, role_id) VALUES
('Kim', 'Santos', 1),
('James', 'Spike', 3),
('Michael', 'Jones', 2),
('Jason', 'Phillips', 4),
('Ashley', 'Ortiz' 2),
('Jeremy', 'Scott' 1),
('Gary', 'Mullet', 3),
('Mary', 'Ellens', 4);