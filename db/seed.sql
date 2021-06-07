-- derpartment seeds --
INSERT INTO department (name)
VALUE ('Finance');
INSERT INTO department (name)
VALUE ('Marketing');
INSERT INTO department (name)
VALUE ('Management');
INSERT INTO department (name)
VALUE ('Design');

-- role seeds --
INSERT INTO role (title, salary, department_id)
VALUE ('Accountant', 98000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('CFO', 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Marketing Director', 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Promotions Manager', 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Team Leader', 85000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Human Resources Director', 85000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Bike Designer', 95000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ('Bike Painter', 60000, 4);

-- employee seeds --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Aidan', 'Hoffman', 1, 101);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Aidan', 'Hoffman', 1, 101);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Aidan', 'Hoffman', 1, 101);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Aidan', 'Hoffman', 1, 101);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Aidan', 'Hoffman', 1, 101);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Aidan', 'Hoffman', 1, 101);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Aidan', 'Hoffman', 1, 101);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Aidan', 'Hoffman', 1, 101);