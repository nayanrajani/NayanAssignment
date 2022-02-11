Use hospital;


Create Table DoctorDetails(
Doctor_id int primary key auto_increment,
Doctor_Name varchar(200) not null,
Doctor_Age int not null,
Doctor_Email varchar(100) unique,
Doctor_Gender  varchar(15) not null,
Doctor_Phoneno varchar(14) not null unique,
Doctor_Address varchar(200) not null,
Doctor_Addhaar varchar(20),
Doctor_type varchar(20) not null,
Doctor_Specialization varchar(50) not null,
Doctor_Charges int not null
) ;

-- alter table doctordetails modify column Doctor_type varchar(20) not null;
Insert into doctordetails(Doctor_Name ,Doctor_Age ,Doctor_Email,Doctor_Gender  ,Doctor_Phoneno,Doctor_Address, Doctor_Addhaar,Doctor_type ,Doctor_Specialization,Doctor_Charges) values ('Satish', 39, 'satish@gmail.com', 'Male', '9876578219', "Maharani Road, Circle Bangla, Indore" , '9735845027548474','Permanent', 'Skin Specialist', 500);
Insert into doctordetails(Doctor_Name ,Doctor_Age ,Doctor_Email,Doctor_Gender  ,Doctor_Phoneno,Doctor_Address, Doctor_Addhaar,Doctor_type ,Doctor_Specialization,Doctor_Charges) values ('Warela', 48, 'warela@ok.com', 'Female', '9879458219', "Chaibahgal, Powai, Navi Mumbai", '6729364857372645','Permanent', 'Hair Specialist', 800);
Insert into doctordetails(Doctor_Name ,Doctor_Age ,Doctor_Email,Doctor_Gender  ,Doctor_Phoneno,Doctor_Address, Doctor_Addhaar,Doctor_type ,Doctor_Specialization,Doctor_Charges) values ('Narendra', 24, 'modi@ok.com', 'Male', '8776578219', "Sarafa city, Bherav baba chowk, Indore",'0341846284520846','Trainee', 'Covid Trainee', 1200);
Insert into doctordetails(Doctor_Name ,Doctor_Age ,Doctor_Email,Doctor_Gender  ,Doctor_Phoneno,Doctor_Address, Doctor_Addhaar,Doctor_type ,Doctor_Specialization,Doctor_Charges) values ('Arun Parmar', 25, 'arun@gmail.com', 'Male', '9809278219', "Sarafa Road, Rajwada Circle , Indore" , '9739865027548474','Permanent', 'Heart Specialist', 5000);

select * from doctordetails;

select count(*) from DoctorDetails where Doctor_Specialization='covid trainee';

select * from DoctorDetails where Doctor_Specialization='covid trainee';

DELETE FROM `hospital`.`doctordetails` WHERE (`Doctor_id` = '1');
DELETE FROM `hospital`.`doctordetails` WHERE (`Doctor_id` = '2');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;
