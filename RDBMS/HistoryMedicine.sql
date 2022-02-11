use hospital;

Create Table HistoryPharmacy(
HistoryPharmacy_id int primary key auto_increment,
Medicineorder_id int not null,
Patient_id int not null,
Patient_Name varchar(200) not null,
Patient_Age int not null,
Patient_Phoneno varchar(14) not null unique,
Patient_Disease varchar(200) not null,
Doctor_id int not null,
Prescription varchar (500),
MedicinePrice int not null,
PaymentReceived varchar(20)
) ;
select * from HistoryPharmacy;