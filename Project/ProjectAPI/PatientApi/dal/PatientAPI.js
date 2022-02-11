const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");
const verifyToken = require("../Constants/TokenVerification");
verToken = new verifyToken();

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

//Patient Model
const patientModel = require(path.join(
  __dirname,
  "./../models/patientdetails"
))(sequelize, Sequelize.DataTypes);

//Doctor Model
const doctorModel = require(path.join(__dirname, "./../models/doctordetails"))(
  sequelize,
  Sequelize.DataTypes
);

class PatientLogic {
  // Patient API Key----------------------------------------------------------------
  async getPatientData(req, resp) {
    if (req.headers.authorization !== undefined) {
      let receivedToken = req.headers.authorization.split(" ")[1];

      let t = verToken.validateToken(receivedToken);
      if (!t) {
        return resp.status(401).send({
          response: `Authorization Failed!!`,
        });
      }
      req.decode = decode;
      await sequelize.sync({ force: false });
      let data = await patientModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `AUthorization failed, no AUTHORIZATION header present in the request`,
      });
    }
  }

  async getPatientDatabyDoctorID(req, resp) {
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
          console.log(`this is id- ${id}`);
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
            let DocName = Doc.Doctor_Name;
            console.log(`This is Doctor Name -${DocName}`);

            let data = await patientModel.findAll({
              where: { Doctor_Name: DocName },
            });
            console.log(`this is data- ${JSON.stringify(data)}`);
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
        response: `AUthorization failed, no AUTHORIZATION header present in the request`,
      });
    }
  }

  async getPatientDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await patientModel.findOne({ where: { Patient_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        // message: "Data is Read Successfully",
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Patient-${id} is not present, add new Patient` });
  }

  async putPatientData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await patientModel.update(
      {
        Patient_id: pro.Patient_id,
        Patient_Name: pro.Patient_Name,
        Patient_Email: pro.Patient_Email,
        Patient_Age: pro.Patient_Age,
        Patient_Gender: pro.Patient_Gender,
        Patient_Address: pro.Patient_Address,
        Patient_Phoneno: pro.Patient_Phoneno,
        Patient_Addhaar: pro.Patient_Addhaar,
        Patient_Disease: pro.Patient_Disease,
        Patient_Ward_type: pro.Patient_Ward_type,
        Patient_Room_no: pro.Patient_Room_no,
        Doctor_Name: pro.Doctor_Name,
      },
      {
        where: { Patient_id: id },
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
      .send({ message: `Patient-${id} is not present, add new Patient` });
  }

  async AddPatientData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = patientModel
      .create(prod)
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

  async DeletePatientData(req, resp) {
    let id = parseInt(req.params.id);
    await sequelize
      .sync({ force: false })
      .then(() =>
        patientModel.destroy({
          where: { Patient_id: id },
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
module.exports = PatientLogic;
