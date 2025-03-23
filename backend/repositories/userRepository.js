/**
 * @file userRepository.js
 * @brief Repository for user-related database operations
 */

const User = require("../models/user.model");
const Location = require("../models/locations.model");
const Prefer = require("../models/prefer.model");
const Play = require("../models/play.model");
const Genre = require("../models/genre.model");
const Instrument = require("../models/instrument.model");
const Level = require("../models/level.model");
const Fav = require("../models/fav.model")

/**
 * @namespace userRepository
 * @description Handles database operations for users
 */
const userRepository = {
  
  /**
   * @function getAllUsers
   * @async
   * @description Retrieves all users from the database
   * @returns {Promise<Array>} A promise that resolves to an array of user objects
   * @throws {Error} If there's an error during the database operation
   */
  getAllUsers: async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la récupération des utilisateurs : ",
        error
      );
      throw error;
    }
  },

  /**
   * @function getUsersCoordinates
   * @async
   * @description Retrieves coordinates for all users with a location
   * @returns {Promise<Array>} A promise that resolves to an array of user coordinate objects
   * @throws {Error} If there's an error during the database operation
   */
  getUsersCoordinates: async () => {
    try {
      const users = await User.findAll({
        // we retrieve the postal_code attribute
        attributes: ["postal_code_user"],
        // Then we join with Location, retrieving longitude and latitude
        include: [
          {
            model: Location,
            attributes: ["latitude", "longitude"],
            // only users with a location are returned
            required: true,
          },
        ],
        // returns the results as simple js objects (raw)
        raw: true,
      });
      // Transforms the results into an array of objects containing
      // the postal code, latitude, and longitude of each user.
      return users.map((user) => ({
        postal_code: user.postal_code_user,
        latitude: parseFloat(user["Location.latitude"]),
        longitude: parseFloat(user["Location.longitude"]),
      }));
    } catch (error) {
      console.error("Error retrieving user coordinates:", error);
      throw error;
    }
  },
  
  /**
   * @function getUserByEmail
   * @async
   * @description Retrieves a single user by their email
   * @param {string} email_user - The email of the user to retrieve
   * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found
   * @throws {Error} If there's an error during the database operation
   */
  getUserByEmail: async (email_user) => {
    try {
      const users = await User.findOne({
        where: { email_user: email_user },
      });
      return users;
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la récupération de l'utilisateur : ",
        error
      );
      throw error;
    }
  },
  
  /**
   * @function addUser
   * @async
   * @description Adds a new user to the database
   * @param {Object} user - The user object to be added
   * @returns {Promise<Object>} A promise that resolves to the newly created user object
   * @throws {Error} If there's an error during the database operation
   */
  addUser: async (user) => {
    try {
      const newUser = await User.create(user);
      console.log("Nouvel utilisateur créé :", newUser);
      return newUser;
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de l'insertion d'un utilisateur : ",
        error
      );
      throw error;
    }
  },

  /**
   * @function getUserById
   * @async
   * @description Retrieves a user by their ID
   * @param {number} id - The ID of the user to retrieve
   * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found
   * @throws {Error} If there's an error during the database operation
   */
  getUserById: async (id) => {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la récupération de l'utilisateur " +
          id +
          ": ",
        error
      );
      throw error;
    }
  },
  
  /**
   * @function updateUser
   * @async
   * @description Updates a user's information
   * @param {Object} userData - The updated user data
   * @param {number} userId - The ID of the user to update
   * @throws {Error} If there's an error during the database operation
   */
  updateUser: async (userData, userId) => {
    console.log("Service :", userData);
    try {
      await User.update(userData, { where: { id_user: userId } });
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la modification d'un utilisateur : ",
        error
      );
      throw error;
    }
  },

  /**
   * @function deleteUser
   * @async
   * @description Deletes a user and their associated preferences and plays
   * @param {number} id - The ID of the user to delete
   * @returns {Promise<number>} A promise that resolves to the number of deleted rows
   * @throws {Error} If there's an error during the database operation
   */
  deleteUser: async (id) => {
    try {
      await Prefer.destroy({
        where: { id_user: id },
      });
      await Play.destroy({
        where: { id_user: id },
      });
      const UserToDelete = await User.destroy({
        where: { id_user: id },
      });
      return UserToDelete;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur");
      throw error;
    }
  },

  /**
   * @function getAllUsersAllInformations
   * @async
   * @description Retrieves all users with their preferences, played instruments, and levels
   * @returns {Promise<Array>} A promise that resolves to an array of user objects with all their information
   * @throws {Error} If there's an error during the database operation
   */
  getAllUsersAllInformations: async () => {
    try {
      const usersAllInformations = await User.findAll({
        include: [
          { model: Prefer, include: [{ model: Genre }] },
          { model: Play, include: [{ model: Instrument }, { model: Level }] },
          { model: Fav, include: [{model: User}] },
        ],
      });
      return usersAllInformations;
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la récupération des informations utilisateurs",
        error
      );
      throw error;
    }
  },
};

module.exports = userRepository;
