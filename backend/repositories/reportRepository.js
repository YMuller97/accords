/**
 * @file reportRepository.js
 * @brief Repository for report-related database operations
 */

const Report = require("../models/report.model")

/**
 * @file reportRepository.js
 * @brief Repository for report-related database operations
 */
const ReportRepository = {

    /**
     * @function getUnresolvedReports
     * @async
     * @description Retrieves all unresolved reports from the database
     * @returns {Promise<Array>} A promise that resolves to an array of unresolved report objects
     * @throws {Error} If there's an error during the database operation
     */
    getUnresolvedReports: async () => {
        try {
            const unresolvedReports = await Report.findAll({
                where : {
                    is_processed : false
                }
            });
            return unresolvedReports;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération des signalements", error);
            throw error;
        }
    },

    /**
     * @function getResolvedReports
     * @async
     * @description Retrieves all resolved reports from the database
     * @returns {Promise<Array>} A promise that resolves to an array of resolved report objects
     * @throws {Error} If there's an error during the database operation
     */
    getResolvedReports: async () => {
        try {
            const resolvedReports = await Report.findAll({
                where : {
                    is_processed : true
                }
            });
            return resolvedReports;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération des signalements", error);
            throw error;
        }
    },

    /**
     * @function getOneReport
     * @async
     * @description Retrieves a specific report by its ID from the database
     * @param {number} id_report - The ID of the report to retrieve
     * @returns {Promise<Object|null>} A promise that resolves to the report object if found, or null if not found
     * @throws {Error} If there's an error during the database operation
     */
    getOneReport: async (id_report) => {
        try {
            const report = await Report.findOne({
                where: {
                    id_report: id_report
                }
            })
            
            return report;
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération du signalement", error);
            throw error;
        }
    },

    /**
     * @function addReport
     * @async
     * @description Adds a new report to the database
     * @param {Object} report - The report object to add
     * @returns {Promise<Object>} A promise that resolves to the newly created report object
     * @throws {Error} If there's an error during the database operation
     */
    addReport: async (report) => {
        try {
            const newReport = await Report.create(report);
            return newReport;
        } catch (error) {
            console.error("Une erreur est survenue lors de l'ajout du signalement", error);
            throw error;
        }
    },

    /**
     * @function removeReport
     * @async
     * @description Removes a specific report from the database by its ID
     * @param {number} id_report - The ID of the report to remove
     * @returns {Promise<number>} A promise that resolves to the number of deleted rows (should be 1 if successful)
     * @throws {Error} If there's an error during the database operation
     */
    removeReport: async (id_report) => {
        try {
            const reportToDelete = await Report.destroy({where : {id_report: id_report}});
            return reportToDelete;
        } catch (error) {
            console.error("Une erreur est survenue lors de la suppression du signalement", error);
            throw error;
        }
    },

    /**
     * @function resolveReport
     * @async
     * @description Updates a specific report's status to resolved in the database by its ID
     * @param {Object} is_processed - The updated status object (e.g., `{ is_processed: true }`)
     * @param {number} id_report - The ID of the report to resolve
     * @returns {Promise<number>} A promise that resolves to the number of updated rows (should be 1 if successful)
     * @throws {Error} If there's an error during the database operation
     */
    resolveReport: async (is_processed, id_report) => {
        try {
            const reportToResolve = await Report.update(is_processed, { where: { id_report: id_report } });
            return reportToResolve;
        } catch (error) {
            console.error("Une erreur est survenue lors de la résolution du signalement", error);
            throw error;
        }
    }
}

module.exports = ReportRepository;