const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patientdetails', {
    Patient_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Patient_Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Patient_Email: {
      type: DataTypes.STRING(100),
      allowNull: true
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
      allowNull: false,
      unique: "Patient_Phoneno"
    },
    Patient_Addhaar: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Patient_Disease: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Patient_Ward_type: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Patient_Room_no: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Doctor_Name: {
      type: DataTypes.STRING(200),
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
        name: "Patient_Phoneno",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Patient_Phoneno" },
        ]
      },
    ]
  });
};
