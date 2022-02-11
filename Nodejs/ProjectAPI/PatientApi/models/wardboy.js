const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wardboy', {
    Wardboy_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Wardboy_Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Wardboy_Email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Wardboy_Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Wardboy_Gender: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Wardboy_Address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Wardboy_Phoneno: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: "Wardboy_Phoneno"
    },
    Wardboy_Addhaar: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Wardboy_Ward: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Wardboy_salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'wardboy',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Wardboy_id" },
        ]
      },
      {
        name: "Wardboy_Phoneno",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Wardboy_Phoneno" },
        ]
      },
    ]
  });
};
