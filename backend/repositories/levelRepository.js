/**
 * @file levelRepository.js
 * @brief Repository for level-related database operations
 */

const Level = require("../models/level.model");

/**
 * @namespace levelRepository
 * @description Handles database operations for skill levels
 */
const levelRepository = {
    
    /**
     * @function getAllLevels
     * @async
     * @description Retrieves all skill levels from the database
     * @returns {Promise<Array>} A promise that resolves to an array of level objects
     * @throws {Error} If there's an error during the database operation
     */
    getAllLevels: async () => {
        try {
            const levels = await Level.findAll();
            return levels;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération des niveaux", error);
            throw error;
        }
    },

    /**
     * @function getLevelById
     * @async
     * @description Retrieves a skill level by its ID from the database
     * @param {number} id - The ID of the level to retrieve
     * @returns {Promise<Object|null>} A promise that resolves to the level object if found, or null if not found
     * @throws {Error} If there's an error during the database operation
     */
    getLevelById: async (id) => {
        try {
            const level = await Level.findByPk(id);
            return level;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération du niveau"+ id +": ", error);
            throw error;
        }
    }
}
module.exports = levelRepository;