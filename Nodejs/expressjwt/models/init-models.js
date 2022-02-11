var DataTypes = require("sequelize").DataTypes;
var _department = require("./department");
var _user = require("./user");

function initModels(sequelize) {
  var department = _department(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    department,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
