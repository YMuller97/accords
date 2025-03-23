const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");

const Fav = sequelize.define('Fav', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    id_fav: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    }
}, {
    tableName: 'is_favorite',
    timestamps: false
});

module.exports = Fav;