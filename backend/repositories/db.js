/**
 * @file db.js
 * @brief Database connection and configuration using Sequelize
 */

const { Sequelize, DataTypes } = require("sequelize");

/**
 * @constant {Sequelize} sequelize
 * @description Sequelize instance for database connection
 * @todo Set the password that will be used in the documentation
 */
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: "postgres",
});

/**
 * @function
 * @async
 * @description Test the connection to the database
 */
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion réussie à la base de données");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données :", err);
  });

/**
 * @function
 * @async
 * @description Synchronize the models with the database
 * @note `alter: true` updates existing tables to match the model definitions without dropping them
 * @note `force: false` disables the recreation of the db
 */
sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log("Les modèles ont été synchronisés avec la base de données.");
  })
  .catch((err) => {
    console.error("Erreur lors de la synchronisation des modèles :", err);
  });

module.exports = sequelize;
