/**
 * @file levelRoutes.js
 * @brief Express router for skill level-related endpoints
 */

const express = require("express");
const levelController = require("../controllers/levelController");

const router = express.Router();

/**
 * @route GET /
 * @description Retrieve all skill levels
 * @access Public
 */
router.get("/", levelController.getAllLevels);

/**
 * @route GET /:levelId
 * @description Retrieve a specific skill level by its ID
 * @param {string} levelId - The ID of the skill level to retrieve
 * @access Public
 */
router.get("/:levelId", levelController.getLevelById);

module.exports = router;