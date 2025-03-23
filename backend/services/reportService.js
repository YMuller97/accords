/**
 * @file reportService.js
 * @brief Service layer for report-related operations
 */

const reportRepository = require("../repositories/reportRepository");

/**
 * @namespace ReportService
 * @description Provides business logic for report-related operations
 */
const ReportService = {

    /**
     * @function getUnresolvedReports
     * @async
     * @description Retrieves all unresolved reports from the database
     * @returns {Promise<Array>} A promise that resolves to an array of unresolved report objects
     * @throws {Error} If an error occurs during the operation
     */
    getUnresolvedReports: async () => {
        try {
            const unresolvedReports = await reportRepository.getUnresolvedReports();
            return unresolvedReports;
        } catch (error) {
            console.error("Une erreur est survenue dans le service des signalements", error);
            throw error;
        }
    },

    /**
     * @function getResolvedReports
     * @async
     * @description Retrieves all resolved reports from the database
     * @returns {Promise<Array>} A promise that resolves to an array of resolved report objects
     * @throws {Error} If an error occurs during the operation
     */
    getResolvedReports: async () => {
        try {
            const resolvedReports = await reportRepository.getResolvedReports();
            return resolvedReports;
        } catch (error) {
            console.error("Une erreur est survenue dans le service des signalements", error);
            throw error;
        }
    },

    /**
     * @function getOneReport
     * @async
     * @description Retrieves a specific report by its ID from the database
     * @param {number} id_report - The ID of the report to retrieve
     * @returns {Promise<Object|null>} A promise that resolves to the report object if found, or null if not found
     * @throws {Error} If an error occurs during the operation
     */
    getOneReport: async (id_report) => {
        try {
            const report = await reportRepository.getOneReport(id_report);
            return report;
        } catch (error) {
            console.error("Une erreur est survenue dans le service des signalements", error);
            throw error;
        }
    },

    /**
     * @function addReport
     * @async
     * @description Adds a new report to the database
     * @param {Object} report - The report object to be added
     * @returns {Promise<Object>} A promise that resolves to the newly created report object
     * @throws {Error} If an error occurs during the operation
     */
    addReport: async (report) => {
        try {
            const newReport = await reportRepository.addReport(report);
            return newReport;
        } catch (error) {
            console.error("Une erreur est survenue dans le service des signalements", error);
            throw error;
        }
    },

    /**
     * @function removeReport
     * @async
     * @description Removes a specific report from the database
     * @param {number} id_report - The ID of the report to be removed
     * @returns {Promise<number>} A promise that resolves to the number of deleted rows (should be 1 if successful)
     * @throws {Error} If an error occurs during the operation
     */
    removeReport: async (id_report) => {
        try {
            const reportToDelete = await reportRepository.removeReport(id_report);
            return reportToDelete;
        } catch (error) {
            console.error("Une erreur est survenue dans le service des signalements", error);
            throw error;
        }
    },

    /**
     * @function resolveReport
     * @async
     * @description Marks a specific report as resolved in the database
     * @param {boolean} is_resolved - The resolution status to set for the report
     * @param {number} id_report - The ID of the report to be resolved
     * @returns {Promise<Object>} A promise that resolves to the updated report object
     * @throws {Error} If an error occurs during the operation
     */
    resolveReport: async (is_resolved, id_report) => {
        try {
            const reportToResolve = await reportRepository.resolveReport(is_resolved, id_report)
            return reportToResolve;
        } catch (error) {
            console.error("Une erreur est survenue lors de la résolution du signalement", error);
            throw error;
        }
    }
}
module.exports = ReportService;