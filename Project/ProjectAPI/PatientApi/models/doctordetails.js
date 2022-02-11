const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctordetails', {
    Doctor_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Doctor_Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Doctor_Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Doctor_Email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "Doctor_Email"
    },
    Doctor_Gender: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Doctor_Phoneno: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: "Doctor_Phoneno"
    },
    Doctor_Address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Doctor_Addhaar: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Doctor_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Doctor_Specialization: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Doctor_Charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'doctordetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Doctor_id" },
        ]
      },
      {
        name: "Doctor_Phoneno",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Doctor_Phoneno" },
        ]
      },
      {
        name: "Doctor_Email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Doctor_Email" },
        ]
      },
    ]
  });
};
