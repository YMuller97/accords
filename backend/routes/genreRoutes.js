/**
 * @file genreRoutes.js
 * @brief Express router for genre-related endpoints
 */

const express = require("express");
const genreController = require("../controllers/genreController");

const router = express.Router();

/**
 * @route GET /
 * @description Retrieve all musical genres
 * @access Public
 */
router.get("/", genreController.getAllGenres);

/**
 * @route GET /:genreId
 * @description Retrieve a specific musical genre by its ID
 * @param {string} genreId - The ID of the genre to retrieve
 * @access Public
 */
router.get("/:genreId", genreController.getGenreById);

module.exports = router;
