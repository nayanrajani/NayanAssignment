const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

//Sequelize
const sequelize = new Sequelize("hospital", "root", "Nayan@98digisol", {
  host: "localhost",
  dialect: "mysql",
});
console.log(__dirname);

//Users Model
const usersModel = require(path.join(__dirname, "./../models/user"))(
  sequelize,
  Sequelize.DataTypes
);

//Patient Model
const patientModel = require(path.join(
  __dirname,
  "./../models/patientdetails"
))(sequelize, Sequelize.DataTypes);

//Doctor Model
const doctorModel = require(path.join(__dirname, "./../models/doctordetails"))(
  sequelize,
  Sequelize.DataTypes
);
