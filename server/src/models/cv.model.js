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
      features: {
        type: Array,
      },
      experiences: {
        type: Array,
      },
      educations: {
        type: Array,
      },
      licenseAndCerts: {
        type: Array,
      },
      volunteers: {
        type: Array,
      },
      skills: {
        type: Array,
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
