/**
 * @file userRoutes.js
 * @brief Express router for user-related endpoints
 */

const express = require("express");
const userController = require("../controllers/userController.js");
const auth = require("../middleware/auth.js");
const upload = require("../middleware/multerConfig.js");
const router = express.Router();

// Commented out imports for potential future use
// const NodeGeocoder = require('node-geocoder')
// const geolib = require('geolib');
// const locationController = require("../controllers/locationController");

// const geocoder = NodeGeocoder({
//     provider: 'openstreetmap'
// })

/**
 * @route GET /
 * @description Retrieve all users
 * @access Public
 */
router.get("/", userController.getAllUsers);

/**
 * @route GET /me
 * @description Retrieve the profile of the authenticated user
 * @access Private (requires authentication)
 */
router.get("/me", auth, userController.getProfile);

/**
 * @route PATCH /me
 * @description Update the profile of the authenticated user, including uploading a profile picture
 * @access Private (requires authentication)
 */
router.patch(
  "/me",
  auth,
  upload.single("picture_user"),
  userController.updateUser
);

/**
 * @route POST /auth
 * @description Authenticate a user (sign in)
 * @access Public
 */
router.post("/auth", userController.signIn);

/**
 * @route POST /
 * @description Add a new user (sign up)
 * @access Public
 */
router.post("/", userController.addUser);

/**
 * @route GET /all
 * @description Retrieve all users with detailed information
 * @access Public
 */
router.get("/all", userController.getAllUsersAllInformations);

/**
 * @route GET /coordinates
 * @description Retrieve all users' coordinates
 * @access Public
 */
router.get("/coordinates", userController.getUsersCoordinates);

/**
 * @route GET /:userId
 * @description Retrieve a specific user by their ID
 * @param {string} userId - The ID of the user to retrieve
 * @access Public
 */
router.get("/:userId", userController.getUserById);

/**
 * @route GET /:userId/instruments
 * @description Retrieve all instruments played by a specific user
 * @param {string} userId - The ID of the user to retrieve instruments for
 * @access Public
 */
router.get("/:userId/instruments", userController.getPlayedInstruments);

/**
 * @route GET /:userId/genres
 * @description Retrieve all preferred genres of a specific user
 * @param {string} userId - The ID of the user to retrieve preferred genres for
 * @access Public
 */
router.get("/:userId/genres", userController.getPreferedGenres);

/**
 * @route DELETE /:userId
 * @description Delete a specific user by their ID
 * @param {string} userId - The ID of the user to delete
 * @access Public (should likely be restricted in production)
 */
router.delete("/:userId", userController.deleteUser);

/**
 * @route GET /:userId/favs 
 * @description Retrieve users saved as favorites by a specific user
 * @param {string} userId - The ID of the user whose favorites are being retrieved
 * @access Public (should likely be restricted in production)
 */
router.get("/:userId/favs", userController.getUserFavs);

/**
 * @route POST /:userId/favs
 * @description Save a user as favorite for a specific user
 * @param {string} userId - The ID of the user adding a favorite
 * @body {Object} favId - The ID of the user to be added as a favorite
 * @access Public (should likely be restricted in production)
 */
router.post("/:userId/favs", userController.addUserFav);

/**
 * @route DELETE /:userId/favs/:favId
 * @description Delete a specific user from a specific user's favorites list
 * @param {string} userId - The ID of the user removing a favorite
 * @param {string} favId - The ID of the user to be removed from favorites
 * @access Public (should likely be restricted in production)
 */
router.delete("/:userId/favs/:favId", userController.deleteUserFav);

module.exports = router;