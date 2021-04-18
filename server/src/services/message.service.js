const httpStatus = require('http-status');
const { Message } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a message (current sup for text msg)
 * @param {Object} userBody
 * @returns {Promise<Message>}
 */
const createMessage = async (userBody) => {
  // Format user body to fix job
  const msg = {
    status: 'in queue',
    msg: userBody.message || '',
    type: 'text',
  };

  const filter = {
    sender: userBody.sender,
    receiver: userBody.receiver,
  };

  try {
    const message = await Message.findOne(filter);
    if (message) {
      message.messages.push(msg);
      await message.save();
      return message;
    } else {
      userBody.messages = [];
      userBody.messages.push(msg);
      const newConversation = await Message.create(userBody);
      return newConversation;
    }
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
  }
};

/**
 * Query for messages
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMessages = async (filter, options) => {
  filter.messages = { $slice: [(options.page - 1) * options.limit, options.limit] };
  const message = await Message.findOne(filter);
  return message;
};

module.exports = {
  createMessage,
  queryMessages,
};
