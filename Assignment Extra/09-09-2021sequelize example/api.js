const express = require("express");
const cors = require("cors");
const path = require("path");

// load sequelize object Model
const Sequelize = require("sequelize");

const instance = express();
instance.use(express.urlencoded({ extended: false }));
instance.use(express.json());
instance.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
  })
);

// define DB COnnection using sequelize object Model
// databasename, username, password
const sequelize = new Sequelize("hospital", "root", "Nayan@98digisol", {
  host: "localhost", // server name
  dialect: "mysql", // database provider
  pool: {
    min: 0, // connection pool with min number of connection objects
    max: 5, // connect pool for max. number of connection object
    idle: 10000, // wait for 10 mins for database to respond for a connection, else get disconnected from database
  },
  define: {
    timestamps: false, // the autom generated value for a table row when new row is created. This is used for conncurrentcy Management
  },
});

// lets map with the table
// map each property from Department.js with the Department Table
// using the sequelize object defined above to connect to database
// Also make sure that DataTypes used by Department.js must map
// with datatypes for Columns in table

const deptModel = require(path.join(__dirname, "/models/patientdetails"))(
  sequelize,
  Sequelize.DataTypes
);

// simple route
instance.get("/", (req, res) => {
    // res.json({ message: "Welcome to Sequelize Crud application." });
    res.sendFile(__dirname + '/index.html');
  });

// Lets the Fun Begin of Sequelize with REST APIs

instance.get("/api/patientdetails", (req, resp) => {
  // connect but do not overwrite table, {force:false}
  sequelize
    .sync({ force: false })
    .then(() => deptModel.findAll()) // process the read operation (async)
    .then((data) => {
      // data: is the result set return after the  'select' query executed
      resp.status(200).send({
        message: "Data is Read Successfully",
        rowCount: data.length,
        rows: data,
      });
    }) // Collect the data using the sequence of Promise objects (if previous is successful then execute the next then() in sequence)
    .catch((error) => {
      resp
        .status(500) // internal server error
        .send({ message: "Some Error Occured", errorDetails: error.message });
    });
});

instance.get("/api/patientdetails/:id", (req, resp) => {
    let id = parseInt(req.params.id);
    sequelize
    .sync({ force: false })
    .then(() => deptModel.findOne({where:{Patient_id:id}}))  
    .then((data) => {
      resp.status(200).send({
        message: "Data is Read Successfully",
        rowCount: data.length,
        rows: data,
      });
    })  
    .catch((error) => {
      resp
        .status(500)  
        .send({ message: "Some Error Occured", errorDetails: error.message });
    });
});

instance.post("/api/patientdetails", (req, resp) => {
    const dept  = req.body;
    sequelize
    .sync({ force: false })
    .then(() => {return deptModel.create(dept);})   // insert the record and return it
    .then((data) => {
      resp.status(200).send({
        message: "Data is Added Successfully",
        rows: data,
      });
    })  
    .catch((error) => {
      resp
        .status(500)  
        .send({ message: "Some Error Occured", errorDetails: error.message });
    });
});

instance.put("/api/patientdetails/:id", (req, resp) => {
    let id = parseInt(req.params.id);
    const dept  = req.body;
    
    sequelize
    .sync({ force: false })
    .then(() => deptModel.update({
      Patient_Name: dept.Patient_Name,
      Patient_Age: dept.Patient_Age,
      Patient_Address: dept.Patient_Address,
      Patient_Phoneno: dept.Patient_Phoneno,
      Patient_Disease:dept.Patient_Disease,
      Patient_Patient_type: dept.Patient_Patient_type,
      Patient_Ward_type: dept.Patient_Ward_type,
      Patient_Room_no: dept.Patient_Room_no,
       
        // DeptName:dept.DeptName,
        // Location: dept.Location,
        // Capacity:dept.Capacity
    },{
        where:{Patient_id:id}
    }))
    .then((data) => {
      resp.status(200).send({
        message: "Data is Updated Successfully",
        rows: data,
      });
    })  
    .catch((error) => {
      resp
        .status(500)  
        .send({ message: "Some Error Occured", errorDetails: error.message });
    });   

});

instance.delete("/api/patientdetails/:id", (req, resp) => {

    let id = parseInt(req.params.id);
   
    
    sequelize
    .sync({ force: false })
    .then(() => deptModel.destroy({
        where:{Patient_id:id}
    }))
    .then((data) => {
      resp.status(200).send({
        message: "Data is Deleted Successfully",
        rows: data,
      });
    })  
    .catch((error) => {
      resp
        .status(500)  
        .send({ message: "Some Error Occured", errorDetails: error.message });
    });

});

instance.listen(9081, () => {
  console.log("REST APIs are on poty 9081");
});
