const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// using the JSON Web Token Package
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");

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

//Medicine Model
const medicineModel = require(path.join(
  __dirname,
  "./../models/medicinedetails"
))(sequelize, Sequelize.DataTypes);

//Users Model
const usersModel = require(path.join(__dirname, "./../models/user"))(
  sequelize,
  Sequelize.DataTypes
);

class MedicineLogic {
  // Medicine API Key----------------------------------------------------------------------
  async getMedicineData(req, resp) {
    if (req.headers.authorization !== undefined) {
      let receivedToken = req.headers.authorization.split(" ")[1];

      let t = verToken.validateToken(receivedToken);
      if (!t) {
        return resp.status(401).send({
          response: `AUthorization failed!!`,
        });
      }
      req.decode = decode;
      await sequelize.sync({ force: false });
      let data = await medicineModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `Authorization failed, May be there is a problem with Network!!`,
      });
    }
  }

  async getMedicineDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await medicineModel.findOne({ where: { Order_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Medicine-${id} is not present, add new Medicine` });
  }

  async putMedicineData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await medicineModel.update(
      {
        Order_id: pro.Order_id,
        Medicine_id: pro.Medicine_id,
        Medicine_Name: pro.Medicine_Name,
        Medicine_Type: pro.Medicine_Type,
        Medicine_Manufacturer: pro.Medicine_Manufacturer,
        Medicine_manufac_date: pro.Medicine_manufac_date,
        Medicine_expiry_date: pro.Medicine_expiry_date,
        Medicine_Inward_date: pro.Medicine_Inward_date,
        Medicine_price: pro.Medicine_price,
      },
      {
        where: { Order_id: id },
      }
    );
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Medicine-${id} is not present, add new Medicine` });
  }

  async AddMedicineData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = medicineModel
      .create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp
          .status(200)
          .send(JSON.stringify("New Medicine Data Added!!"));
      })
      .catch((err) => {
        return resp.status(500).send(`We got Some Error: ${err.message}`);
      });
  }

  async DeleteMedicineData(req, resp) {
    let id = parseInt(req.params.id);
    await sequelize
      .sync({ force: false })
      .then(() =>
        medicineModel.destroy({
          where: { Order_id: id },
        })
      )
      .then((data) => {
        resp.status(200).send({
          message: `Medicine_id-${id} is Deleted!`,
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
module.exports = MedicineLogic;
