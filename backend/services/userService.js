/**
 * @file userService.js
 * @brief Service layer for user-related operations
 */

const userRepository = require("../repositories/userRepository");
const preferRepository = require("../repositories/preferRepository");
const playRepository = require("../repositories/playRepository");
const favRepository = require('../repositories/favRepository')

/**
 * @namespace userService
 * @description Provides business logic for user-related operations
 */
const userService = {
  
  /**
   * @function getAllUsers
   * @async
   * @description Retrieves all users from the database
   * @returns {Promise<Array>} A promise that resolves to an array of user objects
   * @throws {Error} If an error occurs during the operation
   */
  getAllUsers: async () => {
    try {
      // Call the repository method
      const users = await userRepository.getAllUsers();
      return users;
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le service utilisateur (getAllUsers): ",
        error
      );
      throw error;
    }
  },

  /**
   * @function getAllPlayData
   * @async
   * @description Retrieves all play data 
   * @returns {Promise<void>}
   * @throws {Error} If an error occurs during the operation
   */
  getAllPlayData: async () => {
    try {
      
    }
    catch (error) {

    }
  },
  
  /**
   * @function getUsersCoordinates
   * @async
   * @description Retrieves coordinates for all users
   * @returns {Promise<Array>} A promise that resolves to an array of user coordinate objects
   * @throws {Error} If an error occurs during the operation
   */
  getUsersCoordinates: async () => {
    try {
      // Call the repository method
      return await userRepository.getUsersCoordinates();
    } catch (error) {
      console.error(
        "Une erreur est servenue dans le service utilisateur : ",
        error
      );
      throw error;
    }
  },

  /**
   * @function getUserByEmail
   * @async
   * @description Retrieves a user by their email address
   * @param {string} email_user - The email address of the user to retrieve
   * @returns {Promise<Object>} A promise that resolves to the user object if found
   * @throws {Error} If the email is undefined, empty, or if the user is not found
   */
  getUserByEmail: async (email_user) => {
    try {
      // Check if email is provided
      if (!email_user) {
        throw new Error("L'email est undefined ou vide");
      }
      // Call the repository method
      const user = await userRepository.getUserByEmail(email_user);
      // Check if user exists
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }
      return user;
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le service utilisateur (getUserByEmail): ",
        error
      );
      throw error;
    }
  },

  /**
   * @function addUser
   * @async
   * @description Adds a new user to the database
   * @param {Object} user - The user object to add
   * @throws {Error} If an error occurs during the operation
   */
  addUser: async (user) => {
    try {
      userRepository.addUser(user);
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le service utilisateur (addUser): ",
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
   * @returns {Promise<Object>} A promise that resolves to the user object if found
   * @throws {Error} If an error occurs during the operation
   */
  getUserById: async (id) => {
    try {
      // Call the repository method
      const user = await userRepository.getUserById(id);
      return user;
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le service utilisateur (getUserById): ",
        error
      );
      throw error;
    }
  },

  /**
   * @function updateUser
   * @async
   * @description Updates a user's information, including their preferred genres and played instruments
   * @param {Object} userData - The updated user data
   * @param {number} userId - The ID of the user to update
   * @throws {Error} If an error occurs during the operation
   */
  updateUser: async (userData, userId) => {
    try {
      // --------- Separate data to call different repository methods ---------
      const new_user_genres = userData.genres; // Get new prefered genres data
      const new_user_play = userData.plays; // Get new practice data
      const user = userData;
      console.log("Service", userData); // Get new user data

      // --------- Prefered musical genres updates ---------

      // If new prefered genres data exists, iterate through and only add new entries in database
      if (new_user_genres) {
        new_user_genres.forEach(async (genreId) => {
          // For each new genre provided
          const isPrefer = await preferRepository.checkOnePreferedGenre(
            userId,
            genreId
          ); // Check if it already is a preference
          if (isPrefer) {
            // If it is, skip it
            console.log("Genre id: ", genreId, " déjà en préférences : ignoré");
          } else {
            // If not, add it
            await preferRepository.addPreferedGenre(userId, genreId);
            console.log(
              "UserService : updateUser : Ajout d'un nouveau genre musical préféré : effectué"
            );
          }
        });
      } else {
        console.log("Pas de nouvelles préférences musicales à ajouter");
      }

      // --------- Played instruments updates ---------

      // If new played instruments data exists, iterate through and only add new entries in database,
      // or update level on existing entries
      if (new_user_play) {
        new_user_play.forEach(async (play) => {
          // For each new instrument practice provided
          const newInstrument = play.id_instrument;
          const newLevel = play.id_level;

          const isPlayed = await playRepository.checkOnePlayedInstrument(
            userId,
            newInstrument
          ); // Check if it already is played
          if (isPlayed > 0 && isPlayed < 5) {
            // If it is, check if the level is changed
            if (isPlayed === newLevel) {
              console.log(
                "InstrumentId : ",
                newInstrument,
                " déjà joué, pas de changement de niveau : ignoré"
              ); // Ignore if no changes to level
            } else {
              await playRepository.updateLevel(userId, newLevel, newInstrument); //Update row if level has changed
            }
          } else if (isPlayed === 0) {
            // If not already in database, add it
            await playRepository.addPlayedInstrument(
              userId,
              newLevel,
              newInstrument
            );
            console.log(
              "UserService : updateUser : Ajout d'un nouvel instrument joué : effectué"
            );
          } else {
            throw new Error(
              "UserService : updateUser : idLevel incohérent : ",
              isPlayed
            );
          }
        });
      } else {
        console.log("Pas de nouveaux instruments joués à ajouter");
      }

      // --------- User data updates ---------
      if (user) {
        await userRepository.updateUser(userData, userId);
      }
    } catch (error) {
      console.error(
        "Une erreur est survenue dans le service utilisateur (updateUser): ",
        error
      );
      throw error;
    }
  },

  /**
   * @function deleteUser
   * @async
   * @description Deletes a user from the database
   * @param {number} id - The ID of the user to delete
   * @throws {Error} If an error occurs during the operation
   */
  deleteUser: async (id) => {
    try {
      userRepository.deleteUser(id);
    } catch (error) {
      console.error(
        "Une erreur est servenue dans le service utilisateur : ",
        error
      );
      throw error;
    }
  },

  /**
   * @function getAllUsersAllInformations
   * @async
   * @description Retrieves all users with all their information
   * @returns {Promise<Array>} A promise that resolves to an array of user objects with all their information
   * @throws {Error} If an error occurs during the operation
   */
  getAllUsersAllInformations: async () => {
    try {
      const usersAllInformations =
        await userRepository.getAllUsersAllInformations();
      return usersAllInformations;
    } catch (error) {
      console.error(
        "Une erreur est servenue dans le service utilisateur : ",
        error
      );
      throw error;
    }
  },

  /**
   * @function getUserFavs
   * @async
   * @description Retrieves a users favs
   * @param {number} userId - The ID of the user to retrieve
   * @returns {Promise<Object>} A promise that resolves to the user object if found
   * @throws {Error} If an error occurs during the operation
   */
  getUserFavs: async (userId) => {
    try {
      const userfavs = await favRepository.getUserFavs(userId);
      return userfavs;
    } catch (error) {
      console.error("Une erreur est servenue dans le service utilisateur :", error);
      throw error;
    }
  },

  /**
   * @function getAllUsersFavs
   * @async
   * @description Retrieves all users favs
   * @returns {Promise<Object>} A promise that resolves to the user object if found
   * @throws {Error} If an error occurs during the operation
   */
  getAllUsersFavs: async () => {
    try {
      const allFavs = await favRepository.getAllFavs();
      console.log("user service : favs :", allFavs);
      return allFavs; 
    } catch(error) {
      console.error("Une erreur est servenue dans le service utilisateur :", error);
      throw error;
    }
  },

  /**
   * @function checkIsFav
   * @async
   * @description Check if a user is fav
   * @param {number} userId - The ID of the user to retrieve
   *  @param {number} favId - The ID of the fav to retrieve
   * @returns {Promise<Object>} A promise that resolves to the user object if found
   * @throws {Error} If an error occurs during the operation
   */
  checkIsFav: async (userId, favId) => {
    try {
      const fav = await favRepository.checkIsFav(userId, favId);
      return fav;
    } catch(error) {
      console.error("Une erreur est servenue dans le service utilisateur :", error);
      throw error;
    }
    
  },

  /**
   * @function addUserFav
   * @async
   * @description add a user to fav
   * @param {number} userId - The ID of the user to retrieve
   *  @param {number} favId - The ID of the fav to retrieve
   * @returns {Promise<Object>} A promise that resolves to the user object if found
   * @throws {Error} If an error occurs during the operation
   */
  addUserFav: async (userId, favId) => {
    try {
      const newFav = await favRepository.addUserFav(userId, favId);
      return newFav;
    } catch(error) {
      console.error("Une erreur est servenue dans le service utilisateur :", error);
      throw error;
    }
  },

  /**
   * @function deleteUserFav
   * @async
   * @description delete a user from fav
   * @param {number} userId - The ID of the user to retrieve
   *  @param {number} favId - The ID of the fav to retrieve
   * @returns {Promise<void>}
   * @throws {Error} If an error occurs during the operation
   */
  deleteUserFav: async (userId, favId) => {
    try {
      console.log("service : fav : ", favId, " user : ", userId)
      await favRepository.deleteUserFav(userId, favId);
    } catch(error) {
      console.error("Une erreur est servenue dans le service utilisateur :", error);
      throw error;
    }
    
  }
};

module.exports = userService;
