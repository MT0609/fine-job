const httpStatus = require('http-status');
const { Notification } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a notification
 * @param {Object} userBody
 * @returns {Promise<Notification>}
 */
const createNotification = async (userBody) => {
  // Format user body to fix job
  const notification = await Notification.create(userBody);
  return notification;
};

/**
 * Get notification by id
 * @param {ObjectId} id
 * @returns {Promise<Notification>}
 */
const getNotificationById = async (id) => {
  return Notification.findById(id);
};

module.exports = {
  createNotification,
  getNotificationById,
};
