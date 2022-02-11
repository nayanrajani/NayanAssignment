const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roomdetails', {
    Room_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Room_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "Room_no"
    },
    Room_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Room_floor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Room_bed: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Room_charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'roomdetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Room_Id" },
        ]
      },
      {
        name: "Room_no",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Room_no" },
        ]
      },
    ]
  });
};
