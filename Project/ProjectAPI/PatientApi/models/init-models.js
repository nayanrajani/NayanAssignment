var DataTypes = require("sequelize").DataTypes;
var _billdetails = require("./billdetails");
var _canteendetails = require("./canteendetails");
var _dischargedetails = require("./dischargedetails");
var _doctordetails = require("./doctordetails");
var _medicinedetails = require("./medicinedetails");
var _nurse = require("./nurse");
var _patientdetails = require("./patientdetails");
var _role = require("./role");
var _roomdetails = require("./roomdetails");
var _staffdetails = require("./staffdetails");
var _user = require("./user");
var _userinrole = require("./userinrole");
var _wardboy = require("./wardboy");
var _warddetails = require("./warddetails");

function initModels(sequelize) {
  var billdetails = _billdetails(sequelize, DataTypes);
  var canteendetails = _canteendetails(sequelize, DataTypes);
  var dischargedetails = _dischargedetails(sequelize, DataTypes);
  var doctordetails = _doctordetails(sequelize, DataTypes);
  var medicinedetails = _medicinedetails(sequelize, DataTypes);
  var nurse = _nurse(sequelize, DataTypes);
  var patientdetails = _patientdetails(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var roomdetails = _roomdetails(sequelize, DataTypes);
  var staffdetails = _staffdetails(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var userinrole = _userinrole(sequelize, DataTypes);
  var wardboy = _wardboy(sequelize, DataTypes);
  var warddetails = _warddetails(sequelize, DataTypes);

  userinrole.belongsTo(role, { as: "Role", foreignKey: "RoleId"});
  role.hasMany(userinrole, { as: "userinroles", foreignKey: "RoleId"});
  userinrole.belongsTo(user, { as: "User", foreignKey: "UserId"});
  user.hasMany(userinrole, { as: "userinroles", foreignKey: "UserId"});

  return {
    billdetails,
    canteendetails,
    dischargedetails,
    doctordetails,
    medicinedetails,
    nurse,
    patientdetails,
    role,
    roomdetails,
    staffdetails,
    user,
    userinrole,
    wardboy,
    warddetails,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
