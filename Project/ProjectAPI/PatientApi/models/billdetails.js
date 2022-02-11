const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('billdetails', {
    bill_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Patient_Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Doctor_Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Doctor_Charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Medicine_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Room_charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Item_Total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    no_of_days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    otherlabcharge: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Bill_Total: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'billdetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bill_no" },
        ]
      },
    ]
  });
};
