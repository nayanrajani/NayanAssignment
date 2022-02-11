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

//Medicineorder Model
const MedicineissueModel = require(path.join(
  __dirname,
  "./../models/medicineissuedetails"
))(sequelize, Sequelize.DataTypes);

class MedicineIssueDetailsLogic {
  // Medicineorder API Key----------------------------------------------------------------
  async getmedicineissuedetailsData(req, resp) {
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
      let data = await MedicineissueModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `Authorization failed, May be there is a problem with Network!!`,
      });
    }
  }


  async getmedicineissuedetailsDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await MedicineissueModel.findOne({ where: { Patient_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Medicineorder- ${id} is not present, add new Medicineorder` });
  }

  async getmedicineissuedetailsDatabyPatientID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await MedicineissueModel.findOne({ where: { Patient_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Medicineorder-${id} is not present, add new Medicineorder` });
  }

  async putmedicineissuedetailsData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await MedicineissueModel.update(
      {
        Medicineorder_id:pro.Medicineorder_id,
        Medicineprovide_id: pro.Medicineprovide_id,
        Patient_id: pro.Patient_id,
        Patient_Name: pro.Patient_Name,
        Patient_Age: pro.Patient_Age,
        Patient_Phoneno: pro.Patient_Phoneno,
        Patient_Disease: pro.Patient_Disease,
        Doctor_id: pro.Doctor_id,
        Prescription :pro.Prescription,
        MedicineDetails:pro.MedicineDetails,
        MedicinePrice: pro.MedicinePrice,
      },
      {
        where: { Medicineorder_id: id },
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
      .send({ message: `Medicineorder-${id} is not present, add new Medicineorder` });
  }

  async AddmedicineissuedetailsData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = MedicineissueModel
      .create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp.status(200).send(JSON.stringify("Medicineorder Added!!"));
      })
      .catch((err) => {
        return resp.status(500).send(`We got Some Error: ${err.message}`);
      });
  }

  async DeletemedicineissuedetailsData(req, resp) {
    let id = parseInt(req.params.id);
    await sequelize
      .sync({ force: false })
      .then(() =>
      MedicineissueModel.destroy({
          where: { Medicineorder_id: id },
        })
      )
      .then((data) => {
        resp.status(200).send({
          message: "Medicineorder Data is Deleted!!!",
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
module.exports = MedicineIssueDetailsLogic;
