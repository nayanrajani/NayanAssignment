const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicinedetails', {
    Order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Medicine_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Medicine_Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Medicine_Type: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Medicine_Manufacturer: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Medicine_manufac_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Medicine_expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Medicine_Inward_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Medicine_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'medicinedetails',
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
