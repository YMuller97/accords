/**
 * @file conversationService.js
 * @brief Service layer for conversation-related operations
 */

const conversationRepository = require("../repositories/conversationRepository");

/**
 * @namespace conversationService
 * @description Provides business logic for conversation-related operations
 */
const conversationService = {
    
    /**
     * @function getAllConvByUserId
     * @async
     * @description Retrieves all conversations for a specific user
     * @param {number} userId - The ID of the user
     * @returns {Promise<Array>} A promise that resolves to an array of conversation objects
     * @throws {Error} If an error occurs during the operation
     */
    getAllConvByUserId: async (userId) => {
        try {
            // Call the repository method
            const userConversations = await conversationRepository.getAllConvByUserId(userId);
            return userConversations;
        } catch (error) {
            console.error("Une erreur est survenue dans le service conversation : ", error);
            throw error;
        }
    },

    /**
     * @function getAllConvByAdminId
     * @async
     * @description Retrieves all conversations for a specific admin
     * @param {number} adminId - The ID of the admin
     * @returns {Promise<Array>} A promise that resolves to an array of conversation objects
     * @throws {Error} If an error occurs during the operation
     */
    getAllConvByAdminId: async (adminId) => {
        try {
            // Call the repository method
            const adminConversations = await conversationRepository.getAllConvByAdminId(adminId);
            return adminConversations;
        } catch (error) {
            console.error("Une erreur est survenue dans le service conversation : ", error);
            throw error;
        }
    },

    /**
     * @function getOneConv
     * @async
     * @description Retrieves a single conversation by its ID
     * @param {number} convId - The ID of the conversation to retrieve
     * @returns {Promise<Object|null>} A promise that resolves to the conversation object if found, or null if not found
     * @throws {Error} If an error occurs during the operation
     */
    getOneConv: async (convId) => {
        try {
            // Call the repository method
            const conversation = await conversationRepository.getOneConv(convId);
            return conversation;
        } catch (error) {
            console.error("Une erreur est survenue dans le service conversation : ", error);
            throw error;
        }
    },

    /**
     * @function addConv
     * @async
     * @description Adds a new conversation to the database
     * @param {Object} conv - The conversation object to add
     * @returns {Promise<Object>} A promise that resolves to the newly created conversation object
     * @throws {Error} If an error occurs during the operation
     */
    addConv: async (conv) => {
        try {
            // Call the repository method
            const newConv = await conversationRepository.addConv(conv);
            return newConv;
        } catch (error) {
            console.error("Une erreur est survenue dans le service conversation : ", error);
            throw error;
        }
    },

    /**
     * @function updateConv
     * @async
     * @description Updates an existing conversation in the database
     * @param {Object} convData - The updated data for the conversation
     * @param {number} convId - The ID of the conversation to update
     * @returns {Promise<Object>} A promise that resolves to the updated conversation object
     * @throws {Error} If an error occurs during the operation
     */
    updateConv: async (convData, convId) => {
        try {
            // Call the repository method
            const updatedConv = await conversationRepository.updateConv(convData, convId);
            return updatedConv;
        } catch (error) {
            console.error("Une erreur est survenue dans le service conversation : ", error);
            throw error;
        }
    },

    /**
     * @function checkExistingConv
     * @async
     * @description Checks if a conversation exists between two users in the database
     * @param {number} userId1 - The ID of the first user
     * @param {number} userId2 - The ID of the second user
     * @returns {Promise<Object|null>} A promise that resolves to the existing conversation object if found, or null if not found
     * @throws {Error} If an error occurs during the operation
     */
    checkExistingConv: async (userId1, userId2) => {
        try {
            // Call the repository method
            const existingConv = await conversationRepository.checkExistingConv(userId1, userId2);
            return existingConv;
        } catch (error) {
            console.error("Une erreur est survenue dans le service conversation : ", error);
            throw error;
        }
    },

    /**
     * @function checkExistingAdminConv
     * @async
     * @description Checks if a conversation exists between an admin and a user in the database
     * @param {number} adminId - The ID of the admin
     * @param {number} userId - The ID of the user
     * @returns {Promise<Object|null>} A promise that resolves to the existing conversation object if found, or null if not found
     * @throws {Error} If an error occurs during the operation
     */
    checkExistingAdminConv: async (adminId, userId) => {
        try {
            // Call the repository method
            const existingConv = await conversationRepository.checkExistingAdminConv(adminId, userId);
            return existingConv;
        } catch (error) {
            console.error("Une erreur est survenue dans le service conversation : ", error);
            throw error;
        }
    },

     /**
     * @function deleteConv
     * @async
     * @description Deletes a specific conversation by its ID from the database 
     * @param {number} convId - The ID of the conversation to delete 
     * @return {Promise<Object|null>} A promise that resolves to the existing conversation object if deleted, or null if not
     * @throws {Error} If an error occurs during the operation
     */
    deleteConv: async (convId)  => {
        try {
            // Call the repository method
            const deletedConv = await conversationRepository.deleteConv(convId);
            return deletedConv;
        } catch (error) {
            console.error("Une erreur est survenue dans le service conversation : ", error);
            throw error;
        }
    }
}

module.exports = conversationService;