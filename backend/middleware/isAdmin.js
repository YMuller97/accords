/**
 * @file isAdmin.js
 * @brief Middleware to check if the user has admin privileges.
 */

/**
 * @function isAdmin
 * @brief Middleware that verifies if the authenticated user has admin rights.
 * @param {Object} req - Express request object.  Assumes `req.auth` is populated by a previous authentication middleware.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const isAdmin = (req, res, next) => {
    if (req.auth && req.auth.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Accès refusé. Droits d'administration requis!"});
    }
}

module.exports = isAdmin;