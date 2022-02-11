Use hospital;

Create Table wardboy(
Wardboy_id int primary key auto_increment,
Wardboy_Name varchar(200) not null,
Wardboy_Email varchar(100),
Wardboy_Age int not null,
Wardboy_Gender  varchar(15) not null ,
Wardboy_Address varchar(200) not null,
Wardboy_Phoneno varchar(14) not null unique,
Wardboy_Addhaar varchar(20),
Wardboy_Ward varchar(15) not null,
Wardboy_salary int not null

) ;

ALTER TABLE wardboy ADD CONSTRAINT Wardboy_WardFk FOREIGN KEY (Wardboy_Ward) REFERENCES warddetails (Ward_Type);

-- DELETE FROM `hospital`.`wardboy` WHERE (`Wardboy_id` = '7');
Insert into wardboy(Wardboy_Name , Wardboy_Email, Wardboy_Age ,Wardboy_Gender  ,
Wardboy_Address,Wardboy_Phoneno ,Wardboy_Addhaar, Wardboy_Ward,Wardboy_salary) 
values ('Rajesh Sharma', 'rajesh@ok.com', 34,  'Male', 'Sarafa Colony, Pune', '9096543219',
 '8720944519640874', 'General', 24000);

Insert into wardboy(Wardboy_Name , Wardboy_Age ,Wardboy_Gender  ,
Wardboy_Address,Wardboy_Phoneno , Wardboy_Ward,Wardboy_salary)  
values ( 'Mangesh Baweja', 24, 'Male', 'Rajwada, Indore', '6879143219', 'Special', 28000);

Insert into wardboy(Wardboy_Name , Wardboy_Email, Wardboy_Age ,Wardboy_Gender  ,
Wardboy_Address,Wardboy_Phoneno ,Wardboy_Addhaar, Wardboy_Ward,Wardboy_salary)  
values ('Suresh Jeshari', 'suru@ok.com', 49, 'Male', 
'Baba House, Khaunaka, Surat', '8790453219', '7592745194645290', 'Local', 14000);

select * from wardboy;
-- DELETE FROM `patientdetails` WHERE `Patient_Name` = 'Mangesh';
-- DELETE FROM `hospital`.`patientdetails` WHERE (`Patient_id` = '1');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;