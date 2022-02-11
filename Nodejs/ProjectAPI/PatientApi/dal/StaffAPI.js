const { Sequelize, DataTypes, where } = require("sequelize");
const path = require("path");
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");
const verifyToken = require("../Constants/TokenVerification");
verToken = new verifyToken();

//Sequelize
const sequelize = new Sequelize("hospital", "root", "Nayan@98digisol", {
  host: "localhost",
  dialect: "mysql",
});
console.log(__dirname);

//Bill Model
const StaffModel = require(path.join(__dirname, "./../models/staffdetails"))(
  sequelize,
  Sequelize.DataTypes
);

class StaffLogic {
  async getStaffData(req, resp) {
    if (req.headers.authorization !== undefined) {
      let receivedToken = req.headers.authorization.split(" ")[1];

      let t = verToken.validateToken(receivedToken);
      if (!t) {
        return resp.status(401).send({
          response: `Authorization failed, you are not the User`,
        });
      }
      req.decode = decode;
      await sequelize.sync({ force: false });
      let data = await StaffModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `Authorization failed, May be there is a problem with Network!!`,
      });
    }
  }

  async getStaffDoctorData(req, resp) {
    if (req.headers.authorization !== undefined) {
      let receivedToken = req.headers.authorization.split(" ")[1];

      let t = verToken.validateToken(receivedToken);
      if (!t) {
        return resp.status(401).send({
          response: `AUthorization failed Now`,
        });
      }
      req.decode = decode;
      await sequelize.sync({ force: false });
      let data = await StaffModel.findAll({
        where: { Staff_Designation: "Doctor" },
      });

      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `AUthorization failed, no AUTHORIZATION header present in the request`,
      });
    }
  }

  async AddStaffData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = StaffModel.create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp.status(200).send(JSON.stringify("Staff added!!"));
      })
      .catch((err) => {
        return resp.status(500).send(`We got Some Error: ${err.message}`);
      });
  }
}
module.exports = StaffLogic;
