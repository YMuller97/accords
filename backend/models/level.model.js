/**
 * @file Level.js
 * @brief Defines the Sequelize model for skill levels
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");


/**
 * @class Level
 * @brief Sequelize model representing a skill level in the system
 */
const Level = sequelize.define('Level', {
  /**
   * @property {integer} id_level - Unique identifier for the level (primary key and foreign key)
   */
  id_level: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    foreignKey: true
  },
  /**
   * @property {string} label_level - Description of the level (60 characters max)
   */
  label_level: {
    type: DataTypes.STRING(60),
  }
}, {
  tableName: 'levels',
  timestamps: false // Disables createdAt/updatedAt fields (no automatic timestamps)
});

module.exports = Level