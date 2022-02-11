const { Sequelize, DataTypes } = require("sequelize");
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

//Medicineprovide Model
const pharmacymedicineprovidedetailsModel = require(path.join(
  __dirname,
  "./../models/pharmacymedicineprovidedetails"
))(sequelize, Sequelize.DataTypes);

class PharmacymedicineprovidedetailsLogic {
  // Medicineprovide API Key----------------------------------------------------------------
  async getpharmacymedicineprovidedetailsData(req, resp) {
    if (req.headers.authorization !== undefined) {
      let receivedToken = req.headers.authorization.split(" ")[1];

      let t = verToken.validateToken(receivedToken);
      if (!t) {
        return resp.status(401).send({
          response: `Authorization Failed!!`,
        });
      }
      req.decode = decode;
      await sequelize.sync({ force: false });
      let data = await pharmacymedicineprovidedetailsModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `Authorization failed, May be there is a problem with Network!!`,
      });
    }
  }


  async getpharmacymedicineprovidedetailsDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await pharmacymedicineprovidedetailsModel.findOne({ where: { Patient_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Medicineprovide- ${id} is not present, add new Medicineprovide` });
  }

  async getpharmacymedicineprovidedetailsDatabyPatientID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await pharmacymedicineprovidedetailsModel.findOne({ where: { Patient_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Medicineprovide-${id} is not present, add new Medicineprovide` });
  }

  async putpharmacymedicineprovidedetailsData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await pharmacymedicineprovidedetailsModel.update(
      {
        Medicineprovide_id: pro.Medicineprovide_id,
        Patient_id: pro.Patient_id,
        Patient_Name: pro.Patient_Name,
        Patient_Age: pro.Patient_Age,
        Patient_Phoneno: pro.Patient_Phoneno,
        Patient_Disease: pro.Patient_Disease,
        Doctor_id: pro.Doctor_id,
        Prescription :pro.Prescription,
      },
      {
        where: { Medicineprovide_id: id },
      }
    );
    if (row) {
      return resp.status(200).send({
        // message: "Data is Read Successfully",
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Medicineprovide-${id} is not present, add new Medicineprovide` });
  }

  async AddpharmacymedicineprovidedetailsData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = pharmacymedicineprovidedetailsModel
      .create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp.status(200).send(JSON.stringify("Medicineprovide Added!!"));
      })
      .catch((err) => {
        return resp.status(500).send(`We got Some Error: ${err.message}`);
      });
  }

  async DeletepharmacymedicineprovidedetailsData(req, resp) {
    let id = parseInt(req.params.id);
    await sequelize
      .sync({ force: false })
      .then(() =>
      pharmacymedicineprovidedetailsModel.destroy({
          where: { Medicineprovide_id: id },
        })
      )
      .then((data) => {
        resp.status(200).send({
          message: "Medicineprovide Data is Deleted!!!",
          rows: data,
        });
      })
      .catch((error) => {
        resp.status(500).send({
          message: `We got some Error!!: ${error.message}`,
        });
      });
  }
}
module.exports = PharmacymedicineprovidedetailsLogic;
