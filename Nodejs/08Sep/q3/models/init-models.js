var DataTypes = require("sequelize").DataTypes;
var _productdetails = require("./productdetails");
var _userdetails = require("./userdetails");

function initModels(sequelize) {
  var productdetails = _productdetails(sequelize, DataTypes);
  var userdetails = _userdetails(sequelize, DataTypes);


  return {
    productdetails,
    userdetails,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
