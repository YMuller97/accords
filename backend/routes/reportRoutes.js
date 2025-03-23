/**
 * @file reportRoutes.js
 * @brief Express router for report-related endpoints
 */

const express = require('express');
const reportController = require("../controllers/reportController");
const router = express.Router();

/**
 * @route GET /unresolved
 * @description Retrieve all unresolved reports
 * @access Public
 */
router.get('/unresolved', reportController.getUnresolvedReports);

/**
 * @route GET /resolved
 * @description Retrieve all resolved reports
 * @access Public
 */
router.get('/resolved', reportController.getResolvedReports);

/**
 * @route GET /:id_report
 * @description Retrieve a specific report by its ID
 * @param {string} id_report - The ID of the report to retrieve
 * @access Public
 */
router.get('/:id_report', reportController.getOneReport);

/**
 * @route POST /
 * @description Create a new report
 * @access Public
 */
router.post('/', reportController.addReport);

/**
 * @route DELETE /:id_report
 * @description Delete a specific report
 * @param {string} id_report - The ID of the report to delete
 * @access Public
 */
router.delete('/:id_report', reportController.removeReport);

/**
 * @route PUT /resolve/:id_report
 * @description Modify the status of a report to resolved
 * @param {string} id_report - The ID of the report to resolve
 * @access Public
 */
router.put('/resolve/:id_report', reportController.resolveReport);

module.exports = router;