/**
 * @file conversationRoutes.js
 * @brief Express router for conversation-related endpoints
 */

const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const auth = require('../middleware/auth');

/**
 * @middleware auth
 * @description Applies authentication middleware to all routes in this router
 * @affects All routes defined after this middleware
 */
router.use(auth);

/**
 * @route POST /
 * @description Add a new conversation
 * @access Public
 */
router.post('/', conversationController.addConv);

/**
 * @route POST /admin
 * @description Add a new conversation (admin version)
 * @access Public
 */
router.post('/admin', conversationController.addConv);

/**
 * @route POST /check
 * @description Check if a conversation exists between two users
 * @access Public
 */
router.post('/check', conversationController.checkExistingConv);

/**
 * @route POST /check-admin
 * @description Check if a conversation exists between two users (admin version)
 * @access Public
 */
router.post('/check-admin', conversationController.checkExistingAdminConv);

/**
 * @route GET /user/:userId
 * @description Get all conversations for a specific user
 * @access Public
 */
router.get('/user/:userId', conversationController.getAllConvByUserId);

/**
 * @route GET /admin/:adminId
 * @description Get all conversations for a specific admin
 * @access Public
 */
router.get('/admin/:adminId', conversationController.getAllConvByAdminId);

/**
 * @route GET /:convId
 * @description Get a single conversation by its ID
 * @access Public
 */
router.get('/:convId', conversationController.getOneConv);

/**
 * @route PUT /:convId
 * @description Update an existing conversation
 * @access Public
 */
router.put('/:convId', conversationController.updateConv);

/**
 * @route DELETE /:convId
 * @description Delete a conversation
 * @access Public
 */
router.delete('/:convId', conversationController.deleteConv);

module.exports = router;