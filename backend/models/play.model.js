/**
 * @file Play.js
 * @brief Defines the Sequelize model for the Play entity, representing the relationship between users, instruments, and skill levels
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");
const Instrument = require("../models/instrument.model");
const Level = require("../models/level.model");

/**
 * @class Play
 * @brief Sequelize model representing the relationship between a user, an instrument, and a skill level
 */
const Play = sequelize.define('Play', {
    /**
     * @property {integer} id_user - User identifier (part of composite primary key, foreign key)
     */
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    /**
     * @property {integer} id_level - Level identifier (part of composite primary key, foreign key)
     */
    id_level: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    /**
     * @property {integer} id_instrument - Instrument identifier (part of composite primary key, foreign key)
     */
    id_instrument: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    }

  }, {
    tableName: 'play',
    timestamps: false // Disables createdAt/updatedAt fields (no automatic timestamps)
  });

  /**
   * @brief Defines the relationship between Play and Instrument models
   */
  Play.belongsTo(Instrument, {foreignKey: {name: 'id_instrument',allowNull: false}, sourceKey :'id_instrument'});
  /**
   * @brief Defines the relationship between Play and Level models
   */
  Play.belongsTo(Level, {foreignKey: {name: 'id_level',allowNull: false}, sourceKey :'id_level'});
  
  module.exports = Play