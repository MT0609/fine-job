const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const enumMessageStatus = {
  values: ['waiting', 'sent', 'cancel', 'deleted'],
  message: `MessageStatus must be 'waiting, 'Services', 'sent', 'cancel' or 'deleted'!`,
};

const enumMessageType = {
  values: ['text', 'file'],
  message: `MessageType must be 'text' or 'file'!`,
};

const messageSchema = mongoose.Schema(
  {
    userID_1: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    userID_2: {
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
        },
        time: {
          type: Date,
          default: new Date(),
        },
        type: {
          type: String,
          enum: enumMessageType,
        },
        senderID: {
          type: String,
          required: true,
        },
      },
    ],
    lastModified: {
      type: Date,
      default: new Date(),
    },
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

messageSchema.pre('updateOne', function () {
  this.set({ lastModified: new Date() });
});

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
