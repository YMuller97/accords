/**
 * @file genreRepository.js
 * @brief Repository for genre-related database operations
 */

const Genre = require("../models/genre.model");

/**
 * @namespace genreRepository
 * @description Handles database operations for musical genres
 */
const genreRepository = {
    
    /**
     * @function getAllGenres
     * @async
     * @description Retrieves all musical genres from the database
     * @returns {Promise<Array>} A promise that resolves to an array of genre objects
     * @throws {Error} If there's an error during the database operation
     */
    getAllGenres: async () => {
        try {
            const genres = await Genre.findAll();
            return genres;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération des genres musicaux", error);
            throw error;
        }
    },

    /**
     * @function getGenreById
     * @async
     * @description Retrieves a musical genre by its ID from the database
     * @param {number} id - The ID of the genre to retrieve
     * @returns {Promise<Object|null>} A promise that resolves to the genre object if found, or null if not found
     * @throws {Error} If there's an error during the database operation
     */
    getGenreById: async (id) => {
        try {
            const genre = await Genre.findByPk(id);
            return genre;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération du genre musical"+ id +": ", error);
            throw error;
        }
    }
}
module.exports = genreRepository;