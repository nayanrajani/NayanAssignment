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

//Ward Model
const WardModel = require(path.join(__dirname, "./../models/warddetails"))(
  sequelize,
  Sequelize.DataTypes
);

class WardLogic {
  // Ward API Key----------------------------------------------------------------------
  async getWardData(req, resp) {
    // headers: {'AUTHORIZATION': `Bearer [TOKEN]`}
    // chek for the authorization header
    if (req.headers.authorization !== undefined) {
      // reacive the token
      let receivedToken = req.headers.authorization.split(" ")[1];
      await jwt.verify(
        receivedToken,
        jwtSettings.jwtSecret,
        async (error, decode) => {
          if (error)
            return resp.status(401).send({
              response: `AUthorization failed`,
            });
          // set the decode property of the request to provide the status of the token verification
          req.decode = decode;
          await sequelize.sync({ force: false });

          let id = decode.Usertoken;
          console.log(id);
          // console.log(okay.UserId);
          // let id = okay.UserId;
          let row = await usersModel.findOne({
            where: { UserId: id },
          });
          let CurrentUserEmail = row.UserName;

          console.log(`this is Email= ${CurrentUserEmail}`);
          let role = row.Roles;
          console.log(`this is role= ${role}`);

          // let rolename = await sequelize.query(
          //   `SELECT RoleName from role INNER JOIN userinrole where role.RoleId = userinrole.RoleId and userinrole.UserId=${okay.UserId}`
          // );
          // let namer = rolename[0][0].RoleName;
          if (role === "Admin") {
            let data = await WardModel.findAll();
            return resp.status(200).send({ message: data });
          }
          if (role === "Doctor" || role === "Operator") {
            return resp
              .status(404)
              .send({ message: `${row.UserName} don't have permission` });
          }
        }
      );
    } else {
      return resp.status(401).send({
        response: `AUthorization failed, no AUTHORIZATION header present in the request`,
      });
    }
  }

  async getWardDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await WardModel.findOne({ where: { Ward_no: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        // message: "Data is Read Successfully",
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Ward-${id} is not present, add new Ward` });
  }

  async putWardData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await WardModel.update(
      {
        Ward_no: pro.Ward_no,
        Ward_Type: pro.Ward_Type,
        Ward_Contact: pro.Ward_Contact,
      },
      {
        where: { Ward_no: id },
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
      .send({ message: `Ward-${id} is not present, add new Ward` });
  }

  async AddWardData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = WardModel.create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp
          .status(200)
          .send(JSON.stringify("Data is Added Successfully"));
      })
      .catch((err) => {
        return resp
          .status(500)
          .send(
            `Error Occured : ${err.message} The DeptNo may already be present in DataBase`
          );
      });
  }

  async DeleteWardData(req, resp) {
    let id = parseInt(req.params.id);
    await sequelize
      .sync({ force: false })
      .then(() =>
        WardModel.destroy({
          where: { Ward_no: id },
        })
      )
      .then((data) => {
        resp.status(200).send({
          message: "Data is Deleted Successfully",
          rows: data,
        });
      })
      .catch((error) => {
        resp.status(500).send({
          message: "Some Error Occured, please check the id you have passed!",
          errorDetails: error.message,
        });
      });
  }
}
module.exports = WardLogic;
