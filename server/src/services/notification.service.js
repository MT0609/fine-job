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
  try {
    const notification = await Notification.findById(id);
    return notification;
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Post hide notification by id
 * @param {ObjectId} notificationID
 * @param {ObjectId} userID
 * @returns {Promise<Notification>}
 */
const postHideNotification = async (notificationID, userID) => {
  try {
    // const notification = await getNotificationById(notificationID);
    const user = await getUserById(userID);

    // Check valid user & job
    // if (!notification) {
    //   throw new Error('Notification not found');
    // }
    if (!user) {
      throw new Error('User not found');
    }

    const notifyItem = user.notifications.find((el) => el.notificationID === notificationID);
    const index = user.notifications.indexOf(notifyItem);
    user.notifications[index].status = 'hide';

    await user.save();

    return {};
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Post undo hide notification by id
 * @param {ObjectId} notificationID
 * @param {ObjectId} userID
 * @returns {Promise<Notification>}
 */
const postShowNotification = async (notificationID, userID) => {
  try {
    // const notification = await getNotificationById(notificationID);
    const user = await getUserById(userID);

    // Check valid user & job
    // if (!notification) {
    //   throw new Error('Notification not found');
    // }
    if (!user) {
      throw new Error('User not found');
    }

    const notifyItem = user.notifications.find((el) => el.notificationID === notificationID);
    const index = user.notifications.indexOf(notifyItem);
    user.notifications[index].status = 'show';

    await user.save();

    return {};
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

module.exports = {
  createNotification,
  getNotificationById,
  postHideNotification,
  postShowNotification,
};
