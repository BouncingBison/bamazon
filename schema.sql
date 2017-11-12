-- CREATE DATABASE spice_rack_test;

-- USE spice_rack_test;




CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	spiceName VARCHAR(100) NOT NULL,
	departmentName VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) default 0,
	stock INT default 0,
	PRIMARY KEY(id)
);



INSERT INTO products(spiceName, departmentName, price, stock) VALUES ('curry', 'spices', 10, 23);
INSERT INTO products(spiceName, departmentName, price, stock) VALUES ('white pepper', 'spices', 15, 21);
INSERT INTO products(spiceName, departmentName, price, stock) VALUES ('pink himalayan salt', 'spices', 8, 53);
INSERT INTO products(spiceName, departmentName, price, stock) VALUES ('saffron', 'rare spices', 131, 1);
INSERT INTO products(spiceName, departmentName, price, stock) VALUES ('mesquite', 'spices', 5, 100);
INSERT INTO products(spiceName, departmentName, price, stock) VALUES ('garam marsala', 'rare spices', 17, 2);
INSERT INTO products(spiceName, departmentName, price, stock) VALUES ('cumin', 'spices', 8, 34);
INSERT INTO products(spiceName, departmentName, price, stock) VALUES ('mustard seed', 'spices', 4, 18);
INSERT INTO products(spiceName, departmentName, price, stock) VALUES ('coriander', 'spices', 13, 9);
INSERT INTO products(spiceName, departmentName, price, stock) VALUES ('chili p', 'spices', 1, 100);

-- CREATE TABLE departments (
-- 	departmentId INT NOT NULL AUTO_INCREMENT,
-- 	departmentName VARCHAR(100) NOT NULL,
-- 	OverheadCost DECIMAL(10,2) NOT NULL,
-- 	TotalSales DECIMAL(10,2),
-- 	PRIMARY KEY(departmentId)
-- );

-- INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Running Shoes', 500);
-- INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Apparel', 500);
-- INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Electronics', 500);
-- INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Accessories', 500);