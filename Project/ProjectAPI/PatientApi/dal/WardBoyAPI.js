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
            let data = await WardBoyModel.findAll();
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

  async getWardBoyDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await WardBoyModel.findOne({ where: { Wardboy_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        // message: "Data is Read Successfully",
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
        // message: "Data is Read Successfully",
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
module.exports = WardBoyLogic;
