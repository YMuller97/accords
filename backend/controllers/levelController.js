/** @file levelController.js
 *  @brief Controller for level-related operations
 */

const levelService = require("../services/levelService");

/**
 * @namespace levelController
 * @description Controller object containing methods to handle level-related requests
 */
const levelController = {

    /**
     * @function getAllLevels
     * @async
     * @description Retrieve all levels
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getAllLevels: async (req, res) => {
        try {
        // Call the repository method
        const levels = await levelService.getAllLevels();
        res.status(200).json(levels);
        } catch (error) {
            console.error("Une erreur est servenue dans le controller level : ", error);
            // Respond with a 500 status Internal Server Error
            res.status(500).json({message: "Erreur lors de la récupération des niveaux."});
        }
    },

    /**
     * @function getLevelById
     * @async
     * @description Retrieve a level by its ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getLevelById: async (req, res) => {
        try {
        // Call the repository method
        const id = req.params.id;
        const level = await levelService.getLevelById(id);
        res.status(200).json(level);
        } catch (error) {
            console.error("Une erreur est servenue dans le controller level : ", error);
            // Respond with a 500 status Internal Server Error
            res.status(400).json({message: "Erreur lors de la récupération des niveaux."});
        }
    }
};

module.exports = levelController;