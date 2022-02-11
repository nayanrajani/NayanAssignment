var DataTypes = require("sequelize").DataTypes;
var _Department = require("./Department");

function initModels(sequelize) {
  var Department = _Department(sequelize, DataTypes);


  return {
    Department,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
