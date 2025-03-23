/**
 * @file conversationRepository.js
 * @brief Repository for conversation-related database operations
 */

const { Op } = require("sequelize");
const Conversation = require("../models/conversation.model");

/**
 * @namespace conversationRepository
 * @description Handles database operations for conversations
 */
const conversationRepository = {
    
    /**
     * @function getAllConvByUserId
     * @async
     * @description Get all conversations for a specific user
     * @param {number} userId - The ID of the user
     * @returns {Promise<Array>} A promise that resolves to an array of conversation objects
     * @throws {Error} If there's an error during the database operation
     */
    getAllConvByUserId: async (userId) => {
        try {
            const userConversations = await Conversation.findAll({
                where: {
                    content_conv: {
                        [Op.contains]: {
                            participants: [{ id_user: userId }]
                        }
                    }
                },
            });
            return userConversations;
        } catch (error) {
            console.error('Erreur lors de la récupération des conversations de l\'utilisateur : ', error);
            throw error;
        }
    },

    /**
     * @function getAllConvByAdminId
     * @async
     * @description Get all conversations for a specific admin
     * @param {number} adminId - The ID of the admin
     * @returns {Promise<Array>} A promise that resolves to an array of conversation objects
     * @throws {Error} If there's an error during the database operation
     */
    getAllConvByAdminId: async (adminId) => {
        try {
            const adminConversations = await Conversation.findAll({
                where: {
                    content_conv: {
                        [Op.contains]: {
                            participants: [{ id_admin: adminId }]
                        }
                    }
                },
            });
            return adminConversations;
        } catch (error) {
            console.error('Erreur lors de la récupération des conversations de l\'administrateur : ', error);
            throw error;
        }
    },
    
    /**
     * @function getOneConv
     * @async
     * @description Get a single conversation by its ID
     * @param {number} convId - The ID of the conversation
     * @returns {Promise<Object|null>} A promise that resolves to the conversation object if found, or null if not found
     * @throws {Error} If there's an error during the database operation
     */
    getOneConv: async (convId) => {
        try {
            const conversation = await Conversation.findByPk(convId);
            return conversation;
        } catch (error) {
            console.error('Erreur lors de la récupération de la conversation : ', error);
            throw error;
        }
        
    },
    
    /**
     * @function addConv
     * @async
     * @description Add a new conversation
     * @param {Object} conv - The conversation object to be added
     * @returns {Promise<Object>} A promise that resolves to the newly created conversation object
     * @throws {Error} If there's an error during the database operation
     */
    addConv: async (conv) => {
        try {
            const newConv = await Conversation.create(conv);
            console.log('Nouvelle conversation créée :', newConv);
            return newConv;
        } catch (error) {
            console.error('Une erreur est survenue lors de l\'insertion d\'une conversation : ', error);
            throw error;
        }
    },
    
    /**
     * @function updateConv
     * @async
     * @description Update an existing conversation
     * @param {Object} convData - The new data for the conversation
     * @param {number} convId - The ID of the conversation to update
     * @returns {Promise<Object>} A promise that resolves to the updated conversation object
     * @throws {Error} If there's an error during the database operation or if the conversation is not found
     */
    updateConv: async (convData, convId) => {
        try {
            const conversation = await Conversation.findByPk(convId);
            if (!conversation) {
                throw new Error('Conversation non trouvée');
            }
            // Get current content of the conversation
            const currentContent = conversation.content_conv;
            // Create a new message object
            const newMessage = {
                content: convData.content,
                timestamp: new Date().toISOString()
            };
            console.log(convData)
            // On ajoute id_user ou id_admin selon ce qui est fourni
            if (convData.id_user !== null) {
                newMessage.id_user = convData.id_user;
            } else if (convData.id_admin !== null) {
                newMessage.id_admin = convData.id_admin;
            }
            // Get current messages or initialize an empty array
            const currentMessages = currentContent.messages || [];
            // Create updated content by adding the new message
            const updatedContent = {
                ...currentContent,
                messages: [...currentMessages, newMessage]
            };
            // Update the conversation with new content
            const updatedConv = await conversation.update({
                content_conv: updatedContent
            });
            return updatedConv;
        } catch (error) {
            console.error('Une erreur est survenue lors de la modification d\'une conversation : ', error);
            throw error;
        }
    },
    
    /**
     * @function checkExistingConv
     * @async
     * @description Check if a conversation exists between two users
     * @param {number} userId1 - The ID of the first user
     * @param {number} userId2 - The ID of the second user
     * @returns {Promise<Object|undefined>} A promise that resolves to the existing conversation object if found, or undefined if not found
     * @throws {Error} If there's an error during the database operation
     */
    checkExistingConv: async (userId1, userId2) => {
        try {
            const allConversations = await Conversation.findAll();
      
            // Search for a conversation that contains these two users
            const existingConv = allConversations.find(conv => {
                const participants = conv.dataValues.content_conv.participants;
                const hasUser1 = participants.some(p => p.id_user === userId1);
                const hasUser2 = participants.some(p => p.id_user === userId2);
                return hasUser1 && hasUser2;
            });
            return existingConv;
        } catch (error) {
            console.error('Une erreur est survenue lors de la recherche d\'une conversation : ', error);
            throw error;
        }
    },
    
    /**
     * @function checkExistingAdminConv
     * @async
     * @description Check if a conversation exists between an admin and a user
     * @param {number} adminId - The ID of the admin
     * @param {number} userId - The ID of the user
     * @returns {Promise<Object|undefined>} A promise that resolves to the existing conversation object if found, or undefined if not found
     * @throws {Error} If there's an error during the database operation
     */
    checkExistingAdminConv: async (adminId, userId) => {
        try {
            const allConversations = await Conversation.findAll();
      
            // Rechercher une conversation qui contient cet admin et cet utilisateur
            const existingConv = allConversations.find(conv => {
                const participants = conv.dataValues.content_conv.participants;
                const hasAdmin = participants.some(p => p.role === 'admin' && p.id_admin === adminId);
                const hasUser = participants.some(p => p.role === 'user' && p.id_user === userId);
                return hasAdmin && hasUser;
            });
            return existingConv;
        } catch (error) {
            console.error('Une erreur est survenue lors de la recherche d\'une conversation admin : ', error);
            throw error;
        }
    },
    
    /**
     * @function deleteConv
     * @async
     * @description Delete a conversation
     * @param {number} convId - The ID of the conversation to delete
     * @returns {Promise<number>} A promise that resolves to the number of deleted rows (should be 1 if successful)
     * @throws {Error} If there's an error during the database operation
     */
    deleteConv: async (convId) => {
        try {
            const ConvToDelete = await Conversation.destroy({
                where: { id_conv: convId}
            });
            return ConvToDelete;
        } catch (error) {
            console.error('Une erreur est survenue lors de la suppression d\'une conversation : ', error);
            throw error;
        }
    }
}

module.exports = conversationRepository;