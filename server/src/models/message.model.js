const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const enumMessageStatus = {
  values: ['waiting', 'sent', 'cancel', 'deleted'],
  message: `MessageStatus must be 'waiting, 'Services', 'sent', 'cancel' or 'deleted'!`,
};

const enumMessageType = {
  values: ['plainText', 'file', 'image'],
  message: `MessageType must be 'plainText, 'file', or 'image'!`,
};

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: [
      {
        status: {
          type: String,
          enum: enumMessageStatus,
        },
        msg: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          default: new Date(),
        },
        type: {
          type: String,
          enum: enumMessageType,
        },
      },
    ],
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
