const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userinrole', {
    RelationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'UserId'
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'RoleId'
      }
    }
  }, {
    sequelize,
    tableName: 'userinrole',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RelationId" },
        ]
      },
      {
        name: "RelationId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RelationId" },
        ]
      },
      {
        name: "UserId",
        using: "BTREE",
        fields: [
          { name: "UserId" },
        ]
      },
      {
        name: "RoleId",
        using: "BTREE",
        fields: [
          { name: "RoleId" },
        ]
      },
    ]
  });
};
