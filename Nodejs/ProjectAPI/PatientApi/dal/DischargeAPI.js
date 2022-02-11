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

//Discharge Model
const DischargeModel = require(path.join(
  __dirname,
  "./../models/dischargedetails"
))(sequelize, Sequelize.DataTypes);

//Doctor Model
const doctorModel = require(path.join(__dirname, "./../models/doctordetails"))(
  sequelize,
  Sequelize.DataTypes
);

class DischargeLogic {
  // Discharge API Key----------------------------------------------------------------
  async getDischargeData(req, resp) {
    // headers: {'AUTHORIZATION': `Bearer [TOKEN]`}
    // chek for the authorization header
    if (req.headers.authorization !== undefined) {
      // reacive the token
      let receivedToken = req.headers.authorization.split(" ")[1];
      // verify the token and decode it using the decode object
      // decode: is the object that is used by the JWT System to inform the server thet the token (Header,Payload and Signeture) ius verified successfully
      // Parameyter 1: The token to be verified
      // Parameter 2: the Secret that will be used to unpack the token for verification
      // Parameter 3: The Verification callback that will be the decoder
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
          let row = await usersModel.findOne({ where: { UserId: id } });
          let CurrentUserEmail = row.UserName;

          console.log(`this is Email= ${CurrentUserEmail}`);
          let role = row.Roles;
          console.log(`this is role= ${role}`);

          // let rolename = await sequelize.query(
          //   `SELECT RoleName from role INNER JOIN userinrole where role.RoleId = userinrole.RoleId and userinrole.UserId=${okay.UserId}`
          // );
          // let namer = rolename[0][0].RoleName;

          if (role === "Doctor") {
            let Doc = await doctorModel.findOne({
              where: { Doctor_Email: CurrentUserEmail },
            });
            let Docid = Doc.Doctor_id;
            console.log(`This is Doctor id -${Docid}`);

            let data = await DischargeModel.findAll({
              where: { Doctor_id: Docid },
            });
            console.log(`this is data- ${JSON.stringify(data)}`);
            return resp.status(200).send({ message: data });
          }
          if (role === "Admin") {
            let data = await DischargeModel.findAll();
            return resp.status(200).send({ message: data });
          }
          if (role === "Operator") {
            let data = await DischargeModel.findAll();
            return resp.status(200).send({ message: data });
          } else {
            return resp
              .status(404)
              .send({ message: `${row.UserName} don't have permission` });
          }
        }
      );
    } else {
      return resp.status(401).send({
        response: `Authorization failed, you are not the User`,
      });
    }
  }

  async getDischargeDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await DischargeModel.findOne({ where: { Discharge_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Discharge-${id} is not present, add new Discharge` });
  }

  async AddDischargeData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = DischargeModel.create(prod)
      .then((response) => {
        console.log(`in then ${response}`);
        return resp
          .status(200)
          .send(JSON.stringify("Discharged Patient is Added!!"));
      })
      .catch((err) => {
        return resp.status(500).send(`We got some Error!!: ${err.message} `);
      });
  }
}
module.exports = DischargeLogic;
