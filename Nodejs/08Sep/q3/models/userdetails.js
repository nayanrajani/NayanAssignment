const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userdetails', {
    user_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    pass_word: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'userdetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_name" },
        ]
      },
    ]
  });
};
