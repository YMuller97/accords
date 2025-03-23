/** @file conversationController.js
 *  @brief Controller for conversations operations
 */

const conversationService = require("../services/conversationService");

/**
 * @namespace conversationController
 * @description Controller object containing methods for conversations operations
 */
const conversationController = {

    /**
     * @function getAllConvByUserId
     * @async
     * @description Retrieve all conversations of a user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getAllConvByUserId: async (req, res) => {
        try {
            const userId = parseInt(req.params.userId, 10);
            const userConversations = await conversationService.getAllConvByUserId(userId);
            res.status(200).json(userConversations);
        } catch (error) {
            console.error("Error while retrieving user's conversations:", error);
            res.status(400).json({ message: "Error while retrieving user's conversations" });
        }
    },

    /**
     * @function getAllConvByAdminId
     * @async
     * @description Retrieve all conversations of an admin
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getAllConvByAdminId: async (req, res) => {
        try {
            const adminId = parseInt(req.params.adminId, 10);
            const adminConversations = await conversationService.getAllConvByAdminId(adminId);
            res.status(200).json(adminConversations);
        } catch (error) {
            console.error("Error while retrieving admin's conversations:", error);
            res.status(400).json({ message: "Error while retrieving admin's conversations" });
        }
    },

    /**
     * @function getOneConv
     * @async
     * @description Retrieve a single conversation by its ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getOneConv: async (req, res) => {
        try {
            const convId = req.params.convId;
            const conv = await conversationService.getOneConv(convId);
            if (!conv) {
                return res.status(404).json({ message: "Conversation not found" });
            }
            res.status(200).json(conv);
        } catch (error) {
            console.error("Error while retrieving the conversation:", error);
            res.status(400).json({ message: "Error while retrieving the conversation" });
        }
    },

    /**
     * @function addConv
     * @async
     * @description Add a new conversation
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    addConv: async (req, res) => {
        try {
            const convData = req.body; 
            const newConv = await conversationService.addConv(convData); 
            res.status(201).json(newConv);
        } catch (error) {
            console.error("Error while adding a new conversation:", error);
            res.status(400).json({ message: "Error while adding a new conversation" });
        }
    },

    /**
     * @function updateConv
     * @async
     * @description Update an existing conversation
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    updateConv: async (req, res) => {
        try {
            const convData = req.body;
            const convId = req.params.convId;
            const updatedConv = await conversationService.updateConv(convData, convId);
            res.status(200).json(updatedConv)
        } catch (error) {
            console.error("Error while updating the conversation:", error);
            res.status(400).json({ message: "Error while updating the conversation" });
        }
    },

    /**
     * @function checkExistingConv
     * @async
     * @description Check if a conversation already exists between two users
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    checkExistingConv: async (req, res) => {
        try {
            const { userId1, userId2 } = req.body;
            const existingConv = await conversationService.checkExistingConv(userId1, userId2);
            
            if (existingConv) {
                console.log(existingConv)
                res.json({ exists: true, id_conv: existingConv.id_conv });
            } else {
                res.json({ exists: false });
            }
          } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Server error" });
          }
    },

    /**
     * @function checkExistingAdminConv
     * @async
     * @description Check if a conversation already exists between admin and user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    checkExistingAdminConv: async (req, res) => {
        try {
            const { adminId, userId } = req.body;
            const existingConv = await conversationService.checkExistingAdminConv(adminId, userId);
            
            if (existingConv) {
                console.log(existingConv)
                res.json({ exists: true, id_conv: existingConv.id_conv });
            } else {
                res.json({ exists: false });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Server error" });
        }
    },

    /**
     * @function deleteConv
     * @async
     * @description Delete a conversation
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    deleteConv: async (req, res) => {
        try {
            const convId = req.params.convId;
            await conversationService.deleteConv(convId);
            res.status(200).json({message: "Conversation deleted"})
        } catch (error) {
            console.error("Error while deleting the conversation:", error);
            res.status(400).json({ message: "Error while deleting the conversation" });
        }
    }
}

module.exports = conversationController;