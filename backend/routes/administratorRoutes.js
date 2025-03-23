/**
 * @file administratorRoutes.js
 * @brief Express router for administrator-related endpoints
 */

const express = require('express');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const administratorController = require('../controllers/administratorController');
const router = express.Router();

/**
 * @route GET /
 * @description Retrieve all administrators
 * @access Private (Admin only)
 */
router.get('/', auth, isAdmin, administratorController.getAllAdmins);

/**
 * @route GET /me
 * @description Retrieve the profile of the currently authenticated administrator
 * @access Private
 */
router.get("/me", auth, administratorController.getProfile);

/**
 * @route POST /auth
 * @description Authenticate an administrator
 * @access Public
 */
router.post('/auth', administratorController.signIn);

module.exports = router;