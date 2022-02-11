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

//Canteen Model
const canteenModel = require(path.join(
  __dirname,
  "./../models/canteendetails"
))(sequelize, Sequelize.DataTypes);

class CanteenLogic {
  // Canteen API Key----------------------------------------------------------------------
  async getCanteenData(req, resp) {
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
      let data = await canteenModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `Authorization failed, May be there is a problem with Network!!`,
      });
    }
  }

  async getCanteenDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await canteenModel.findOne({ where: { Order_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Canteen-${id} is not present, add new Canteen` });
  }

  async getPatientCanteenDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await canteenModel.findOne({ where: { Item_Buyer: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Canteen-${id} is not present, add new Canteen` });
  }

  async putCanteenData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await canteenModel.update(
      {
        Order_id: pro.Order_id,
        Item_id: pro.Item_id,
        Item_name: pro.Item_name,
        Item_Buyer: pro.Item_Buyer,
        Item_Total: pro.Item_Total,
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
      .send({ message: `Canteen-${id} is not present, add new Canteen` });
  }

  async AddCanteenData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = canteenModel
      .create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp.status(200).send(JSON.stringify("Canteen Data is Added "));
      })
      .catch((err) => {
        return resp.status(500).send(`We got Some Error: ${err.message}`);
      });
  }

  async DeleteCanteenData(req, resp) {
    let id = parseInt(req.params.id);
    await sequelize
      .sync({ force: false })
      .then(() =>
        canteenModel.destroy({
          where: { Order_id: id },
        })
      )
      .then((data) => {
        resp.status(200).send({
          message: "Canteen Data Deleted Successfully",
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
module.exports = CanteenLogic;
