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

//Doctor Model
const doctorModel = require(path.join(__dirname, "./../models/doctordetails"))(
  sequelize,
  Sequelize.DataTypes
);
const usersModel = require(path.join(__dirname, "./../models/user"))(
  sequelize,
  Sequelize.DataTypes
);

class DoctorLogic {
  // Doctor API Key----------------------------------------------------------------------
  async getDoctorData(req, resp) {
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
      let data = await doctorModel.findAll();
      return resp.status(200).send({ message: data });
    } else {
      return resp.status(401).send({
        response: `AUthorization failed, no AUTHORIZATION header present in the request`,
      });
    }
    // // headers: {'AUTHORIZATION': `Bearer [TOKEN]`}
    // // chek for the authorization header
    // if (req.headers.authorization !== undefined) {
    //   // reacive the token
    //   let receivedToken = req.headers.authorization.split(" ")[1];

    //   await jwt.verify(
    //     receivedToken,
    //     jwtSettings.jwtSecret,
    //     async (error, decode) => {
    //       if (error)
    //         return resp.status(401).send({
    //           response: `AUthorization failed`,
    //         });
    //       // set the decode property of the request to provide the status of the token verification
    //       req.decode = decode;
    //       await sequelize.sync({ force: false });
    //       let id = decode.Usertoken;
    //       console.log(id);
    //       // console.log(okay.UserId);
    //       // let id = okay.UserId;
    //       let row = await usersModel.findOne({ where: { UserId: id } });
    //       let CurrentUserEmail = row.UserName;

    //       console.log(`this is Email= ${CurrentUserEmail}`);

    //       // let Doc = await doctorModel.findOne({
    //       //   where: { Doctor_Email: CurrentUserEmail },
    //       // });
    //       // let DocName = Doc.Doctor_Name;
    //       // console.log(`This is Doctor Row - ${Doc}`);
    //       // console.log(`This is Doctor Name -${DocName}`);

    //       let role = row.Roles;
    //       console.log(`this is role= ${role}`);

    //       // let rolename = await sequelize.query(
    //       //   `SELECT RoleName from role INNER JOIN userinrole where role.RoleId = userinrole.RoleId and userinrole.UserId=${okay.UserId}`
    //       // );
    //       // let namer = rolename[0][0].RoleName;

    //       if (role === "Doctor" || role === "Admin") {
    //         let data = await doctorModel.findAll();
    //         return resp.status(200).send({ message: data });
    //       }
    //       //if (namer === "Admin" || namer === "Manager")
    //       else {
    //         return resp
    //           .status(404)
    //           .send({ message: `${okay.UserName} don't have permission` });
    //       }
    //     }
    //   );
    // } else {
    //   return resp.status(401).send({
    //     response: `AUthorization failed, no AUTHORIZATION header present in the request`,
    //   });
    // }
  }
  //         let okay = decode.Usertoken;
  //         console.log(okay);
  //         console.log(okay.UserId);

  //         let rolename = await sequelize.query(
  //           `SELECT RoleName from role INNER JOIN userinrole where role.RoleId = userinrole.RoleId and userinrole.UserId=${okay.UserId}`
  //         );
  //         let namer = rolename[0][0].RoleName;
  //         if (namer === "Operator") {
  //           response: `${okay.UserName} don't have permission`;
  //         }
  //         //if (namer === "Admin" || namer === "Manager")
  //         else {
  //           let data = await doctorModel.findAll();
  //           return resp.status(200).send({ message: data });
  //         }
  //       }
  //     );
  //   } else {
  //     return resp.status(401).send({
  //       response: `AUthorization failed, no AUTHORIZATION header present in the request`,
  //     });
  //   }
  // }

  async getDoctorDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await doctorModel.findOne({ where: { Doctor_id: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        // message: "Data is Read Successfully",
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Doctor-${id} is not present, add new Doctor` });
  }

  async putDoctorData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await doctorModel.update(
      {
        Doctor_id: pro.Doctor_id,
        Doctor_Name: pro.Doctor_Name,
        Doctor_Age: pro.Doctor_Age,
        Doctor_Email: pro.Doctor_Email,
        Doctor_Gender: pro.Doctor_Gender,
        Doctor_Phoneno: pro.Doctor_Phoneno,
        Doctor_Address: pro.Doctor_Address,
        Doctor_Addhaar: pro.Doctor_Addhaar,
        Doctor_type: pro.Doctor_type,
        Doctor_Specialization: pro.Doctor_Specialization,
        Doctor_Charges: pro.Doctor_Charges,
      },
      {
        where: { Doctor_id: id },
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
      .send({ message: `Doctor-${id} is not present, add new Doctor` });
  }

  async AddDoctorData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = doctorModel
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

  async DeleteDoctorData(req, resp) {
    let id = parseInt(req.params.id);
    await sequelize
      .sync({ force: false })
      .then(() =>
        doctorModel.destroy({
          where: { Doctor_id: id },
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
module.exports = DoctorLogic;
