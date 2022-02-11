const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('billdetails', {
    Bill_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patientdetails',
        key: 'Patient_id'
      }
    },
    Patient_Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Patient_Disease: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctordetails',
        key: 'Doctor_id'
      }
    },
    Doctor_Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Doctor_Charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Doctor_Visit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Patient_Room_no: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Room_charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Patient_Medicine_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'patientmedicinedetails',
        key: 'PatientMedicine_id'
      }
    },
    Medicine_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'canteendetails',
        key: 'Order_id'
      }
    },
    Item_Total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    no_of_days: {
      type: DataTypes.INTEGER,
      allowNull: false
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
          { name: "Bill_no" },
        ]
      },
      {
        name: "FK_Patient_id",
        using: "BTREE",
        fields: [
          { name: "Patient_id" },
        ]
      },
      {
        name: "FK_PatientDoctor_id",
        using: "BTREE",
        fields: [
          { name: "Doctor_id" },
        ]
      },
      {
        name: "FK_Patient_Medicine_id",
        using: "BTREE",
        fields: [
          { name: "Patient_Medicine_id" },
        ]
      },
      {
        name: "FK_Order_id",
        using: "BTREE",
        fields: [
          { name: "Order_id" },
        ]
      },
    ]
  });
};
