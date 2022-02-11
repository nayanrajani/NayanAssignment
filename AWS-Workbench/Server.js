const express = require("express");
const path = require("path");

// load sequelize object Model
const { Sequelize, DataTypes } = require("sequelize");

const instance = express();
instance.use(express.urlencoded({ extended: false }));
instance.use(express.json());
// instance.use(
//   cors({
//     origin: "*",
//     allowedHeaders: "*",
//     methods: "*",
//   })
// );

// define DB COnnection using sequelize object Model
// databasename, username, password
const sequelize = new Sequelize("Company", "admin", "pass1234", {
  host: "database-nayan.cc5lfrm4xtqz.ap-southeast-1.rds.amazonaws.com", // server name
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

const DepartmentModel = require(path.join(__dirname, "./models/Department"))(
  sequelize,
  Sequelize.DataTypes
);

instance.get("/api/Department", (req, resp) => {
  // connect but do not overwrite table, {force:false}
  sequelize
    .sync({ force: false })
    .then(() => DepartmentModel.findAll()) // process the read operation (async)
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

instance.get("/api/Department/:id", (req, resp) => {
  let id = parseInt(req.params.id);
  sequelize
    .sync({ force: false })
    .then(() => DepartmentModel.findOne({ where: { DeptNo: id } }))
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

instance.post("/api/Department", (req, resp) => {
  const dept = req.body;
  sequelize
    .sync({ force: false })
    .then(() => {
      return DepartmentModel.create(dept);
    }) // insert the record and return it
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

instance.put("/api/Department/:id", (req, resp) => {
  let id = parseInt(req.params.id);
  const stu = req.body;

  sequelize
    .sync({ force: false })
    .then(() =>
      DepartmentModel.update(
        {
          DeptNo: stu.DeptNo,
          DeptName: stu.DeptName,
          Location: stu.Location,
        },
        {
          where: { DeptNo: id },
        }
      )
    )
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

instance.delete("/api/Department/:id", (req, resp) => {
  let id = parseInt(req.params.id);

  sequelize
    .sync({ force: false })
    .then(() =>
      DepartmentModel.destroy({
        where: { DeptNo: id },
      })
    )
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

instance.listen(9080, () => {
  console.log("REST APIs are on port 9081");
});
