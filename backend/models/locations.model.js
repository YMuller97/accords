/**
 * @file Location.js
 * @brief Defines the Sequelize model for geographical locations
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");


/**
 * @class Location
 * @brief Sequelize model representing a geographical location in the system
 */
const Location = sequelize.define('Location', {
    /**
     * @property {integer} id_location - Unique identifier for the location (primary key and foreign key)
     */
    id_location: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    /**
     * @property {string} postal_code - Postal code of the location (10 characters max, part of composite primary key)
     */
    postal_code: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false
    },
    /**
     * @property {float} latitude - Latitude coordinate of the location
     */
    latitude: {
      type: DataTypes.FLOAT
    },
    /**
     * @property {float} longitude - Longitude coordinate of the location
     */
    longitude: {
        type: DataTypes.FLOAT
    }

  }, {
    tableName: 'locations',
    timestamps: false // Disables createdAt/updatedAt fields (no automatic timestamps)
  });

  module.exports = Location

