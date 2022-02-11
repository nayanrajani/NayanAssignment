Use hospital;

CREATE TABLE BillDetails (
    Bill_no INT PRIMARY KEY AUTO_INCREMENT,
    Patient_id INT NOT NULL,
    Patient_Name VARCHAR(50) NOT NULL,
    Patient_Disease VARCHAR(100) NOT NULL,
    Doctor_id INT NOT NULL,
    Doctor_Name VARCHAR(50) NOT NULL,
    Doctor_Charges INT NOT NULL,
    Doctor_Visit INT NOT NULL,
    Patient_Room_no VARCHAR(20) NOT NULL,
    Room_charges INT NOT NULL,
    Patient_Medicine_id INT,
    Medicine_price INT,
    Order_id INT,
    Item_Total INT,
    no_of_days INT NOT NULL,
    Bill_Total INT NOT NULL,
    CONSTRAINT FK_Patient_id FOREIGN KEY (Patient_id)
        REFERENCES patientdetails (Patient_id),
    CONSTRAINT FK_PatientDoctor_id FOREIGN KEY (Doctor_id)
        REFERENCES doctordetails (Doctor_id),
    CONSTRAINT FK_Patient_Medicine_id FOREIGN KEY (Patient_Medicine_id)
        REFERENCES PatientMedicineDetails (PatientMedicine_id),
    CONSTRAINT FK_Order_id FOREIGN KEY (Order_id)
        REFERENCES CanteenDetails (Order_id)
);

select * from billdetails;

Insert into billdetails(Patient_id ,Patient_Name ,Patient_Disease,
Doctor_id, Doctor_Name  ,Doctor_Charges, Doctor_Visit,
Patient_Room_no , Room_charges,
Patient_Medicine_id, Medicine_price,
 Order_id, Item_Total ,
 no_of_days,Bill_Total) 
values 
(7, 'Priyanka Gandhi', 'Eye Problem' , 
9, 'Arun Parmar', 5000, 3,
'G2', 400 ,
12, 500, 
10, 80,
2, 16380);


-- DELETE FROM `hospital`.`patientdetails` WHERE (`Patient_id` = '5');

-- Update Query
-- Update [Table-Name] Set [Col1=value.....] Where [Condition]
-- update Department set Capcity=10 where DeptNo=50;

-- Change the COlumn NAme from 'capcity' to 'capacity'
-- Alter [Table-Name] Change [OldNAme][NewNAme] Datatype size;
-- Alter Table Department  Change Capcity Capacity int;
