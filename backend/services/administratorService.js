/**
 * @file administratorService.js
 * @brief Service layer for administrator-related operations
 */

const administratorRepository = require("../repositories/administratorRepository");

/**
 * @namespace administratorService
 * @description Provides business logic for administrator-related operations
 */
const administratorService = {

    /**
     * @function getAllAdmins
     * @async
     * @description Retrieves all administrators from the database
     * @returns {Promise<Array>} A promise that resolves to an array of administrator objects
     * @throws {Error} If an error occurs during the operation
     */
    getAllAdmins: async () => {
        try {
            // Call the repository method
            const admins = await administratorRepository.getAllAdmins();
            return admins;
          } catch (error) {
            console.error(
              "Une erreur est survenue dans le service administrateur (getAllAdmins): ",
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
     * @returns {Promise<Object>} A promise that resolves to the administrator object if found
     * @throws {Error} If the email is undefined, empty, or if the administrator is not found
     */
    getAdminByEmail: async (email_admin) => {
        try {
            // Check if email is provided
            if (!email_admin) {
              throw new Error("L'email est undefined ou vide");
            }
            // Call the repository method
            const admin = await administratorRepository.getAdminByEmail(email_admin);
            // Check if user exists
            if (!admin) {
              throw new Error("Administrateur non trouvé");
            }
            return admin;
          } catch (error) {
            console.error(
              "Une erreur est survenue dans le service administrateur (getAdminByEmail): ",
              error
            );
            throw error;
        }
    }
};

module.exports = administratorService;