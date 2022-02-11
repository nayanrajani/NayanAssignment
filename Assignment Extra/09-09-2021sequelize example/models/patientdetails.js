const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patientdetails', {
    Patient_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctordetails',
        key: 'Doctor_id'
      }
    },
    Patient_Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Patient_Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Patient_Gender: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Patient_Address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Patient_Phoneno: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    Patient_Disease: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Patient_Patient_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Patient_Ward_type: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Patient_Room_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'patientdetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Patient_id" },
        ]
      },
      {
        name: "Doctor_id",
        using: "BTREE",
        fields: [
          { name: "Doctor_id" },
        ]
      },
    ]
  });
};
