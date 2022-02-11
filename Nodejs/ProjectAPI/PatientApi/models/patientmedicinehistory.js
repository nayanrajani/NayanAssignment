const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patientmedicinehistory', {
    PatientMedicineHistory_id: {
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
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Patient_Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Patient_Phoneno: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: "Patient_Phoneno"
    },
    Patient_Disease: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Prescription: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'patientmedicinehistory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PatientMedicineHistory_id" },
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
