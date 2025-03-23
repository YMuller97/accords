/**
 * @file levelService.js
 * @brief Service layer for level-related operations
 */

const levelRepository = require("../repositories/levelRepository")

/**
 * @namespace levelService
 * @description Provides business logic for level-related operations
 */
const levelService = {

  /**
   * @function getAllLevels
   * @async
   * @description Retrieves all levels from the database
   * @returns {Promise<Array>} A promise that resolves to an array of level objects
   * @throws {Error} If an error occurs during the operation
   */
  getAllLevels: async () => {
    try {
      // Call the repository method
      const levels = await levelRepository.getAllLevels();
      return levels;
    } catch (error) {
      console.error("Une erreur est servenue dans le service level : ", error);
      throw error;
    }
  },

  /**
   * @function getLevelById
   * @async
   * @description Retrieves a specific level by its ID from the database
   * @param {number} id - The ID of the level to retrieve
   * @returns {Promise<Object|null>} A promise that resolves to the level object if found, or null if not found
   * @throws {Error} If an error occurs during the operation
   */
  getLevelById: async (id) => {
    try {
      // Call the repository method
      const level = await levelRepository.getLevelById(id);
      return level;
    } catch (error) {
      console.error("Une erreur est servenue dans le service level : ", error);
      throw error;
    }
  }
};

module.exports = levelService;