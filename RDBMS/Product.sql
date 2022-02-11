Create database product;

Use product;
Use company;
select * from department;
select * from employee;


Create Table productDetails(
product_id int primary key auto_increment,
product_name varchar(200) not null,
product_category  varchar(100) not null,
product_Manufacturing varchar(100) not null,
Product_price int not null CHECK (Product_price >= 0)
);

Insert into productDetails(product_name ,product_category ,product_Manufacturing  ,Product_price) values ('Laptop', 'Electronics', 'HP', '23000');

Insert into productDetails(product_name ,product_category ,product_Manufacturing  ,Product_price) values ('J7 Max', 'Electronics', 'Samsung', '17000');

Insert into productDetails(product_name ,product_category ,product_Manufacturing  ,Product_price) values ('Mouse', 'Electronics', 'Logitech', '700');

Insert into productDetails(product_name ,product_category ,product_Manufacturing  ,Product_price) values ('Wire', 'Electrical', 'Havells', '250');

Insert into productDetails(product_name ,product_category ,product_Manufacturing  ,Product_price) values ('Sonet', 'Vehicle', 'Kia', '1200000');

select * from productDetails;
select * from userdetails;

Create Table userdetails(
user_name varchar(200) not null primary key,
pass_word  varchar(100) not null
);

Insert into userdetails(user_name ,pass_word) values ('nayan.rajani@blazeclan.com', 'pass@12345');


CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

select * from accounts;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;