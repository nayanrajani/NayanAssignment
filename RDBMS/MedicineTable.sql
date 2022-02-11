Use hospital;

CREATE TABLE MedicineDetails (
    Order_id INT PRIMARY KEY AUTO_INCREMENT,
    Medicine_id INT NOT NULL,
    Medicine_Name VARCHAR(200) NOT NULL,
    Medicine_Type VARCHAR(200) NOT NULL,
    Medicine_Manufacturer VARCHAR(200) NOT NULL,
    Medicine_manufac_date DATE,
    Medicine_expiry_date DATE,
    Medicine_Inward_date DATE,
    Medicine_price INT NOT NULL
);

select * from MedicineDetails;
-- DELETE FROM `hospital`.`patientdetails` WHERE (`Patient_id` = '5');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;
