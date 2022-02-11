-- create database
Create Database Company;

-- Create Database Tutorial;

-- use the database for the Transactions of Other commands e.g. CReating TAble
Use hospital;

-- Add Tables in Database
Create Table Department(
	DeptNo int Primary Key,
    DerptName varchar(200)  Not Null,
    Location varchar(200) Not Null
) ;

-- Alter the table and add column in it
Alter Table Department Add Column Capcity int not null;

ALTER TABLE Department RENAME COLUMN DerptName TO DeptName;
-- ALTER TABLE DerptName RENAME DeptName;

-- read all records from Table
select * from Department;
select * from employee;
select * from user;
select * from patientdetails;


-- Insert data in Department Table
Insert into Department values (10, 'IT', 'Pune', 100);
Insert into Department values (20, 'HRD', 'Pune', 20);
Insert into Department values (30, 'SALES', 'Pune', 20);
Insert into Department values (40, 'ACCOUNTING', 'Pune', 3);
Insert into Department values (50, 'ADMIN', 'Pune', 3);

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
Alter Table Department  Change Capcity Capacity int;

-- Create another Table with the FOreign Key

Create Table Employee(
  EmpNo int Primary Key,
  EmpName varchar(400) not null,
  Designation varchar(300) not null,
  Salary int Not null,
  DeptNo int not null,
  constraint FK_DEPTNO  -- COnstraint Name
			-- [ColumnName-of-Current-TAble] references [Parent-Table] (Column-Name-Form-Parent-Table)
  foreign key (DeptNo) references Department (DeptNo)
);

-- INsert the data in Employee Table
insert into employee Value (101, 'Mahesh', 'Director', 123333, 10);
-- The following statemenet will throw error because teh Foreign Key Value for
-- DeptNo as 100 is not present in Department table
-- Refertential Integrity COnstraint execution
insert into employee Value (102, 'Mahesh', 'Director', 123333, 100);
use hospital;
select * from user;
select * from userinrole;
select * from department;
select * from doctordetails;


-- Users Tablle with Unique COnstraint
use company;
select * from department;
create table User(
  UserId int Primary Key,
  UserName varchar(100) unique not null,
  PAssword varchar(50) not null
);

select * from user;

insert into user values(1, 'mahesh@msit.com', 'Pas@123');
-- Following statrement will geberate error becuase Unique Key for UserName value is already present 
-- insert into Users values(2, 'mahesh@msit.com', 'Pas@321');















