/**
 * @file User.js
 * @brief Defines the Sequelize model for the User entity
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");
const Location = require("./locations.model");
const Prefer = require("./prefer.model");
const Play = require("./play.model");
const Fav = require('./fav.model')

/**
 * @class User
 * @brief Sequelize model representing a user in the system
 */
const User = sequelize.define(
  "User",
  {
    /**
     * @property {integer} id_user - Unique identifier for the user (primary key)
     */
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    /**
     * @property {string} picture_user - URL or path to the user's profile picture
     */
    picture_user: {
      type: DataTypes.STRING(255),
    },
    /**
     * @property {string} name_user - Last name of the user (30 characters max)
     */
    name_user: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    /**
     * @property {string} first_name_user - First name of the user (30 characters max)
     */
    first_name_user: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    /**
     * @property {string} alias_user - Alias or nickname of the user (optional, 30 characters max)
     */
    alias_user: {
      type: DataTypes.STRING(30),
    },
    /**
     * @property {integer} birth_date_user - Birth year of the user
     */
    birth_date_user: {
      type: DataTypes.INTEGER,
    },
    /**
     * @property {string} email_user - Email address of the user (unique, 30 characters max)
     */
    email_user: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    /**
     * @property {string} password_user - Hashed password of the user
     */
    password_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    /**
     * @property {string} postal_code_user - Postal code associated with the user's location
     */
    postal_code_user: {
      type: DataTypes.STRING(10),
    },
    /**
     * @property {string} location_user - Name or description of the user's location (50 characters max)
     */
    location_user: {
      type: DataTypes.STRING(50),
    },
    /**
     * @property {integer} time_by_week - Time spent on musical activities per week (in hours)
     */
    time_by_week: {
      type: DataTypes.INTEGER,
    },
    /**
     * @property {integer} time_available - Time available for musical activities per week (in hours)
     */
    time_available: {
      type: DataTypes.INTEGER,
    },
    /**
     * @property {string} description_user - Description or bio of the user (500 characters max)
     */
    description_user: {
      type: DataTypes.STRING(500)
    }
  }, {
    tableName: 'users',
    timestamps: false // Disables createdAt/updatedAt fields (no automatic timestamps)
  });

/**
 * @brief Defines the relationship between User and Location models
 */
User.belongsTo(Location, {
  foreignKey: "postal_code_user",
  targetKey: "postal_code",
});

/**
 * @brief Defines the relationship between User and Prefer models
 */
User.hasMany(Prefer, { foreignKey: 'id_user' });

/**
 * @brief Defines the relationship between User and Play models
 */
User.hasMany(Play, { foreignKey: 'id_user' });

/**
 * @brief Defines the relationship between User and Fav models
 * @description A User can have many Favs (favorites)
 */
User.hasMany(Fav, {foreignKey: 'id_user'});

/**
 * @brief Defines the inverse relationship between Fav and User models
 * @description A Fav belongs to a User
 */
Fav.belongsTo(User, {foreignKey: {name: 'id_user', allowNull: false}, sourceKey: 'id_user'})

/**
 * @brief Defines the relationship between Prefer and User models
 */
Prefer.belongsTo(User, {foreignKey: {name: 'id_user',allowNull: false}, sourceKey :'id_user'});

/**
 * @brief Defines the relationship between Play and User models
 */
Play.belongsTo(User, { foreignKey: 'id_user', sourceKey :'id_user'});

module.exports = User;