/**
 * @file auth.js
 * @brief Authentication middleware for JWT token verification.
 */

const jwt = require("jsonwebtoken");

/**
 * @function auth
 * @brief Middleware for authenticating and authorizing requests using JWT.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const auth = (req, res, next) => { 
    try { 
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(" ")[1]; 
        // Check the token using the secret key
        const decodedToken = jwt.verify(token, 'secret');

        if (decodedToken.role === 'admin') {
            /**
             * @typedef {Object} AdminAuth
             * @property {string} email_admin - The email of the admin.
             * @property {number} id_admin - The ID of the admin.
             * @property {boolean} isAdmin - Indicates if the user is an admin.
             */

            // Add the admin's email and ID to the request object
            req.auth = { 
                email_admin: decodedToken.sub, 
                id_admin: decodedToken.userId,
                isAdmin: true
            };
        } else {
            /**
             * @typedef {Object} UserAuth
             * @property {string} email_user - The email of the user.
             * @property {number} id_user - The ID of the user.
             * @property {boolean} isAdmin - Indicates if the user is an admin.
             */
            
            // Add the user's email and ID to the request object
            req.auth = { 
                email_user: decodedToken.sub, 
                id_user: decodedToken.userId,
                isAdmin: false
            };
        }
        next(); 
    } catch (error) { 
        // If token is invalid or any other error occurs, send a 401 Unauthorized response
        res.status(401).json({ error: "Authentification invalide" }); 
    } 
}

module.exports = auth;