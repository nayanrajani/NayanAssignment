-- create database
Create Database Company;

Use Company;

Create Table Department(
	DeptNo int Primary Key,
    DeptName varchar(200)  Not Null,
    Location varchar(200) Not Null
) ;

Insert into Department values (40, 'Okay', 'Indore');
Insert into Department values (10, 'IT', 'Pune');
Insert into Department values (20, 'HRD', 'Pune');
Insert into Department values (30, 'SALES', 'Pune');

select * from Department;