
Use hospital;

CREATE TABLE dischargedetails (
    Discharge_id INT PRIMARY KEY AUTO_INCREMENT,
    Patient_id INT NOT NULL,
    Patient_Name VARCHAR(200) NOT NULL,
    Patient_Email VARCHAR(100),
    Patient_Age INT NOT NULL,
    Patient_Gender VARCHAR(15) NOT NULL,
    Patient_Address VARCHAR(200) NOT NULL,
    Patient_Phoneno VARCHAR(14) NOT NULL UNIQUE,
    Patient_Addhaar VARCHAR(20),
    Patient_Disease VARCHAR(200) NOT NULL,
    Patient_Ward_type VARCHAR(15) NOT NULL,
    Patient_Room_no VARCHAR(15) NOT NULL,
    Doctor_id INT NOT NULL
);
alter table dischargedetails drop column Doctor_Name;
alter table dischargedetails add column Doctor_id int not null;
Alter Table dischargedetails change Doctor_Name Doctor_id int not null;
Insert into dischargedetails(Patient_id, Patient_Name , Patient_Email, Patient_Age ,Patient_Gender  ,
Patient_Address,Patient_Phoneno ,Patient_Addhaar, Patient_Disease,Patient_Ward_type ,Patient_Room_no, Doctor_Name) 
values (3,'Rajesh Jamwal', 'jamwal@ok.com', 34,  'Male', 'Palsikar Colony, Indore', '9876543219',
 '8724364519640874', 'Covid', 'Special', 245, 'Arun Parmar');

Insert into dischargedetails(Patient_Name , Patient_Age ,Patient_Gender  ,
Patient_Address,Patient_Phoneno , Patient_Disease,Patient_Ward_type ,Patient_Room_no) 
values ( 'Mangesh Rajawala', 54, 'Male', 'Rajwada, Indore', '6876843219', 'Malaria', 'General', 003);

Insert into dischargedetails(Patient_Name , Patient_Email, Patient_Age ,Patient_Gender  ,
Patient_Address,Patient_Phoneno , Patient_Disease,Patient_Ward_type ,Patient_Room_no) 
values ('Suresh Rathore', 'suru@ok.com',59, 'Male', 
'Baba House, Khaunaka, Surat', '8763453219', 'Dengue', 'Private', 109);

select * from dischargedetails;
-- DELETE FROM `dischargedetails` WHERE `Patient_Name` = 'Mangesh';
-- DELETE FROM `hospital`.`dischargedetails` WHERE (`Patient_id` = '1');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;











