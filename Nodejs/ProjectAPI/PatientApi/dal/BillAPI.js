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

//Bill Model
const billModel = require(path.join(__dirname, "./../models/billdetails"))(
  sequelize,
  Sequelize.DataTypes
);

// this is a update
//Users Model
const usersModel = require(path.join(__dirname, "./../models/user"))(
  sequelize,
  Sequelize.DataTypes
);

class BillLogic {
  // Bill API Key----------------------------------------------------------------------
  async getBillData(req, resp) {
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
      let data = await billModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `Authorization failed, May be there is a problem with Network!!`,
      });
    }
  }

  async getBillDatabyID(req, resp) {
    if (req.headers.authorization !== undefined) {
      let receivedToken = req.headers.authorization.split(" ")[1];

      let t = verToken.validateToken(receivedToken);
      if (!t) {
        return resp.status(401).send({
          response: `Authorization failed, you are not the User`,
        });
      }
      req.decode = decode;
      let id = parseInt(req.params.id);
      console.log(`this is main id ---${id}`);
      await sequelize.sync({ force: false });
      let row = await billModel.findOne({ where: { bill_no: id } });
      console.log(`this is data ${JSON.stringify(row)}`);
      if (row) {
        return resp.status(200).send({
          rows: row,
        });
      }
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Bill-${id} is not present, add new Bill` });
  }

  async putBillData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await billModel.update(
      {
        bill_no: pro.bill_no,
        Patient_id: pro.Patient_id,
        Patient_Name: pro.Patient_Name,
        Patient_Disease:pro.Patient_Disease,
        Doctor_id: pro.Doctor_id,
        Doctor_Name: pro.Doctor_Name,
        Doctor_Charges: pro.Doctor_Charges,
        Doctor_Visit:pro.Doctor_Visit,
        Patient_Room_no:pro.Patient_Room_no,
        Room_charges:pro.Room_charges,
        Patient_Medicine_id:pro.Patient_Medicine_id,
        Medicine_price: pro.Medicine_price,
        Order_id: pro.Order_id,
        Item_Total: pro.Item_Total,
        no_of_days: pro.no_of_days,

        Bill_Total: pro.Bill_Total,
      },
      {
        where: { bill_no: id },
      }
    );
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Bill-${id} is not present, add new Bill` });
  }

  async AddBillData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = billModel
      .create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp
          .status(200)
          .send(JSON.stringify("Bill is Added Successfully"));
      })
      .catch((err) => {
        return resp.status(500).send(`We got Some Error: ${err.message}`);
      });
  }

  async DeleteBillData(req, resp) {
    let id = parseInt(req.params.id);
    await sequelize
      .sync({ force: false })
      .then(() =>
        billModel.destroy({
          where: { bill_no: id },
        })
      )
      .then((data) => {
        resp.status(200).send({
          message: "Bill Deleted Successfully",
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
module.exports = BillLogic;
