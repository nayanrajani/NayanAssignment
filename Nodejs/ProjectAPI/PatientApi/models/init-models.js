var DataTypes = require("sequelize").DataTypes;
var _billdetails = require("./billdetails");
var _canteendetails = require("./canteendetails");
var _dischargedetails = require("./dischargedetails");
var _doctordetails = require("./doctordetails");
var _historypharmacy = require("./historypharmacy");
var _medicinedetails = require("./medicinedetails");
var _medicineissuedetails = require("./medicineissuedetails");
var _nurse = require("./nurse");
var _patientdetails = require("./patientdetails");
var _patientmedicinedetails = require("./patientmedicinedetails");
var _patientmedicinehistory = require("./patientmedicinehistory");
var _pharmacymedicineprovidedetails = require("./pharmacymedicineprovidedetails");
var _role = require("./role");
var _roomdetails = require("./roomdetails");
var _staffdetails = require("./staffdetails");
var _user = require("./user");
var _wardboy = require("./wardboy");
var _warddetails = require("./warddetails");

function initModels(sequelize) {
  var billdetails = _billdetails(sequelize, DataTypes);
  var canteendetails = _canteendetails(sequelize, DataTypes);
  var dischargedetails = _dischargedetails(sequelize, DataTypes);
  var doctordetails = _doctordetails(sequelize, DataTypes);
  var historypharmacy = _historypharmacy(sequelize, DataTypes);
  var medicinedetails = _medicinedetails(sequelize, DataTypes);
  var medicineissuedetails = _medicineissuedetails(sequelize, DataTypes);
  var nurse = _nurse(sequelize, DataTypes);
  var patientdetails = _patientdetails(sequelize, DataTypes);
  var patientmedicinedetails = _patientmedicinedetails(sequelize, DataTypes);
  var patientmedicinehistory = _patientmedicinehistory(sequelize, DataTypes);
  var pharmacymedicineprovidedetails = _pharmacymedicineprovidedetails(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var roomdetails = _roomdetails(sequelize, DataTypes);
  var staffdetails = _staffdetails(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var wardboy = _wardboy(sequelize, DataTypes);
  var warddetails = _warddetails(sequelize, DataTypes);

  billdetails.belongsTo(canteendetails, { as: "Order", foreignKey: "Order_id"});
  canteendetails.hasMany(billdetails, { as: "billdetails", foreignKey: "Order_id"});
  billdetails.belongsTo(doctordetails, { as: "Doctor", foreignKey: "Doctor_id"});
  doctordetails.hasMany(billdetails, { as: "billdetails", foreignKey: "Doctor_id"});
  patientdetails.belongsTo(doctordetails, { as: "Doctor", foreignKey: "Doctor_id"});
  doctordetails.hasMany(patientdetails, { as: "patientdetails", foreignKey: "Doctor_id"});
  billdetails.belongsTo(patientdetails, { as: "Patient", foreignKey: "Patient_id"});
  patientdetails.hasMany(billdetails, { as: "billdetails", foreignKey: "Patient_id"});
  billdetails.belongsTo(patientmedicinedetails, { as: "Patient_Medicine", foreignKey: "Patient_Medicine_id"});
  patientmedicinedetails.hasMany(billdetails, { as: "billdetails", foreignKey: "Patient_Medicine_id"});
  patientdetails.belongsTo(roomdetails, { as: "Patient_Room_no_roomdetail", foreignKey: "Patient_Room_no"});
  roomdetails.hasMany(patientdetails, { as: "patientdetails", foreignKey: "Patient_Room_no"});

  return {
    billdetails,
    canteendetails,
    dischargedetails,
    doctordetails,
    historypharmacy,
    medicinedetails,
    medicineissuedetails,
    nurse,
    patientdetails,
    patientmedicinedetails,
    patientmedicinehistory,
    pharmacymedicineprovidedetails,
    role,
    roomdetails,
    staffdetails,
    user,
    wardboy,
    warddetails,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
