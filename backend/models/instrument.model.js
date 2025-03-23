/**
 * @file Instrument.js
 * @brief Defines the Sequelize model for musical instruments
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");

/**
 * @class Instrument
 * @brief Sequelize model representing a musical instrument in the system
 */
const Instrument = sequelize.define('Instrument', {
  /**
     * @property {integer} id_instrument - Unique identifier for the instrument (primary key)
     */
    id_instrument: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    /**
     * @property {string} name_instrument - Name of the instrument (30 characters max)
     */
    name_instrument: {
      type: DataTypes.STRING(30),
      allowNull: false
    },

  }, {
    tableName: 'instruments',
    timestamps: false // Disables createdAt/updatedAt fields (no automatic timestamps)
  });


  module.exports = Instrument