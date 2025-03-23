/**
 * @file Administrator.js
 * @brief Defines the Sequelize model for the Administrator entity.
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");

/**
 * @class Administrator
 * @brief Sequelize model representing an administrator in the system.
 */
const Administrator = sequelize.define(
    "Administrator",
    {
        /**
         * @property {integer} id_admin - The unique identifier for the administrator.
         */
        id_admin: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        /**
         * @property {string} name_admin - The name of the administrator.
         */
        name_admin: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        /**
         * @property {string} email_admin - The email address of the administrator.
         */
        email_admin: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        /**
         * @property {string} password_admin - The hashed password of the administrator.
         */
        password_admin: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'administrators',
        timestamps: false
    }
);

module.exports = Administrator;