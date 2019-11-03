DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
   item_id  INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(6, 2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Yoga Mat", "Health & Fitness", 20.99, 24),
("iPhone", "Electronics", 699.99, 9),
("Flower Pot", "Home & Garden", 7.00, 99),
("Coasters", "Kitchen", 4.99, 150),
("Sofa", "Home Living", 479.99, 3),
("Recliner", "Home Living", 280.00, 1),
("Drone", "Electronics", 1099.98, 5),
("To Kill A Mockingbird", "books", 9.00, 6),
("20,000 Leagues Under The Sea", "books", 8.00, 5),
("Weight Bench", "Health & Fitness", 109.99, 10);

SELECT * FROM products;