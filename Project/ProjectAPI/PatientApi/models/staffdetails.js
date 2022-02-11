const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staffdetails', {
    Staff_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Staff_Designation: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Staff_Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Staff_Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Staff_Email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "Staff_Email"
    },
    Staff_Gender: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Staff_Phoneno: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: "Staff_Phoneno"
    },
    Staff_Address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Staff_Addhaar: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Staff_Salary: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'staffdetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Staff_id" },
        ]
      },
      {
        name: "Staff_Phoneno",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Staff_Phoneno" },
        ]
      },
      {
        name: "Staff_Email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Staff_Email" },
        ]
      },
    ]
  });
};
