const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const { decode } = require("punycode");
const verifyToken = require("./../Constants/TokenVerification");
verToken = new verifyToken();

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
//Nurse Model
const NurseModal = require(path.join(__dirname, "./../models/nurse"))(
  sequelize,
  Sequelize.DataTypes
);

class Nurselogic {
  // Nurse API Key----------------------------------------------------------------------
  async getNurseData(req, resp) {
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
      let data = await NurseModal.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `Authorization failed, May be there is a problem with Network!!`,
      });
    }
  }

  async getNurseDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await NurseModal.findOne({ where: { Nurse_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Nurse-${id} is not present, add new Nurse` });
  }

  async putNurseData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await NurseModal.update(
      {
        Nurse_id: pro.Nurse_id,
        Nurse_Name: pro.Nurse_Name,
        Nurse_Email: pro.Nurse_Email,
        Nurse_Age: pro.Nurse_Age,
        Nurse_Gender: pro.Nurse_Gender,
        Nurse_Address: pro.Nurse_Address,
        Nurse_Phoneno: pro.Nurse_Phoneno,
        Nurse_Addhaar: pro.Nurse_Addhaar,
        Nurse_Room: pro.Nurse_Room,
        Nurse_salary: pro.Nurse_salary,
      },
      {
        where: { Nurse_id: id },
      }
    );
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Nurse-${id} is not present, add new Nurse` });
  }

  async AddNurseData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = NurseModal.create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp.status(200).send(JSON.stringify("New Nurse Hired"));
      })
      .catch((err) => {
        return resp.status(500).send(`We got Some Error: ${err.message}`);
      });
  }

  async DeleteNurseData(req, resp) {
    let id = parseInt(req.params.id);
    console.log("inside delete");
    await sequelize
      .sync({ force: false })
      .then(() =>
        NurseModal.destroy({
          where: { Nurse_id: id },
        })
      )
      .then((data) => {
        resp.status(200).send({
          message: "Nurse Left!!",
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
module.exports = Nurselogic;
