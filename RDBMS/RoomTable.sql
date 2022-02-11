Use hospital;

Create Table RoomDetails(
-- Room_Id int not null primary key auto_increment,
Room_no varchar(20) not null primary key,
Room_type varchar(50) not null,
Room_floor varchar(100) not null,
Room_bed varchar(50) not null,
Room_charges int not null
) ;

select * from roomdetails;
Insert into RoomDetails(Room_no, Room_type, Room_floor, Room_bed, Room_charges) values ('G1', 'AC', 'Ground', 'Single-Bed', 800);
Insert into RoomDetails(Room_no, Room_type, Room_floor, Room_bed, Room_charges) values ('G2', 'Non-AC','Ground',  'Multi-Bed', 400);
Insert into RoomDetails(Room_no, Room_type, Room_floor, Room_bed, Room_charges) values ('F1', 'Non-AC', 'First', 'Multi-Bed', 400);
Insert into RoomDetails(Room_no, Room_type, Room_floor, Room_bed, Room_charges) values ('F2', 'AC', 'First', 'Single-Bed', 800);
Insert into RoomDetails(Room_no, Room_type, Room_floor, Room_bed, Room_charges) values ('S1', 'Non-AC', 'Second', 'Double-Bed', 600);
Insert into RoomDetails(Room_no, Room_type, Room_floor, Room_bed, Room_charges) values ('S2', 'Non-AC', 'Second', 'Double-Bed', 600);

-- DELETE FROM `hospital`.`patientdetails` WHERE (`Patient_id` = '5');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;
