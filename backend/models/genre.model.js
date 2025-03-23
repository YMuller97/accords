/**
 * @file Genre.js
 * @brief Defines the Sequelize model for musical genres
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");

/**
 * @class Genre
 * @brief Sequelize model representing a musical genre in the system
 * 
 * This model implements a hierarchy of musical genres using the id_parent field.
 */
const Genre = sequelize.define('Genre', {
    /**
     * @property {integer} id_genre - Unique identifier for the musical genre (primary key)
     */
    id_genre: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    /**
     * @property {string} name_genre - Name of the musical genre (30 characters max)
     */
    name_genre: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    /**
     * @property {integer} id_parent - Identifier of the parent genre (foreign key)
     */
    id_parent: {
        type: DataTypes.INTEGER,
        foreignKey: true
    }

  }, {
    tableName: 'musical_genres',
    timestamps: false // Disables createdAt/updatedAt fields (no automatic timestamps)
  });


  module.exports = Genre
