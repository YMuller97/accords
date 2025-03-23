/** @file reportController.js
 *  @brief Controller for reports operations
 */

const reportService = require("../services/reportService");

/**
 * @namespace reportController
 * @description Controller object containing methods to handle reports requests
 */
const reportController = {

    /**
     * @function getUnresolvedReports
     * @async
     * @description Retrieve all unresolved reports
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getUnresolvedReports: async (req, res) => {
        try {
            const reports = await reportService.getUnresolvedReports();
            res.status(200).json(reports);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des signalements non résolus", error: error.message });
        }
    },

    /**
     * @function getResolvedReports
     * @async
     * @description Retrieve all resolved reports
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getResolvedReports: async (req, res) => {
        try {
            const reports = await reportService.getResolvedReports();
            res.status(200).json(reports);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des signalements résolus", error: error.message });
        }
    },

    /**
     * @function getOneReport
     * @async
     * @description Retrieve a single report by its ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getOneReport: async (req, res) => {
        const { id_report } = req.params;
        try {
            const report = await reportService.getOneReport(id_report);
            if (report) {
                res.status(200).json(report);
            } else {
                res.status(404).json({ message: "Signalement non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du signalement", error: error.message });
        }
    },

    /**
     * @function addReport
     * @async
     * @description Add a new report
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    addReport: async (req, res) => {
        try {
            const newReport = await reportService.addReport(req.body);
            res.status(201).json({ message: "Signalement créé avec succès", report: newReport });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du signalement", error: error.message });
        }
    },

    /**
     * @function removeReport
     * @async
     * @description Remove a report by its ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    removeReport: async (req, res) => {
        const { id_report } = req.params;
        try {
            await reportService.removeReport(id_report);
            res.status(200).json({ message: "Signalement supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du signalement", error: error.message });
        }
    },

    /**
     * @function resolveReport
     * @async
     * @description Resolve a report by its ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    resolveReport: async (req, res) => {
        const { id_report } = req.params;
        const is_processed = req.body;
        try {
            const resolvedReport = await reportService.resolveReport(is_processed, id_report);
            res.status(200).json({ message: "Signalement résolu avec succès", report: resolvedReport });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la résolution du signalement", error: error.message });
        }
    }
};

module.exports = reportController;