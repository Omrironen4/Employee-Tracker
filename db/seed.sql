INSERT INTO department (name)
VALUE ('Finance');
INSERT INTO department (name)
VALUE ('Marketing');
INSERT INTO department (name)
VALUE ('Management');
INSERT INTO department (name)
VALUE ('Design');


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


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Aidan', 'Hoffman', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Jeff', 'Ross', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Paulina', 'Paredes', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Juliana', 'Royce', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Louis', 'Reeves', 5, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Amanda', 'Goodman', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Corey', 'Griffith', 7, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Tomer', 'Ronen', 8, 3);


