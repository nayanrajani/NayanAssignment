const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const { decode } = require("punycode");
const verifyToken = require("../Constants/TokenVerification");
verToken = new verifyToken();

//Sequelize
const sequelize = new Sequelize("hospital", "root", "Nayan@98digisol", {
  host: "localhost",
  dialect: "mysql",
});
console.log(__dirname);

const usersModel = require(path.join(__dirname, "./../models/user"))(
  sequelize,
  Sequelize.DataTypes
);

class UsersLogic {
  // Users API Key----------------------------------------------------------------------
  async getUsersData(req, resp) {
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
      let data = await usersModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `Authorization failed, May be there is a problem with Network!!`,
      });
    }
  }
}
module.exports = UsersLogic;
