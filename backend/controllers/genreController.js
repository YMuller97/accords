/** @file genreController.js
 *  @brief Controller for musical genres operations
 */

const genreService = require("../services/genreService");

/**
 * @namespace genreController
 * @description Controller object containing methods to handle musical genres requests
 */
const genreController = {

  /**
   * @function getAllGenres
   * @async
   * @description Retrieve all genres
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getAllGenres: async (req, res) => {
    try {
      // Call the service method
      const genres = await genreService.getAllGenres();
      res.status(200).json(genres);
    } catch (error) {
      console.error("Une erreur est servenue dans le controller genres : ", error);
      // Respond with a 500 status Internal Server Error
      res.status(500).json({message: "Erreur lors de la récupération des genres."});
    }
  },

  /**
   * @function getGenreById
   * @async
   * @description Retrieve a genre by its ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getGenreById: async (req, res) => {
    try {
      // Call the service method
      const id = req.params.id;
      const genre = await genreService.getGenreById(id);
      res.status(200).json(genre);
    } catch (error) {
      console.error("Une erreur est servenue dans le controller genres : ", error);
      // Respond with a 500 status Internal Server Error
      res.status(400).json({message: "Erreur lors de la récupération du genre."});
    }
  }
};

module.exports = genreController;