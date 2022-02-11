Use hospital;

Create Table Nurse(
Nurse_id int primary key auto_increment,
Nurse_Name varchar(200) not null,
Nurse_Email varchar(100),
Nurse_Age int not null,
Nurse_Gender  varchar(15) not null ,
Nurse_Address varchar(200) not null,
Nurse_Phoneno varchar(14) not null unique,
Nurse_Addhaar varchar(20),
Nurse_Room varchar(15) not null,
Nurse_salary int not null
) ;

ALTER TABLE Nurse ADD CONSTRAINT Nurse_RoomFk FOREIGN KEY (Nurse_Room) REFERENCES roomdetails (Room_no);
Insert into Nurse(Nurse_Name , Nurse_Email, Nurse_Age ,Nurse_Gender  ,
Nurse_Address,Nurse_Phoneno ,Nurse_Addhaar, Nurse_Room,Nurse_salary) 
values ('Gauri Sharma', 'gauri@ok.com', 34,  'Female', 'Sarafa Colony, Pune', '9099843219',
 '8720999519640874', 'G1', 14000);

Insert into Nurse(Nurse_Name , Nurse_Age ,Nurse_Gender  ,
Nurse_Address,Nurse_Phoneno , Nurse_Room,Nurse_salary)  
values ( 'Simran Baweja', 44, 'Female', 'Rajwada, Indore', '8679143219', 'G2', 18000);

Insert into Nurse(Nurse_Name , Nurse_Email, Nurse_Age ,Nurse_Gender  ,
Nurse_Address,Nurse_Phoneno ,Nurse_Addhaar, Nurse_Room,Nurse_salary)  
values ('Surbhi Jeshari', 'suru@ok.com', 49, 'Female', 
'Baba House, Khaunaka, Surat', '7890453219', '7592745491645290', 'F1', 16000);

select * from Nurse;
-- DELETE FROM `hospital`.`Nurse` WHERE (`Nurse_id` = '5');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;