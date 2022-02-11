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

//Users Model
const usersModel = require(path.join(__dirname, "./../models/user"))(
  sequelize,
  Sequelize.DataTypes
);

class AuthLogic {
  //Auth User------------------------------------------------------------------------------
  async registerUser(req, resp) {
    // logic for creating new user
    let user = req.body;
    await sequelize.sync({ force: false });
    // check if the user already exists
    let usr = await usersModel.findOne({ where: { UserName: user.UserName } });
    if (usr !== null) {
      // conflict
      return resp
        .status(409)
        .send({ message: `User Name ${user.UserName} already exists` });
    }
    // else create user
    let created = await usersModel.create(user);
    return resp
      .status(201)
      .send({ message: `User Name ${user.UserName} Created` });
  }

  async authUser(req, resp) {
    // Logic for authenticating user
    let user = req.body;
    // check if the user exist
    let usr = await usersModel.findOne({ where: { UserName: user.UserName } });
    if (usr === null) {
      return resp.status(404).send({
        message: `User Name ${user.UserName} not found please register`,
      });
    }
    // match the Password
    if (usr.Password.trim() !== user.Password.trim()) {
      return resp.status(401).send({
        message: `User Name ${user.UserName} Password does not match`,
      });
    }
    if (usr.Roles !== user.Roles) {
      return resp.status(401).send({
        message: `User Roles ${user.Roles} Roles does not match`,
      });
    }
    console.log(`USr- ${usr.Roles}`);

    let Usertoken = usr.UserId;
    console.log(`USr- ${usr.UserId}`);

    const token = jwt.sign({ Usertoken }, jwtSettings.jwtSecret, {
      expiresIn: 1700, // 1 hour
    });

    return resp.status(200).send({
      message: `User Name ${user.UserName} is Authencated`,
      token: token,
    });
  }
}
module.exports = AuthLogic;

// authorize the user using JWT Security Context and generate the token for it
// Parameter 1: Payload:, the CReadential Information that is to be added in Token for Identity
// Parameter 2: secretOrPrivateKey: The Signeture
// Parameter 3: options:SignOptions, the parameters to set Algorithm, Expiry, etc.
