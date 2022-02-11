Create Table PatientMedicineDetails(
PatientMedicine_id int primary key auto_increment,
Patient_id int not null,
Patient_Name varchar(200) not null,
-- Patient_Email varchar(100),
Patient_Age int not null,
Patient_Gender  varchar(15) not null ,
-- Patient_Address varchar(200) not null,
Patient_Phoneno varchar(14) not null unique,
-- Patient_Addhaar varchar(20),
Patient_Disease varchar(200) not null,
-- Patient_Ward_type varchar(15) not null,
-- Patient_Room_no varchar(20) not null,
Doctor_id int not null,
-- Medicine_Details varchar(200),
-- Medicine_price int not null
Prescription varchar (500)
) ;
select * from PatientMedicineDetails;

alter table PatientMedicineDetails drop column Patient_Email ;
alter table PatientMedicineDetails drop column Patient_Address ;
alter table PatientMedicineDetails drop column Patient_Addhaar ;
alter table PatientMedicineDetails drop column Patient_Ward_type ;
alter table PatientMedicineDetails drop column Patient_Room_no ;
alter table PatientMedicineDetails drop column Medicine_Details ;
alter table PatientMedicineDetails drop column Medicine_price ;
alter table PatientMedicineDetails add column Prescription varchar (500);