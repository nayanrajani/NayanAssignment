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

//WardBoy Model
const WardBoyModel = require(path.join(__dirname, "./../models/wardboy"))(
  sequelize,
  Sequelize.DataTypes
);

//Users Model
const usersModel = require(path.join(__dirname, "./../models/user"))(
  sequelize,
  Sequelize.DataTypes
);

class WardBoyLogic {
  // WardBoy API Key----------------------------------------------------------------------
  async getWardBoyData(req, resp) {
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
      let data = await WardBoyModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `Authorization failed, May be there is a problem with Network!!`,
      });
    }
  }

  async getWardBoyDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await WardBoyModel.findOne({ where: { Wardboy_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `WardBoy-${id} is not present, add new WardBoy` });
  }

  async putWardBoyData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await WardBoyModel.update(
      {
        Wardboy_id: pro.Wardboy_id,
        Wardboy_Name: pro.Wardboy_Name,
        Wardboy_Email: pro.Wardboy_Email,
        Wardboy_Age: pro.Wardboy_Age,
        Wardboy_Gender: pro.Wardboy_Gender,
        Wardboy_Address: pro.Wardboy_Address,
        Wardboy_Phoneno: pro.Wardboy_Phoneno,
        Wardboy_Addhaar: pro.Wardboy_Addhaar,
        Wardboy_Ward: pro.Wardboy_Ward,
        Wardboy_salary: pro.Wardboy_salary,
      },
      {
        where: { Wardboy_id: id },
      }
    );
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `WardBoy-${id} is not present, add new WardBoy` });
  }

  async AddWardBoyData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = WardBoyModel.create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp.status(200).send(JSON.stringify("New WardBoy Added!!"));
      })
      .catch((err) => {
        return resp.status(500).send(`We got Some Error: ${err.message}`);
      });
  }

  async DeleteWardBoyData(req, resp) {
    let id = parseInt(req.params.id);
    console.log("inside delete");
    await sequelize
      .sync({ force: false })
      .then(() =>
        WardBoyModel.destroy({
          where: { Wardboy_id: id },
        })
      )
      .then((data) => {
        resp.status(200).send({
          message: "Wardboy Deleted!!",
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
module.exports = WardBoyLogic;
