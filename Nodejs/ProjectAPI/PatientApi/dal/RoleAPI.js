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

//Role Model
const roleModel = require(path.join(__dirname, "./../models/role"))(
  sequelize,
  Sequelize.DataTypes
);

//Users Model
const usersModel = require(path.join(__dirname, "./../models/user"))(
  sequelize,
  Sequelize.DataTypes
);

class RoleLogic {
  // Role API Key----------------------------------------------------------------------
  async getRoleData(req, resp) {
    await sequelize.sync({ force: false });
    let data = await roleModel.findAll();
    return resp.status(200).send({ message: data });
    // return resp
    //   .status(404) // internal server error
    //   .send({ message: `Patient-${id} is not present, add new Patient` });
  }

  async AddRoleData(req, resp) {
    let prod = req.body;
    console.log(`this is prod ${JSON.stringify(prod)}`);
    await sequelize.sync({ force: false });
    let rec = roleModel
      .create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp
          .status(200)
          .send(JSON.stringify("Role is Added Successfully"));
      })
      .catch((err) => {
        return resp.status(500).send(`We got Some Error: ${err.message}`);
      });
  }
}
module.exports = RoleLogic;
