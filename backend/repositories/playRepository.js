/**
 * @file playRepository.js
 * @brief Repository for play-related database operations
 */

const Play = require("../models/play.model");
const Instrument = require("../models/instrument.model");
const Level = require("../models/level.model");

/**
 * @namespace playRepository
 * @description Handles database operations for user-instrument relationships
 */
const playRepository = {
    
    /**
     * @function getPlayedInstruments
     * @async
     * @description Retrieves all instruments played by a specific user
     * @param {number} userId - The ID of the user
     * @returns {Promise<Array>} A promise that resolves to an array of played instrument objects
     * @throws {Error} If there's an error during the database operation
     */
    getPlayedInstruments: async (userId) => {
        try {
            const playedInstruments = await Play.findAll({
                where : {
                    id_user : userId
                },
                include: [Instrument, Level]
            });
            return playedInstruments;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération des instruments", error);
            throw error;
        }
    },
    
    /**
     * @function checkOnePlayedInstrument
     * @async
     * @description Checks if a user plays a specific instrument and returns the level
     * @param {number} userId - The ID of the user
     * @param {number} instrumentId - The ID of the instrument
     * @returns {Promise<number>} A promise that resolves to the level ID if found, or 0 if not found
     * @throws {Error} If there's an error during the database operation
     */
    checkOnePlayedInstrument: async (userId, instrumentId) => {
        try {
            const played = await Play.findOne({
                where: {
                    id_user: userId,
                    id_instrument: instrumentId
                }
            })
            if(played) {
                console.log("Pratique trouvée pour user ", userId, " : instrument ", instrumentId, " niveau retourné : ", played.id_level);
                return played.id_level;
            }
            else
                return 0;
        }
        catch (error) {
            console.error("Une erreur est survenue lors de la vérification d'une préférence utilisateur", error);
            throw error;
        }
    },

    /**
     * @function addPlayedInstrument
     * @async
     * @description Adds a new played instrument for a user
     * @param {number} id_user - The ID of the user
     * @param {number} id_instrument - The ID of the instrument
     * @param {number} id_level - The ID of the skill level
     * @throws {Error} If there's an error during the database operation
     */
    addPlayedInstrument: async (id_user, id_instrument, id_level) => {
        try {
            await Play.create({id_user, id_level, id_instrument});
        }
        catch (error) {
            console.error("Play repository : Une erreur est survenue lors de l'ajout d'un instrument à l'utilisateur n°", id_user, " : ", error);
            throw error;
        }
    },
    
    /**
     * @function updateLevel
     * @async
     * @description Updates the skill level for a user's played instrument
     * @param {number} userId - The ID of the user
     * @param {number} instrumentId - The ID of the instrument
     * @param {number} levelId - The new level ID
     * @throws {Error} If there's an error during the database operation
     */
    updateLevel: async (userId, instrumentId, levelId) => {
        try {
            await Play.update({id_level: levelId}, {
                where: {
                    id_user: userId,
                    id_instrument: instrumentId
                }
            })
        }
        catch (error) {
            console.error("Play repository : Une erreur est survenue lors de la modification du niveau de pratique");
            throw error;
        }
    },

    /**
     * @function removePlayedInstrument
     * @async
     * @description Removes a played instrument for a user
     * @param {number} userId - The ID of the user
     * @param {number} instrumentId - The ID of the instrument to remove
     * @throws {Error} If there's an error during the database operation
     */
    removePlayedInstrument: async (userId, instrumentId) => {
        try {
            await Play.destroy({where: {
                id_user: userId,
                id_instrument: instrumentId
            }})
        }
        catch (error) { 
            console.error("Play repository : Une erreur est survenue lors de la suppression d'un instrument joué");
            throw error;
        }
    }
}

module.exports = playRepository;