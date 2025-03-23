/**
 * @file instrumentRepository.js
 * @brief Repository for instrument-related database operations
 */

const Instrument = require("../models/instrument.model");

/**
 * @namespace instrumentRepository
 * @description Handles database operations for musical instruments
 */
const instrumentRepository = {
    
    /**
     * @function getAllInstruments
     * @async
     * @description Retrieves all musical instruments from the database
     * @returns {Promise<Array>} A promise that resolves to an array of instrument objects
     * @throws {Error} If there's an error during the database operation
     */
    getAllInstruments: async () => {
        try {
            const instruments = await Instrument.findAll();
            return instruments;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération des instruments", error);
            throw error;
        }
    },
    
    /**
     * @function getInstrumentById
     * @async
     * @description Retrieves a musical instrument by its ID from the database
     * @param {number} id - The ID of the instrument to retrieve
     * @returns {Promise<Object|null>} A promise that resolves to the instrument object if found, or null if not found
     * @throws {Error} If there's an error during the database operation
     */
    getInstrumentById: async (id) => {
        try {
            const instrument = await Instrument.findByPk(id);
            return instrument;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération de l'instrument"+ id +": ", error);
            throw error;
        }
    }
}

module.exports = instrumentRepository;