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
//Nurse Model
const NurseModal = require(path.join(__dirname, "./../models/nurse"))(
  sequelize,
  Sequelize.DataTypes
);

class Nurselogic {
  // Nurse API Key----------------------------------------------------------------------
  async getNurseData(req, resp) {
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
            let data = await NurseModal.findAll();
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

  async getNurseDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await NurseModal.findOne({ where: { Nurse_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        // message: "Data is Read Successfully",
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Nurse-${id} is not present, add new Nurse` });
  }

  async putNurseData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await NurseModal.update(
      {
        Nurse_id: pro.Nurse_id,
        Nurse_Name: pro.Nurse_Name,
        Nurse_Email: pro.Nurse_Email,
        Nurse_Age: pro.Nurse_Age,
        Nurse_Gender: pro.Nurse_Gender,
        Nurse_Address: pro.Nurse_Address,
        Nurse_Phoneno: pro.Nurse_Phoneno,
        Nurse_Addhaar: pro.Nurse_Addhaar,
        Nurse_Room: pro.Nurse_Room,
        Nurse_salary: pro.Nurse_salary,
      },
      {
        where: { Nurse_id: id },
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
      .send({ message: `Nurse-${id} is not present, add new Nurse` });
  }

  async AddNurseData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = NurseModal.create(prod)
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

  async DeleteNurseData(req, resp) {
    let id = parseInt(req.params.id);
    console.log("inside delete");
    await sequelize
      .sync({ force: false })
      .then(() =>
        NurseModal.destroy({
          where: { Nurse_id: id },
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
module.exports = Nurselogic;
