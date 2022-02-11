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

// //Patient Model
// const patientModel = require(path.join(
//   __dirname,
//   "./../models/patientdetails"
// ))(sequelize, Sequelize.DataTypes);

// //Doctor Model
// const doctorModel = require(path.join(__dirname, "./../models/doctordetails"))(
//   sequelize,
//   Sequelize.DataTypes
// );

// //Ward Model
// const WardModel = require(path.join(__dirname, "./../models/warddetails"))(
//   sequelize,
//   Sequelize.DataTypes
// );

// //Room Model
// const RoomModel = require(path.join(__dirname, "./../models/roomdetails"))(
//   sequelize,
//   Sequelize.DataTypes
// );

// //WardBoy Model
// const WardBoyModel = require(path.join(__dirname, "./../models/wardboy"))(
//   sequelize,
//   Sequelize.DataTypes
// );

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
      return resp
        .status(401)
        .send({ message: `User Name ${user.UserName}Password does not match` });
    }
    if (usr.Roles !== user.Roles) {
      return resp.status(401).send({
        message: `User Roles ${user.Roles} Roles does not match`,
      });
    }
    console.log(`USr- ${usr.Roles}`);
    let Usertoken = usr.UserId;
    console.log(`USr- ${usr.UserId}`);
    // authorize the user using JWT Security Context and generate the token for it
    // Parameter 1: Payload:, the CReadential Information that is to be added in Token for Identity
    // Parameter 2: secretOrPrivateKey: The Signeture
    // Parameter 3: options:SignOptions, the parameters to set Algorithm, Expiry, etc.
    const token = jwt.sign({ Usertoken }, jwtSettings.jwtSecret, {
      expiresIn: 3600, // 1 hour
    });

    return resp.status(200).send({
      message: `User Name ${user.UserName} is Authencated`,
      token: token,
    });
  }
}
module.exports = AuthLogic;

// Patient API Key----------------------------------------------------------------
// async getPatientData(req, resp) {
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
//       let row = await usersModel.findOne({
//         where: { UserId: id },
//       });
//       let CurrentUserEmail = row.UserName;

//       console.log(`this is Email= ${CurrentUserEmail}`);
//       let role = row.Roles;
//       console.log(`this is role= ${role}`);

//       // let rolename = await sequelize.query(
//       //   `SELECT RoleName from role INNER JOIN userinrole where role.RoleId = userinrole.RoleId and userinrole.UserId=${okay.UserId}`
//       // );
//       // let namer = rolename[0][0].RoleName;
//       if (role === "Admin") {
//         let data = await canteenModel.findAll();
//         return resp.status(200).send({ message: data });
//       }
//       if (role === "Doctor" || role === "Operator") {
//         return resp
//           .status(404)
//           .send({ message: `${row.UserName} don't have permission` });
//       }
//     }
//   );
// } else {
//   return resp.status(401).send({
//     response: `AUthorization failed, no AUTHORIZATION header present in the request`,
//   });
// }
// }

// async getPatientDatabyID(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log(`this is main id ---${id}`);
//   await sequelize.sync({ force: false });
//   let row = await patientModel.findOne({ where: { Patient_id: id } });
//   console.log(`this is data ${JSON.stringify(row)}`);
//   if (row) {
//     return resp.status(200).send({
//       // message: "Data is Read Successfully",
//       rows: row,
//     });
//   }
//   return resp
//     .status(404) // internal server error
//     .send({ message: `Patient-${id} is not present, add new Patient` });
// }

// async putPatientData(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log(`this is put id ---${id}`);
//   let pro = req.body;
//   console.log(`this is body id ---${JSON.stringify(pro)}`);

//   await sequelize.sync({ force: false });
//   let row = await patientModel.update(
//     {
//       Patient_id: pro.Patient_id,
//       Patient_Name: pro.Patient_Name,
//       Patient_Email: pro.Patient_Email,
//       Patient_Age: pro.Patient_Age,
//       Patient_Gender: pro.Patient_Gender,
//       Patient_Address: pro.Patient_Address,
//       Patient_Phoneno: pro.Patient_Phoneno,
//       Patient_Addhaar: pro.Patient_Addhaar,
//       Patient_Disease: pro.Patient_Disease,
//       Patient_Ward_type: pro.Patient_Ward_type,
//       Patient_Room_no: pro.Patient_Room_no,
//     },
//     {
//       where: { Patient_id: id },
//     }
//   );
//   if (row) {
//     return resp.status(200).send({
//       // message: "Data is Read Successfully",
//       rows: row,
//     });
//   }
//   return resp
//     .status(404) // internal server error
//     .send({ message: `Patient-${id} is not present, add new Patient` });
// }

// async AddPatientData(req, resp) {
//   let prod = req.body;
//   await sequelize.sync({ force: false });
//   let rec = patientModel
//     .create(prod)
//     .then((response) => {
//       console.log(`in then ${response}`);
//       return resp
//         .status(200)
//         .send(JSON.stringify("Data is Added Successfully"));
//     })
//     .catch((err) => {
//       return resp
//         .status(500)
//         .send(
//           `Error Occured : ${err.message} The DeptNo may already be present in DataBase`
//         );
//     });
// }

// async DeletePatientData(req, resp) {
//   let id = parseInt(req.params.id);
//   await sequelize
//     .sync({ force: false })
//     .then(() =>
//       patientModel.destroy({
//         where: { Patient_id: id },
//       })
//     )
//     .then((data) => {
//       resp.status(200).send({
//         message: "Data is Deleted Successfully",
//         rows: data,
//       });
//     })
//     .catch((error) => {
//       resp.status(500).send({
//         message: "Some Error Occured, please check the id you have passed!",
//         errorDetails: error.message,
//       });
//     });
// }

// // Doctor API Key----------------------------------------------------------------------
// async getDoctorData(req, resp) {
//   // headers: {'AUTHORIZATION': `Bearer [TOKEN]`}
//   // chek for the authorization header
//   if (req.headers.authorization !== undefined) {
//     // reacive the token
//     let receivedToken = req.headers.authorization.split(" ")[1];
//     // verify the token and decode it using the decode object
//     // decode: is the object that is used by the JWT System to inform the server thet the token (Header,Payload and Signeture) ius verified successfully
//     // Parameyter 1: The token to be verified
//     // Parameter 2: the Secret that will be used to unpack the token for verification
//     // Parameter 3: The Verification callback that will be the decoder
//     await jwt.verify(
//       receivedToken,
//       jwtSettings.jwtSecret,
//       async (error, decode) => {
//         if (error)
//           return resp.status(401).send({
//             response: `AUthorization failed`,
//           });
//         // set the decode property of the request to provide the status of the token verification
//         req.decode = decode;
//         await sequelize.sync({ force: false });

//         let okay = decode.usr;
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

// async getDoctorDatabyID(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log(`this is main id ---${id}`);
//   await sequelize.sync({ force: false });
//   let row = await doctorModel.findOne({ where: { Doctor_id: id } });
//   console.log(`this is data ${JSON.stringify(row)}`);
//   if (row) {
//     return resp.status(200).send({
//       // message: "Data is Read Successfully",
//       rows: row,
//     });
//   }
//   return resp
//     .status(404) // internal server error
//     .send({ message: `Doctor-${id} is not present, add new Doctor` });
// }

// async putDoctorData(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log(`this is put id ---${id}`);
//   let pro = req.body;
//   console.log(`this is body id ---${JSON.stringify(pro)}`);

//   await sequelize.sync({ force: false });
//   let row = await doctorModel.update(
//     {
//       Doctor_id: pro.Doctor_id,
//       Doctor_Name: pro.Doctor_Name,
//       Doctor_Age: pro.Doctor_Age,
//       Doctor_Email: pro.Doctor_Email,
//       Doctor_Gender: pro.Doctor_Gender,
//       Doctor_Phoneno: pro.Doctor_Phoneno,
//       Doctor_Address: pro.Doctor_Address,
//       Doctor_Addhaar: pro.Doctor_Addhaar,
//       Doctor_type: pro.Doctor_type,
//       Doctor_Specialization: pro.Doctor_Specialization,
//       Doctor_Charges: pro.Doctor_Charges,
//     },
//     {
//       where: { Doctor_id: id },
//     }
//   );
//   if (row) {
//     return resp.status(200).send({
//       // message: "Data is Read Successfully",
//       rows: row,
//     });
//   }
//   return resp
//     .status(404) // internal server error
//     .send({ message: `Doctor-${id} is not present, add new Doctor` });
// }

// async AddDoctorData(req, resp) {
//   let prod = req.body;
//   await sequelize.sync({ force: false });
//   let rec = doctorModel
//     .create(prod)
//     .then((response) => {
//       console.log(`in then ${response}`);
//       return resp
//         .status(200)
//         .send(JSON.stringify("Data is Added Successfully"));
//     })
//     .catch((err) => {
//       return resp
//         .status(500)
//         .send(
//           `Error Occured : ${err.message} The DeptNo may already be present in DataBase`
//         );
//     });
// }

// async DeleteDoctorData(req, resp) {
//   let id = parseInt(req.params.id);
//   await sequelize
//     .sync({ force: false })
//     .then(() =>
//       doctorModel.destroy({
//         where: { Doctor_id: id },
//       })
//     )
//     .then((data) => {
//       resp.status(200).send({
//         message: "Data is Deleted Successfully",
//         rows: data,
//       });
//     })
//     .catch((error) => {
//       resp.status(500).send({
//         message: "Some Error Occured, please check the id you have passed!",
//         errorDetails: error.message,
//       });
//     });
// }

// // Ward API Key----------------------------------------------------------------------
// async getWardData(req, resp) {
//   // headers: {'AUTHORIZATION': `Bearer [TOKEN]`}
//   // chek for the authorization header
//   if (req.headers.authorization !== undefined) {
//     // reacive the token
//     let receivedToken = req.headers.authorization.split(" ")[1];
//     // verify the token and decode it using the decode object
//     // decode: is the object that is used by the JWT System to inform the server thet the token (Header,Payload and Signeture) ius verified successfully
//     // Parameyter 1: The token to be verified
//     // Parameter 2: the Secret that will be used to unpack the token for verification
//     // Parameter 3: The Verification callback that will be the decoder
//     await jwt.verify(
//       receivedToken,
//       jwtSettings.jwtSecret,
//       async (error, decode) => {
//         if (error)
//           return resp.status(401).send({
//             response: `AUthorization failed`,
//           });
//         // set the decode property of the request to provide the status of the token verification
//         req.decode = decode;
//         await sequelize.sync({ force: false });

//         let okay = decode.usr;
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
//           let data = await WardModel.findAll();
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

// async getWardDatabyID(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log(`this is main id ---${id}`);
//   await sequelize.sync({ force: false });
//   let row = await WardModel.findOne({ where: { Ward_no: id } });
//   console.log(`this is data ${JSON.stringify(row)}`);
//   if (row) {
//     return resp.status(200).send({
//       // message: "Data is Read Successfully",
//       rows: row,
//     });
//   }
//   return resp
//     .status(404) // internal server error
//     .send({ message: `Ward-${id} is not present, add new Ward` });
// }

// async putWardData(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log(`this is put id ---${id}`);
//   let pro = req.body;
//   console.log(`this is body id ---${JSON.stringify(pro)}`);

//   await sequelize.sync({ force: false });
//   let row = await WardModel.update(
//     {
//       Ward_no: pro.Ward_no,
//       Ward_Type: pro.Ward_Type,
//       Ward_Contact: pro.Ward_Contact,
//     },
//     {
//       where: { Ward_no: id },
//     }
//   );
//   if (row) {
//     return resp.status(200).send({
//       // message: "Data is Read Successfully",
//       rows: row,
//     });
//   }
//   return resp
//     .status(404) // internal server error
//     .send({ message: `Ward-${id} is not present, add new Ward` });
// }

// async AddWardData(req, resp) {
//   let prod = req.body;
//   await sequelize.sync({ force: false });
//   let rec = WardModel.create(prod)
//     .then((response) => {
//       console.log(`in then ${response}`);
//       return resp
//         .status(200)
//         .send(JSON.stringify("Data is Added Successfully"));
//     })
//     .catch((err) => {
//       return resp
//         .status(500)
//         .send(
//           `Error Occured : ${err.message} The DeptNo may already be present in DataBase`
//         );
//     });
// }

// async DeleteWardData(req, resp) {
//   let id = parseInt(req.params.id);
//   await sequelize
//     .sync({ force: false })
//     .then(() =>
//       WardModel.destroy({
//         where: { Ward_no: id },
//       })
//     )
//     .then((data) => {
//       resp.status(200).send({
//         message: "Data is Deleted Successfully",
//         rows: data,
//       });
//     })
//     .catch((error) => {
//       resp.status(500).send({
//         message: "Some Error Occured, please check the id you have passed!",
//         errorDetails: error.message,
//       });
//     });
// }

// // Room API Key----------------------------------------------------------------------
// async getRoomData(req, resp) {
//   // headers: {'AUTHORIZATION': `Bearer [TOKEN]`}
//   // chek for the authorization header
//   if (req.headers.authorization !== undefined) {
//     // reacive the token
//     let receivedToken = req.headers.authorization.split(" ")[1];
//     // verify the token and decode it using the decode object
//     // decode: is the object that is used by the JWT System to inform the server thet the token (Header,Payload and Signeture) ius verified successfully
//     // Parameyter 1: The token to be verified
//     // Parameter 2: the Secret that will be used to unpack the token for verification
//     // Parameter 3: The Verification callback that will be the decoder
//     await jwt.verify(
//       receivedToken,
//       jwtSettings.jwtSecret,
//       async (error, decode) => {
//         if (error)
//           return resp.status(401).send({
//             response: `AUthorization failed`,
//           });
//         // set the decode property of the request to provide the status of the token verification
//         req.decode = decode;
//         await sequelize.sync({ force: false });

//         let okay = decode.usr;
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
//           let data = await RoomModel.findAll();
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

// async getRoomDatabyID(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log(`this is main id ---${id}`);
//   await sequelize.sync({ force: false });
//   let row = await RoomModel.findOne({ where: { Room_Id: id } });
//   console.log(`this is data ${JSON.stringify(row)}`);
//   if (row) {
//     return resp.status(200).send({
//       // message: "Data is Read Successfully",
//       rows: row,
//     });
//   }
//   return resp
//     .status(404) // internal server error
//     .send({ message: `Ward-${id} is not present, add new Ward` });
// }

// async putRoomData(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log(`this is put id ---${id}`);
//   let pro = req.body;
//   console.log(`this is body id ---${JSON.stringify(pro)}`);

//   await sequelize.sync({ force: false });
//   let row = await RoomModel.update(
//     {
//       Room_no: pro.Room_no,
//       Room_type: pro.Room_type,
//       Room_floor: pro.Room_floor,
//       Room_bed: pro.Room_bed,
//       Room_charges: pro.Room_charges,
//     },
//     {
//       where: { Room_Id: id },
//     }
//   );
//   if (row) {
//     return resp.status(200).send({
//       // message: "Data is Read Successfully",
//       rows: row,
//     });
//   }
//   return resp
//     .status(404) // internal server error
//     .send({ message: `Ward-${id} is not present, add new Ward` });
// }

// async AddRoomData(req, resp) {
//   let prod = req.body;
//   await sequelize.sync({ force: false });
//   let rec = RoomModel.create(prod)
//     .then((response) => {
//       console.log(`in then ${response}`);
//       return resp
//         .status(200)
//         .send(JSON.stringify("Data is Added Successfully"));
//     })
//     .catch((err) => {
//       return resp
//         .status(500)
//         .send(
//           `Error Occured : ${err.message} The DeptNo may already be present in DataBase`
//         );
//     });
// }

// async DeleteRoomData(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log("inside delete");
//   await sequelize
//     .sync({ force: false })
//     .then(() =>
//       RoomModel.destroy({
//         where: { Room_Id: id },
//       })
//     )
//     .then((data) => {
//       resp.status(200).send({
//         message: "Data is Deleted Successfully",
//         rows: data,
//       });
//     })
//     .catch((error) => {
//       resp.status(500).send({
//         message: "Some Error Occured, please check the id you have passed!",
//         errorDetails: error.message,
//       });
//     });
// }

// // WardBoy API Key----------------------------------------------------------------------
// async getWardBoyData(req, resp) {
//   // headers: {'AUTHORIZATION': `Bearer [TOKEN]`}
//   // chek for the authorization header
//   if (req.headers.authorization !== undefined) {
//     // reacive the token
//     let receivedToken = req.headers.authorization.split(" ")[1];
//     // verify the token and decode it using the decode object
//     // decode: is the object that is used by the JWT System to inform the server thet the token (Header,Payload and Signeture) ius verified successfully
//     // Parameyter 1: The token to be verified
//     // Parameter 2: the Secret that will be used to unpack the token for verification
//     // Parameter 3: The Verification callback that will be the decoder
//     await jwt.verify(
//       receivedToken,
//       jwtSettings.jwtSecret,
//       async (error, decode) => {
//         if (error)
//           return resp.status(401).send({
//             response: `AUthorization failed`,
//           });
//         // set the decode property of the request to provide the status of the token verification
//         req.decode = decode;
//         await sequelize.sync({ force: false });

//         let okay = decode.usr;
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
//           let data = await WardBoyModel.findAll();
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

// async getWardBoyDatabyID(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log(`this is main id ---${id}`);
//   await sequelize.sync({ force: false });
//   let row = await WardBoyModel.findOne({ where: { Wardboy_id: id } });
//   console.log(`this is data ${JSON.stringify(row)}`);
//   if (row) {
//     return resp.status(200).send({
//       // message: "Data is Read Successfully",
//       rows: row,
//     });
//   }
//   return resp
//     .status(404) // internal server error
//     .send({ message: `WardBoy-${id} is not present, add new WardBoy` });
// }

// async putWardBoyData(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log(`this is put id ---${id}`);
//   let pro = req.body;
//   console.log(`this is body id ---${JSON.stringify(pro)}`);

//   await sequelize.sync({ force: false });
//   let row = await WardBoyModel.update(
//     {
//       Wardboy_id: pro.Wardboy_id,
//       Wardboy_Name: pro.Wardboy_Name,
//       Wardboy_Email: pro.Wardboy_Email,
//       Wardboy_Age: pro.Wardboy_Age,
//       Wardboy_Gender: pro.Wardboy_Gender,
//       Wardboy_Address: pro.Wardboy_Address,
//       Wardboy_Phoneno: pro.Wardboy_Phoneno,
//       Wardboy_Addhaar: pro.Wardboy_Addhaar,
//       Wardboy_Ward: pro.Wardboy_Ward,
//       Wardboy_salary: pro.Wardboy_salary,
//     },
//     {
//       where: { Wardboy_id: id },
//     }
//   );
//   if (row) {
//     return resp.status(200).send({
//       // message: "Data is Read Successfully",
//       rows: row,
//     });
//   }
//   return resp
//     .status(404) // internal server error
//     .send({ message: `WardBoy-${id} is not present, add new WardBoy` });
// }

// async AddWardBoyData(req, resp) {
//   let prod = req.body;
//   await sequelize.sync({ force: false });
//   let rec = WardBoyModel.create(prod)
//     .then((response) => {
//       console.log(`in then ${response}`);
//       return resp
//         .status(200)
//         .send(JSON.stringify("Data is Added Successfully"));
//     })
//     .catch((err) => {
//       return resp
//         .status(500)
//         .send(
//           `Error Occured : ${err.message} The DeptNo may already be present in DataBase`
//         );
//     });
// }

// async DeleteWardBoyData(req, resp) {
//   let id = parseInt(req.params.id);
//   console.log("inside delete");
//   await sequelize
//     .sync({ force: false })
//     .then(() =>
//       WardBoyModel.destroy({
//         where: { Wardboy_id: id },
//       })
//     )
//     .then((data) => {
//       resp.status(200).send({
//         message: "Data is Deleted Successfully",
//         rows: data,
//       });
//     })
//     .catch((error) => {
//       resp.status(500).send({
//         message: "Some Error Occured, please check the id you have passed!",
//         errorDetails: error.message,
//       });
//     });
// }
// }

// module.exports = AuthLogic;
