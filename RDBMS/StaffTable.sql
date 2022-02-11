Use hospital;

create Table StaffDetails(
Staff_id int primary key auto_increment,
Staff_Designation varchar(50) not null,
Staff_Name varchar(200) not null,
Staff_Age int not null,
Staff_Email varchar(100) unique,
Staff_Gender  varchar(15) not null,
Staff_Phoneno varchar(14) not null unique,
Staff_Address varchar(200) not null,
Staff_Addhaar varchar(20),
-- Staff_Type varchar(30),
-- Staff_Ward varchar(30),
-- Staff_Room varchar(30),
-- Staff_Specialization varchar(30),
Staff_Salary varchar(20) not null
) ;

select * from StaffDetails;
alter table StaffDetails modify column Staff_Email varchar(20) null;
-- DELETE FROM `hospital`.`patientdetails` WHERE (`Patient_id` = '5');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;
