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

//Bill Model
const billModel = require(path.join(__dirname, "./../models/billdetails"))(
  sequelize,
  Sequelize.DataTypes
);
//Users Model
const usersModel = require(path.join(__dirname, "./../models/user"))(
  sequelize,
  Sequelize.DataTypes
);

class BillLogic {
  // Bill API Key----------------------------------------------------------------------
  async getBillData(req, resp) {
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
      let data = await billModel.findAll();
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
    //         let data = await billModel.findAll();
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
  }

  async getBillDatabyID(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is main id ---${id}`);
    await sequelize.sync({ force: false });
    let row = await billModel.findOne({ where: { bill_no: id } });
    console.log(`this is data ${JSON.stringify(row)}`);
    if (row) {
      return resp.status(200).send({
        // message: "Data is Read Successfully",
        rows: row,
      });
    }
    return resp
      .status(404) // internal server error
      .send({ message: `Bill-${id} is not present, add new Bill` });
  }

  async putBillData(req, resp) {
    let id = parseInt(req.params.id);
    console.log(`this is put id ---${id}`);
    let pro = req.body;
    console.log(`this is body id ---${JSON.stringify(pro)}`);

    await sequelize.sync({ force: false });
    let row = await billModel.update(
      {
        bill_no: pro.bill_no,
        Patient_id: pro.Patient_id,
        Patient_Name: pro.Patient_Name,
        Doctor_id: pro.Doctor_id,
        Doctor_Name: pro.Doctor_Name,
        Doctor_Charges: pro.Doctor_Charges,
        Medicine_price: pro.Medicine_price,
        Room_charges: pro.Room_charges,
        Item_Total: pro.Item_Total,
        no_of_days: pro.no_of_days,
        otherlabcharge: pro.otherlabcharge,
        Bill_Total: pro.Bill_Total,
      },
      {
        where: { bill_no: id },
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
      .send({ message: `Bill-${id} is not present, add new Bill` });
  }

  async AddBillData(req, resp) {
    let prod = req.body;
    await sequelize.sync({ force: false });
    let rec = billModel
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

  async DeleteBillData(req, resp) {
    let id = parseInt(req.params.id);
    await sequelize
      .sync({ force: false })
      .then(() =>
        billModel.destroy({
          where: { bill_no: id },
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
module.exports = BillLogic;
