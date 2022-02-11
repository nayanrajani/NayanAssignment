var DataTypes = require("sequelize").DataTypes;
var _patientdetails = require("./patientdetails");

function initModels(sequelize) {
  var patientdetails = _patientdetails(sequelize, DataTypes);

  patientdetails.belongsTo(doctordetails, { as: "Doctor", foreignKey: "Doctor_id"});
  doctordetails.hasMany(patientdetails, { as: "patientdetails", foreignKey: "Doctor_id"});

  return {
    patientdetails,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
