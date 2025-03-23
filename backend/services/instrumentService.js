/**
 * @file instrumentService.js
 * @brief Service layer for instrument-related operations
 */

const instrumentRepository = require("../repositories/instrumentRepository")
const playRepository = require("../repositories/playRepository")

/**
 * @namespace instrumentService
 * @description Provides business logic for instrument-related operations
 */
const instrumentService = {

  /**
   * @function getAllInstruments
   * @async
   * @description Retrieves all instruments from the database
   * @returns {Promise<Array>} A promise that resolves to an array of instrument objects
   * @throws {Error} If an error occurs during the operation
   */
  getAllInstruments: async () => {
    try {
      // Call the repository method
      const instruments = await instrumentRepository.getAllInstruments();
      return instruments;
    } catch (error) {
      console.error("Une erreur est survenue dans le service instrument : ", error);
      throw error;
    }
  },

  /**
   * @function getInstrumentById
   * @async
   * @description Retrieves a specific instrument by its ID from the database
   * @param {number} id - The ID of the instrument to retrieve
   * @returns {Promise<Object|null>} A promise that resolves to the instrument object if found, or null if not found
   * @throws {Error} If an error occurs during the operation
   */
  getInstrumentById: async (id) => {
    try {
      // Call the repository method
      const instrument = await instrumentRepository.getInstrumentById(id);
      return instrument;
    } catch (error) {
      console.error("Une erreur est survenue dans le service instrument : ", error);
      throw error;
    }
  },

  /**
   * @function getPlayedInstruments
   * @async
   * @description Retrieves all instruments played by a specific user from the database
   * @param {number} id - The ID of the user whose played instruments are being retrieved
   * @returns {Promise<Array>} A promise that resolves to an array of played instrument objects
   * @throws {Error} If an error occurs during the operation
   */
  getPlayedInstruments: async (id) => {
    try {
      // Call the repository method
      const playedInstruments = await playRepository.getPlayedInstruments(id);
      return playedInstruments;
    } catch (error) {
      console.error("Une erreur est survenue dans le service instrument : ", error);
      throw error;
    }
  },
};

module.exports = instrumentService;