/**
 * @file administratorRepository.js
 * @brief Repository for administrator-related database operations
 */

const Administrator = require("../models/administrators.model");

/**
 * @namespace administratorRepository
 * @description Handles database operations for administrators
 */
const administratorRepository = {

    /**
     * @function getAllAdmins
     * @async
     * @description Retrieves all administrators from the database
     * @returns {Promise<Array>} A promise that resolves to an array of administrator objects
     * @throws {Error} If there's an error during the database operation
     */
    getAllAdmins: async () => {
        try {
            const admins = await Administrator.findAll();
            return admins;
        } catch (error) {
            console.error(
              "Une erreur est survenue lors de la récupération des administrateurs : ",
              error
            );
            throw error;
        }
    },

    /**
     * @function getAdminByEmail
     * @async
     * @description Retrieves an administrator by their email address
     * @param {string} email_admin - The email address of the administrator to retrieve
     * @returns {Promise<Object|null>} A promise that resolves to the administrator object if found, or null if not found
     * @throws {Error} If there's an error during the database operation
     */
    getAdminByEmail: async (email_admin) => {
        try {
          const admin = await Administrator.findOne({
            where: { email_admin: email_admin },
          });
          return admin;
        } catch (error) {
          console.error(
            "Une erreur est survenue lors de la récupération de l'administrateur : ",
            error
          );
          throw error;
        }
      }
};

module.exports = administratorRepository;