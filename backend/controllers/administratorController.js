/** @file administratorController.js
 *  @brief Controller for administrators operations
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const administratorService = require("../services/administratorService");

/**
 * @namespace administratorController
 * @description Controller object containing methods for administrators operations
 */
const administratorController = {

  /**
   * @function getAllAdmins
   * @async
   * @description Retrieves all administrators
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getAllAdmins: async (req, res) => {
    try {
      // Call the service method
      const admins = await administratorService.getAllAdmins();
      // Respond with the retrieved users and a 200 (OK) status
      res.status(200).json(admins);
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le controller administrateur : ",
        error
      );
      // Respond with a 500 status Internal Server Error
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des administrateurs." });
    }
  },

  /**
   * @function signIn
   * @async
   * @description Authenticates an administrator
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  signIn: async (req, res) => {
    try {
      const { email_admin, password_admin } = req.body;
      // Call the service method
      const admin = await administratorService.getAdminByEmail(email_admin);
      // Check if the provided password matches the stored hash
      const isVerify = await bcrypt.compare(password_admin, admin.password_admin);
      if (!isVerify) {
        return res.status(401).json({ message: "Non autorisé" });
      }
      // Generate a JWT token for the authenticated admin
      const token = jwt.sign(
        { sub: email_admin, userId: admin.id_admin, role: 'admin' },
        "secret",
        { expiresIn: "12h" }
      );
      // Respond with the retrieved users and a 200 (OK) status
      res.status(200).json({ token });
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le controller administrateur : ",
        error
      );
      // Respond with a 401 status Unauthorized
      res
        .status(401)
        .json({ message: error.message || "Authentification échouée" });
    }
  },

  /**
   * @function getProfile
   * @async
   * @description Retrieves the profile of an authenticated administrator
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getProfile: async (req, res) => {
    try {
      // Extract the email from the authentication token
      const email_admin = req.auth.email_admin;

      if (!email_admin) {
        return res
          .status(400)
          .json({ message: "Email manquant dans le token" });
      }
      // Retrieve the user's profile information
      const admin = await administratorService.getAdminByEmail(email_admin);
      if (!admin) {
        return res.status(404).json({ message: "Administrateur non trouvé" });
      }

      // Remove the password from the user object before sending the response
      const { password_admin, ...adminWithoutPassword } = admin;
      res.status(200).json(adminWithoutPassword);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du profil" });
    }
  }
}

module.exports = administratorController;