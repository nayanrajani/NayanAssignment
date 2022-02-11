const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nurse', {
    Nurse_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nurse_Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Nurse_Email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Nurse_Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Nurse_Gender: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Nurse_Address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Nurse_Phoneno: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: "Nurse_Phoneno"
    },
    Nurse_Addhaar: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Nurse_Room: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Nurse_salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'nurse',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Nurse_id" },
        ]
      },
      {
        name: "Nurse_Phoneno",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Nurse_Phoneno" },
        ]
      },
    ]
  });
};
