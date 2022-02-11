use hospital;

Create Table PatientDoctorTable(
PD_ID int primary key,
Doctor_id int not null,
Doctor_Name varchar(200) not null,
Patient_id int not null,
Patient_Name varchar(200) not null,

-- constraint FK_Doctor_id  -- COnstraint Name,
foreign key (Doctor_id) references DoctorDetails (Doctor_id)

-- constraint FK_Doctor_Name  -- COnstraint Name,
-- foreign key (Doctor_Name) references DoctorDetails (Doctor_Name),

-- constraint FK_Patient_id  -- COnstraint Name,
-- foreign key (Patient_id) references PatientDetails (Patient_id),

-- constraint FK_Patient_Name  -- COnstraint Name,
-- foreign key (Patient_Name) references PatientDetails (Patient_Name)

) ;

-- DELETE FROM `hospital`.`patientdetails` WHERE (`Patient_id` = '5');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;
