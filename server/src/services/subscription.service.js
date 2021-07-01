const httpStatus = require('http-status');
const { Subscription } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a subscription
 * @param {Object} userBody
 * @returns {Promise<Job>}
 */
const createSubscription = async (userBody) => {
  const subscription = await Subscription.create(userBody);
  await subscription.save();
  return subscription;
};

/**
 * Query for subscriptions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySubscriptions = async (filter, options) => {
  const subscriptions = await Subscription.paginate(filter, options);
  return subscriptions;
};

/**
 * Get subscription by id
 * @param {ObjectId} id
 * @returns {Promise<Subscription>}
 */
const getSubscriptionById = async (id) => {
  return Subscription.findById(id);
};

/**
 * Delete subscription by id
 * @param {ObjectId} subscriptionID
 * @returns {Promise<Subscription>}
 */
const deleteSubscriptionByUserId = async (userID) => {
  await Subscription.deleteMany({ userID });
};

module.exports = {
  createSubscription,
  querySubscriptions,
  getSubscriptionById,
  deleteSubscriptionByUserId,
};
