/**
 * @file preferRepository.js
 * @brief Repository for preference-related database operations
 */

const Prefer = require("../models/prefer.model");
const Genre = require("../models/genre.model");

/**
 * @namespace PreferRepository
 * @description Handles database operations for user genre preferences
 */
const PreferRepository = {
    
    /**
     * @function getPreferedGenres
     * @async
     * @description Retrieves all preferred genres for a specific user
     * @param {number} userId - The ID of the user
     * @returns {Promise<Array>} A promise that resolves to an array of preferred genre objects
     * @throws {Error} If there's an error during the database operation
     */
    getPreferedGenres: async (userId) => {
        try {
            const preferedGenres = await Prefer.findAll({
                where : {
                    id_user : userId
                },
                include: [Genre]
            });
            return preferedGenres;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération des genres", error);
            throw error;
        }
    },
    
    /**
     * @function checkOnePreferedGenre
     * @async
     * @description Checks if a user has a specific genre as a preference
     * @param {number} userId - The ID of the user
     * @param {number} genreId - The ID of the genre
     * @returns {Promise<boolean>} A promise that resolves to true if the preference exists, false otherwise
     * @throws {Error} If there's an error during the database operation
     */
    checkOnePreferedGenre: async (userId, genreId) => {
        try {
            const pref = await Prefer.findOne({
                where: {
                    id_user: userId,
                    id_genre: genreId
                }
            })
            if(pref) {
                console.log("Preference trouvée pour user ", userId, " genre ", genreId);
                return true;
            }
            else
                return false;
        }
        catch (error) {
            console.error("Une erreur est survenue lors de la vérification d'une préférence utilisateur", error);
            throw error;
        }
    },

    /**
     * @function addPreferedGenre
     * @async
     * @description Adds a new preferred genre for a user
     * @param {number} id_user - The ID of the user
     * @param {number} id_genre - The ID of the genre
     * @throws {Error} If there's an error during the database operation
     */
    addPreferedGenre: async (id_user, id_genre) => {
        try {
            await Prefer.create({id_user, id_genre});
        }
        catch (error) {
            console.error("Prefer repository : Une erreur est survenue lors de l'ajout d'un genre aux préférences de l'utilisateur n°", id_user, " : ", error);
            throw error;
        }
    },

    /**
     * @function removePreferedGenre
     * @async
     * @description Removes a preferred genre for a user
     * @param {number} userId - The ID of the user
     * @param {number} genreId - The ID of the genre to remove
     * @throws {Error} If there's an error during the database operation
     */
    removePreferedGenre: async (userId, genreId) => {
        try {
            await Prefer.destroy({where : {id_user: userId, id_genre: genreId}});
        }
        catch (error) {
            console.error("Prefer repository : Une erreur est survenue lors de l'ajout d'un genre aux préférences de l'utilisateur n°", userId, " : ", error);
            throw error;
        }
    }
}

module.exports = PreferRepository;