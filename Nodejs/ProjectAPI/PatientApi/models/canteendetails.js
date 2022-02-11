const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('canteendetails', {
    Order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Item_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Item_Buyer: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Item_Total: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'canteendetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Order_id" },
        ]
      },
    ]
  });
};
