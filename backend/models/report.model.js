/**
 * @file Report.js
 * @brief Defines the Sequelize model for the Report entity
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../repositories/db");
const User = require("./user.model")

/**
 * @class Report
 * @brief Sequelize model representing a report in the system
 */
const Report = sequelize.define(
    "Report",
    {
        /**
         * @property {integer} id_report - Unique identifier for the report (primary key)
         */
        id_report: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        /**
         * @property {string} type_report - Type of the report (20 characters max)
         * @note Must be one of: 'Hate speech', 'Offensive name', 'NSFW Content', 'Harassment'
         */
        type_report: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                isIn: {
                args: [['Hate speech', 'Offensive name', 'NSFW Content', 'Harassment']],
                msg: "Le type de signalement n'est pas valide"
                }
            }
        },
        /**
         * @property {string} description_report - Detailed description of the report (500 characters max)
         */
        description_report: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        /**
         * @property {boolean} is_processed - Flag indicating if the report has been processed
         */
        is_processed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        /**
         * @property {integer} id_target_user - ID of the user being reported (foreign key to users table)
         */
        id_target_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id_user'
            }
        },
        /**
         * @property {integer} id_source_user - ID of the user making the report (foreign key to users table)
         */
        id_source_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id_user'
            }
        }
    }, {
        tableName: 'reports',
        timestamps: false
    }
);

/**
 * @brief Defines the relationship between Report and User models for the target user
 */
Report.belongsTo(User, {
    foreignKey: 'id_target_user',
    as: 'TargetUser'
});

/**
 * @brief Defines the relationship between Report and User models for the source user
 */
Report.belongsTo(User, {
    foreignKey: 'id_source_user',
    as: 'SourceUser'
});

module.exports = Report;