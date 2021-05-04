const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const enumNotificationType = {
  values: ['sendConnReq', 'acceptConnReq', 'postJob', 'closeJob', 'applyJob', 'followCompany'],
  message: `Notification must be 'sendConnReq', 'acceptConnReq', 'postJob', 'closeJob', 'applyJob' or 'followCompany'!`,
};

const enumNotificationStatus = {
  values: ['new', 'read', 'hide'],
  message: `Notification must be 'new', 'read', 'postJob' or 'hide'!`,
};

const notifySchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: enumNotificationType,
    },
    url: {
      type: String,
    },
    params: {
      type: Object,
    },
    status: {
      type: String,
      default: 'new',
      enum: enumNotificationStatus,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
notifySchema.plugin(toJSON);
notifySchema.plugin(paginate);

/**
 * @typedef Notifications
 */
const Notification = mongoose.model('Notification', notifySchema);

module.exports = Notification;
