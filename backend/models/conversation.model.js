/**
 * @file Conversation.js
 * @brief Defines the Sequelize model for the Conversation entity.
 */

const { DataTypes, Model } = require('sequelize');
const sequelize = require("../repositories/db");

/**
 * @class Conversation
 * @extends Model
 * @brief Sequelize model representing a conversation in the system.
 */
class Conversation extends Model {}

Conversation.init({
  /**
   * @property {integer} id_conv - The unique identifier for the conversation.
   */
  id_conv: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  /**
   * @property {JSONB} content_conv - The content of the conversation stored as JSONB.
   */
  content_conv: {
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'conversations',
  timestamps: false,
  /**
   * @property {Array} indexes - Database indexes for the model.
   */
  indexes: [
    {
      fields: ['content_conv'],
      using: 'gin',
      operator: 'jsonb_path_ops'
    }
  ]
});

module.exports = Conversation;