const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");
const verifyToken = require("../Constants/TokenVerification");
verToken = new verifyToken();

// define an object for the secret key
const jwtSettings = {
  jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
};

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

//Patientmedicine Model
const patientmedicineModel = require(path.join(
  __dirname,
  "./../models/patientmedicinedetails"
))(sequelize, Sequelize.DataTypes);

//Doctor Model
const doctorModel = require(path.join(__dirname, "./../models/doctordetails"))(
  sequelize,
  Sequelize.DataTypes
);

class PatientmedicineLogic {
  // Patientmedicine API Key----------------------------------------------------------------
  async getpatientmedicineData(req, resp) {
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
      let data = await patientmedicineModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `Authorization failed, May be there is a problem with Network!!`,
      });
    }
  }


  async getpatientmedicineDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await patientmedicineModel.findOne({ where: { PatientMedicine_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Patientmedicine-${id} is not present, add new Patientmedicine` });
  }

  async getpatientmedicineDatabyPatientID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await patientmedicineModel.findOne({ where: { Patient_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Patientmedicine-${id} is not present, add new Patientmedicine` });
  }

  async putpatientmedicineData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await patientmedicineModel.update(
      {
        PatientMedicine_id: pro.PatientMedicine_id,
        Patient_id: pro.Patient_id,
        Patient_Name: pro.Patient_Name,
        Patient_Email: pro.Patient_Email,
        Patient_Age: pro.Patient_Age,
        Patient_Gender: pro.Patient_Gender,
        Patient_Address: pro.Patient_Address,
        Patient_Phoneno: pro.Patient_Phoneno,
        Patient_Addhaar: pro.Patient_Addhaar,
        Patient_Disease: pro.Patient_Disease,
        Patient_Ward_type: pro.Patient_Ward_type,
        Patient_Room_no: pro.Patient_Room_no,
        Doctor_id: pro.Doctor_id,
        Medicine_Details :pro.Medicine_Details,
        Medicine_price: pro.Medicine_price,
      },
      {
        where: { PatientMedicine_id: id },
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
      .send({ message: `Patientmedicine-${id} is not present, add new Patientmedicine` });
  }

  async AddpatientmedicineData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = patientmedicineModel
      .create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp.status(200).send(JSON.stringify("Patientmedicine Added!!"));
      })
      .catch((err) => {
        return resp.status(500).send(`We got Some Error: ${err.message}`);
      });
  }

  async DeletepatientmedicineData(req, resp) {
    let id = parseInt(req.params.id);
    await sequelize
      .sync({ force: false })
      .then(() =>
      patientmedicineModel.destroy({
          where: { Patient_id: id },
        })
      )
      .then((data) => {
        resp.status(200).send({
          message: "Patientmedicine Data is Deleted!!!",
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
module.exports = PatientmedicineLogic;
