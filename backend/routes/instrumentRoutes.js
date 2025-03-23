/**
 * @file instrumentRoutes.js
 * @brief Express router for instrument-related endpoints
 */

const express = require("express");
const instrumentController = require("../controllers/instrumentController");

const router = express.Router();

/**
 * @route GET /
 * @description Retrieve all musical instruments
 * @access Public
 */
router.get("/", instrumentController.getAllInstruments);

/**
 * @route GET /:instrumentId
 * @description Retrieve a specific musical instrument by its ID
 * @param {string} instrumentId - The ID of the instrument to retrieve
 * @access Public
 */
router.get("/:instrumentId", instrumentController.getInstrumentById);

module.exports = router;
