DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
   item_id  INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    product_sales DECIMAL(6, 2) NULL,
    price DECIMAL(6, 2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, product_sales, price, stock_quantity)
VALUES 
("Yoga Mat", "Health & Fitness", 0, 20.99, 24),
("iPhone", "Electronics", 0, 699.99, 9),
("Flower Pot", "Home & Garden", 0, 7.00, 99),
("Coasters", "Kitchen", 0, 4.99, 150),
("Sofa", "Home Living", 0, 479.99, 3),
("Recliner", "Home Living", 0, 280.00, 1),
("Drone", "Electronics", 0, 1099.98, 5),
("To Kill A Mockingbird", "books", 0, 9.00, 6),
("20,000 Leagues Under The Sea", "books", 0, 8.00, 5),
("Weight Bench", "Health & Fitness", 0, 109.99, 10);

SELECT * FROM products;