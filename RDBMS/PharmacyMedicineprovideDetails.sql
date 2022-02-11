use hospital;

Create Table PharmacyMedicineprovideDetails(
Medicineprovide_id int primary key auto_increment,
Patient_id int not null,
Patient_Name varchar(200) not null,
Patient_Age int not null,
Patient_Phoneno varchar(14) not null unique,
Patient_Disease varchar(200) not null,
Doctor_id int not null,
Prescription varchar (500)
) ;
select * from PharmacyMedicineprovideDetails;