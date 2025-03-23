/**
 * @file genreService.js
 * @brief Service layer for genre-related operations
 */

const genreRepository = require("../repositories/genreRepository")
const preferRepository = require("../repositories/preferRepository")

/**
 * @namespace genreService
 * @description Provides business logic for genre-related operations
 */
const genreService = {

  /**
   * @function getAllGenres
   * @async
   * @description Retrieves all musical genres from the database
   * @returns {Promise<Array>} A promise that resolves to an array of genre objects
   * @throws {Error} If an error occurs during the operation
   */
  getAllGenres: async () => {
    try {
      // Call the repository method
      const genres = await genreRepository.getAllGenres();
      return genres;
    } catch (error) {
      console.error("Une erreur est survenue dans le service genre musical : ", error);
      throw error;
    }
  },

  /**
   * @function getGenreById
   * @async
   * @description Retrieves a specific genre by its ID from the database
   * @param {number} id - The ID of the genre to retrieve
   * @returns {Promise<Object|null>} A promise that resolves to the genre object if found, or null if not found
   * @throws {Error} If an error occurs during the operation
   */
  getGenreById: async (id) => {
    try {
      // Call the repository method
      const genre = await genreRepository.getGenreById(id);
      return genre;
    } catch (error) {
      console.error("Une erreur est survenue dans le service genre musical : ", error);
      throw error;
    }
  },

  /**
   * @function getPreferedGenres
   * @async
   * @description Retrieves all preferred genres for a specific user from the database
   * @param {number} id - The ID of the user whose preferred genres are being retrieved
   * @returns {Promise<Array>} A promise that resolves to an array of preferred genre objects
   * @throws {Error} If an error occurs during the operation
   */
  getPreferedGenres: async (id) => {
    try {
      // Call the repository method
      const preferedGenres = await preferRepository.getPreferedGenres(id);
      return preferedGenres;
    } catch (error) {
      console.error("Une erreur est survenue dans le service genre musical : ", error);
      throw error;
    }
  },
};

module.exports = genreService;