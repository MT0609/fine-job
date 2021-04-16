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

const cvSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lastEdited: {
      type: Date,
      default: new Date(),
    },
    userID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    userSnapShort: {
      baseInfo: {
        type: Object,
      },
      contact: {
        type: Object,
      },
      about: {
        type: String,
      },
      featured: {
        type: Array,
      },
      experiences: {
        type: Array,
      },
      education: {
        type: Array,
      },
      licenseAndCert: {
        type: Array,
      },
      volunteer: {
        type: Array,
      },
      skills: {
        type: String,
      },
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
cvSchema.plugin(toJSON);
cvSchema.plugin(paginate);

/**
 * @typedef CV
 */
const CV = mongoose.model('CV', cvSchema);

module.exports = CV;
