Create database Hospital;

Use hospital;

Create Table PatientDetails(
Patient_id int primary key auto_increment,
Patient_Name varchar(200) not null,
Patient_Email varchar(100),
Patient_Age int not null,
Patient_Gender  varchar(15) not null ,
Patient_Address varchar(200) not null,
Patient_Phoneno varchar(14) not null unique,
Patient_Addhaar varchar(20),
Patient_Disease varchar(200) not null,
Patient_Ward_type varchar(15) not null,
Patient_Room_no varchar(20) not null,
Doctor_id int not null,
Prescription varchar (500),

constraint FK_Patient_Room_no foreign key (Patient_Room_no) references roomdetails(Room_no),
constraint FK_Doctor_id foreign key (Doctor_id) references DoctorDetails(Doctor_id)
) ;

-- SELECT EMPLOYEE_ID AS "EMPLOYEE ID",
-- EMPLOYEE_NAME AS "EMPLOYEE NAME",
-- DEPT_ID AS "DEPARTMENT_ID",
-- EMPLOYEE_SAL AS "EMPLOYEE SALARY"
-- FROM EMPLOYEE_INFORMATION;

alter table patientdetails drop column Patient_Room_no ;
alter table patientdetails add column Prescription varchar (500);

ALTER TABLE PatientDetails ADD CONSTRAINT Patient_Room_noFk FOREIGN KEY (Patient_Room_no) REFERENCES roomdetails (Room_no);
-- change datatype
Alter Table patientdetails Change Doctor_Details Doctor_Name varchar(200) not null;
Alter Table patientdetails Change Patient_Room_no Patient_Room_no varchar(200) not null;

Insert into patientdetails(Patient_Name , Patient_Email, Patient_Age ,Patient_Gender  ,
Patient_Address,Patient_Phoneno ,Patient_Addhaar, Patient_Disease,Patient_Ward_type ,Patient_Room_no, Doctor_id) 
values ('Rajesh Jamwal', 'jamwal@ok.com', 34,  'Male', 'Palsikar Colony, Indore', '9876543219',
 '8724364519640874', 'Covid', 'Special', 'G1', 9);

Insert into patientdetails(Patient_Name , Patient_Age ,Patient_Gender  ,
Patient_Address,Patient_Phoneno , Patient_Disease,Patient_Ward_type ,Patient_Room_no, Doctor_id) 
values ( 'Mangesh Rajawala', 54, 'Male', 'Rajwada, Indore', '6876843219', 'Malaria', 'General', 'G2', 9);

Insert into patientdetails(Patient_Name , Patient_Email, Patient_Age ,Patient_Gender  ,
Patient_Address,Patient_Phoneno , Patient_Disease,Patient_Ward_type ,Patient_Room_no, Doctor_id) 
values ('Suresh Rathore', 'suru@ok.com',59, 'Male', 
'Baba House, Khaunaka, Surat', '8945753219', 'Dengue', 'Private', 'F2', 2);

Insert into patientdetails(Patient_Name , Patient_Email, Patient_Age ,Patient_Gender  ,
Patient_Address,Patient_Phoneno , Patient_Disease,Patient_Ward_type ,Patient_Room_no, Doctor_id) 
values ('Mangesh Rathore', 'Mangesh@ok.com', 39, 'Male', 
'okay House, mahu naka, Surat', '9045753219', 'Maleria', 'General', 'S2', 2);

select * from patientdetails;

-- DELETE FROM `patientdetails` WHERE `Patient_Name` = 'Mangesh';
-- DELETE FROM `hospital`.`patientdetails` WHERE (`Patient_id` = '1');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;





















-- foreign key (Patient_Room_no) references RoomDetails (Room_no),
-- foreign key (Doctor_Name) references DoctorDetails (Doctor_Name)

-- https://www.softwaretestinghelp.com/mysql-foreign-key-constraint/#:~:text=Answer%3A%20FOREGIN%20KEY%20can%20be%20added%2Fremoved%20using%20the,which%20would%20be%20referenced%20from%20the%20child%20table.
-- Add ForeignKey
-- ALTER TABLE PatientDetails ADD CONSTRAINT Doctor_NameFk FOREIGN KEY (Doctor_Name) REFERENCES doctordetails(Doctor_Name);
-- -- Delete ForeignKey
-- ALTER TABLE employee DROP FOREIGN KEY depIdFk;
-- Drop Column
-- Alter Table patientdetails DROP COLUMN  Staff_id;
-- -- Add Column
-- Alter Table patientdetails Add Column Staff_id int not null;






