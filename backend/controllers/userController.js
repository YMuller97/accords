/**
 * @file userController.js
 * @brief Controller for user-related operations.
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const instrumentService = require("../services/instrumentService");
const userService = require("../services/userService");
const genreService = require("../services/genreService");


/**
 * @namespace userController
 * @brief Controller object containing methods to handle user-related requests.
 */
const userController = {
  
  /**
   * @function getAllUsers
   * @async
   * @brief Method to retrieve all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getAllUsers: async (req, res) => {
    try {
      // Call the service method
      const users = await userService.getAllUsers();
      // Respond with the retrieved users and a 200 (OK) status
      res.status(200).json(users);
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le controller utilisateur : ",
        error
      );
      // Respond with a 500 status Internal Server Error
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
  },

  /**
   * @function getUsersCoordinates
   * @async
   * @brief Method to retrieve all users' coordinates.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getUsersCoordinates: async (req, res) => {
    try {
      const coordinates = await userService.getUsersCoordinates();
      res.status(200).json(coordinates);
    } catch (error) {
      console.error(
        "Une erreur est servenue dans le controller utilisateur : ",
        error
      );
      // Respond with a 500 status Internal Server Error
      res.status(500).json({
        message:
          "Erreur lors de la récupération des coordonnées des utilisateurs.",
      });
    }
  },

  /**
   * @function signIn
   * @async
   * @brief Method to handle user sign-in.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  signIn: async (req, res) => {
    try {
      const { email_user, password_user } = req.body;
      // Call the service method
      const user = await userService.getUserByEmail(email_user);
      // Check if the provided password matches the stored hash
      const isVerify = await bcrypt.compare(password_user, user.password_user);
      if (!isVerify) {
        return res.status(401).json({ message: "Non autorisé" });
      }
      // Generate a JWT token for the authenticated user
      const token = jwt.sign(
        { sub: email_user, userId: user.id_user },
        "secret",
        { expiresIn: "12h" }
      );
      // Respond with the retrieved users and a 200 (OK) status
      res.status(200).json({ token });
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le controller utilisateur : ",
        error
      );
      // Respond with a 401 status Unauthorized
      res
        .status(401)
        .json({ message: error.message || "Authentification échouée" });
    }
  },

  /**
   * @function addUser
   * @async
   * @brief Method to add a new user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  addUser: async (req, res) => {
    try {
      const { name_user, first_name_user, email_user, password_tohash } =
        req.body;
      // Hash the provided password
      const password_user = await bcrypt.hash(password_tohash, 10);
      // Add the new user to the database with the service method
      await userService.addUser({
        name_user,
        first_name_user,
        email_user,
        password_user,
      });
      res.status(201).json({ message: "Utilisateur ajouté avec succès!" });
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le controller utilisateur : ",
        error
      );
      res
        .status(400)
        .json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
  },

  /**
   * @function deleteUser
   * @async
   * @brief Method to delete a user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      await userService.deleteUser(userId);
      res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      res
        .status(400)
        .json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
  },

  /**
   * @function getProfile
   * @async
   * @brief Method to retrieve the profile of the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getProfile: async (req, res) => {
    try {
      // Extract the email from the authentication token
      const email_user = req.auth.email_user;

      if (!email_user) {
        return res
          .status(400)
          .json({ message: "Email manquant dans le token" });
      }
      // Retrieve the user's profile information
      const user = await userService.getUserByEmail(email_user);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Remove the password from the user object before sending the response
      const { password_user, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du profil" });
    }
  },

  /**
   * @function getUserById
   * @async
   * @brief Method to retrieve a user by its ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getUserById: async (req, res) => {
    try {
      // Call the service method
      // console.debug("get user by id params : ", req.params);
      const userId = req.params.userId;
      const user = await userService.getUserById(userId);
      // Respond with the retrieved a user and a 200 (OK) status
      res.status(200).json(user);
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le controller utilisateur (getUserById): ",
        error
      );
      // Respond with a 500 (Internal Server Error) status
      res
        .status(400)
        .json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
  },

  /**
   * @function getPlayedInstruments
   * @async
   * @brief Method to retrieve the instruments played by a user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getPlayedInstruments: async (req, res) => {
    try {
      // Call the service method
      // console.debug(req.params);
      const userId = req.params.userId;
      const playedInstruments = await instrumentService.getPlayedInstruments(
        userId
      );
      // Respond with the retrieved instruments and a 200 (OK) status
      res.status(200).json(playedInstruments);
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le controller utilisateur : ",
        error
      );
      // Respond with a 500 (Internal Server Error) status
      res.status(400).json({
        message:
          "Erreur lors de la récupération des instruments des utilisateurs.",
      });
    }
  },

  /**
   * @function getPreferedGenres
   * @async
   * @brief Method to retrieve the preferred musical genres of a user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getPreferedGenres: async (req, res) => {
    try {
      // Call the service method
      // console.debug(req.params);
      const userId = req.params.userId;
      const preferedGenres = await genreService.getPreferedGenres(userId);
      // Respond with the retrieved genres and a 200 (OK) status
      res.status(200).json(preferedGenres);
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le controller utilisateur: ",
        error
      );
      // Respond with a 500 (Internal Server Error) status
      res.status(400).json({
        message:
          "Erreur lors de la récupération des genres musicaux des utilisateurs.",
      });
    }
  },

  /**
   * @function updateUser
   * @async
   * @brief Method to update user information.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  updateUser: async (req, res) => {
    try {
      const newData = {
        ...req.body,
        picture_user: req.file ? `/uploads/${req.file.filename}` : undefined,
      };
      // console.log("Controlleur :", req.file);
      // Extract the email from the authentication Token
      const email_user = req.auth.email_user;
      if (!email_user) {
        return res
          .status(400)
          .json({ message: "Email manquant dans le token" });
      }

      // Check if a user with the provided email exists
      const user_to_update = await userService.getUserByEmail(email_user);
      if (!user_to_update) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Check if the user identified by email has the same id as the logged user, if not return error 403
      if (user_to_update.id_user !== req.auth.id_user) {
        return res.status(403).json({
          message:
            "Erreur : tentative de modification d'un utilisateur différent de l'utilisateur connecté",
        });
      }

      // Call the service method
      await userService.updateUser(newData, user_to_update.id_user);
      res
        .status(200)
        .json({ message: "Utilisateur modifié avec succès!", newData });
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le controller utilisateur : ",
        error
      );
      res
        .status(400)
        .json({ message: "Erreur lors de la modification d'un utilisateur." });
    }
  },

  /**
   * @function getAllUsersAllInformations
   * @async
   * @brief Method to retrieve all users with all their information.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getAllUsersAllInformations: async (req, res) => {
    try {
      const users = await userService.getAllUsersAllInformations();
      res.status(200).json(users);
    } catch (error) {
      console.error(
        "Une erreur est servenue dans le controller utilisateur : ",
        error
      );
      res.status(500).json({
        message:
          "Erreur lors de la récupération des utilisateurs et de toutes leurs informations.",
      });
    }
  },

  getUserFavs: async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    if(!user) {
      throw new Error("Erreur dans le controller utilisateur : utilisateur introuvable ")
    }
    try {
      const favs = await userService.getUserFavs(userId);
      res.status(200).json(favs);
    } catch(error) {
      console.error( "Une erreur est servenue dans le controller utilisateur : ", error);
      res.status(500).json({ message: "Erreur dans le controller lors de la récupération des favoris d'un utilisateur."});
    }
  },

  /**
   * @function getAllUsersFavs
   * @async
   * @description Retrieves all users' favorites
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<void>}
   */
  getAllUsersFavs: async (req, res) => {
    try {
      const allFavs = await userService.getAllUsersFavs();
      // console.log("user controller : favs :", allFavs);
      res.status(200).json(allFavs);
    } catch(error) {
      console.error( "Une erreur est servenue dans le controller utilisateur : ", error);
      res.status(500).json({ message: "Erreur dans le controller lors de la récupération des favoris."}); 
    }
  },

  /**
   * @function addUserFav
   * @async
   * @description Adds a new favorite for a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<void>}
   */
  addUserFav: async (req, res) => {
    try {
      const userId = req.params.userId;
      const favId = req.body.favId;
      const user = await userService.getUserById(userId);
      const fav = await userService.getUserById(favId);

      if(!user || !fav) {
        throw new Error("Erreur dans le controller utilisateur : utilisateurs introuvables ")
      }
      const newFav = await userService.addUserFav(userId, favId);
      res.status(201).json({message: "Favori ajouté avec succès", newFav})
    } catch(error) {
      console.error( "Une erreur est servenue dans le controller utilisateur : ", error);
      res.status(500).json({ message: "Erreur dans le controller lors de l'ajout d'un favori."});
    }
  },

  /**
   * @function deleteUserFav
   * @async
   * @description Deletes a user's favorite
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<void>}
   */
  deleteUserFav: async (req, res) => {
    const userId = req.params.userId;
    const favId = req.params.favId;
    // console.log("controller : fav : ", favId, " user : ", userId)
    try {
      const fav = await userService.checkIsFav(userId, favId)
      if(!fav) {
        throw new Error("Favori introuvable.")
      } 
      await userService.deleteUserFav(userId, favId);
      res.status(200).json({message: "Favori supprimé avec succès."})
    } catch(error) {
      console.error( "Une erreur est servenue dans le controller utilisateur : ", error);
      res.status(500).json({ message: "Erreur dans le controller lors de la suppression d'un favori."});
    }
  }
};

module.exports = userController;
