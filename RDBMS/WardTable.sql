Use hospital;

Create Table WardDetails(
Ward_no int primary key auto_increment,
Ward_Type varchar(50) not null,
Ward_Contact varchar(20) not null
) ;

Insert into warddetails(Ward_Type,Ward_Contact) values ('General', '0731-6789023');
Insert into warddetails(Ward_Type,Ward_Contact) values ('Private', '0731-6789045');
Insert into warddetails(Ward_Type,Ward_Contact) values ('Special', '0731-6783285');

select * from warddetails;

select count(*) from warddetails where Ward_room_type='AC';

select * from warddetails where Ward_room_type='AC';

-- DELETE FROM `hospital`.`patientdetails` WHERE (`Patient_id` = '5');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;
