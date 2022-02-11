Use hospital;

create Table CanteenDetails(
Order_id int primary key auto_increment,
Item_id int not null,
Item_name varchar(200) not null,
Item_Buyer varchar(200) not null,
Item_Total int not null
) ;

select * from CanteenDetails;
Alter Table CanteenDetails  Change Item_price Item_Buyer varchar(200);

-- DELETE FROM `hospital`.`patientdetails` WHERE (`Patient_id` = '5');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;
