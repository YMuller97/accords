/** @file instrumentController.js
 *  @brief Controller for instruments operations
 */

const instrumentService = require("../services/instrumentService");

/**
 * @namespace instrumentController
 * @description Controller object containing methods to handle instruments requests
 */
const instrumentController = {

    /**
     * @function getAllInstruments
     * @async
     * @description Retrieve all instruments
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getAllInstruments: async (req, res) => {
        try {
            // Call the repository method
            const instruments = await instrumentService.getAllInstruments();
            res.status(200).json(instruments);
        } catch (error) {
            console.error("Une erreur est servenue dans le controller instrument : ", error);
            // Respond with a 500 status Internal Server Error
            res.status(500).json({message: "Erreur lors de la récupération des instruments."});
        }
    },

    /**
     * @function getInstrumentById
     * @async
     * @description Retrieve an instrument by its ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getInstrumentById: async (req, res) => {
        try {
            // Call the repository method
            const id = req.params.id;
            const instrument = await instrumentService.getInstrumentById(id);
            res.status(200).json(instrument);
        } catch (error) {
            console.error("Une erreur est servenue dans le controller instrument : ", error);
            // Respond with a 500 status Internal Server Error
            res.status(500).json({message: "Erreur lors de la récupération de l'instrument."});
        }
    }
};
module.exports = instrumentController;