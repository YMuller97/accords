/**
 * @file Prefer.js
 * @brief Defines the Sequelize model for the Prefer entity, representing the relationship between users and their preferred musical genres
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");
const Genre = require("./genre.model");
const User = require("./user.model");


/**
 * @class Prefer
 * @brief Sequelize model representing the preference relationship between a user and a musical genre
 */
const Prefer = sequelize.define('Prefer', {
    /**
     * @property {integer} id_user - User identifier (part of composite primary key, foreign key)
     */
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    /**
     * @property {integer} id_genre - Genre identifier (part of composite primary key, foreign key)
     */
    id_genre: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    }
  }, {
    tableName: 'prefer',
    timestamps: false // Disables createdAt/updatedAt fields (no automatic timestamps)
  });

  /**
   * @brief Defines the relationship between Prefer and Genre models
   * @note There might be an error in the sourceKey. It should probably be 'id_genre' instead of 'id_user'.
   */
  Prefer.belongsTo(Genre, {foreignKey: {name: 'id_genre',allowNull: false}, sourceKey :'id_user'});

  module.exports = Prefer