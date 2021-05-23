const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Message } = require('../models');
const ApiError = require('../utils/ApiError');

const { getUserById } = require('./user.service');

/**
 * Create a message (current sup for text msg)
 * @param {Object} userBody
 * @returns {Promise<Message>}
 */
const createMessage = async (userBody) => {
  // Format user body to fix job
  const msg = {
    status: 'sent',
    msg: userBody.message || '',
    type: 'text',
    senderID: userBody.senderID,
  };

  try {
    const { senderID: userID_1, partnerID: userID_2 } = userBody;
    const message = await Message.findOne({
      $or: [
        { userID_1: userID_1, userID_2: userID_2 },
        { userID_1: userID_2, userID_2: userID_1 },
      ],
    });

    const partnerInfo = await getUserById(userID_2);

    if (message) {
      message.messages.push(msg);
      await message.save();
      return { ...message._doc, partnerInfo: partnerInfo.baseInfo, avatar: partnerInfo.avatar, partnerID: userID_2 };
    } else {
      userBody.messages = [];
      userBody.messages.push(msg);
      userBody.userID_1 = userID_1;
      userBody.userID_2 = userID_2;
      const newConversation = await Message.create(userBody);
      return { ...newConversation._doc, partnerInfo: partnerInfo.baseInfo, avatar: partnerInfo.avatar, partnerID: userID_2 };
    }
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
  }
};

/**
 * Delete message by id
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const deleteMessage = async (filter) => {
  const { senderID: userID_1, partnerID: userID_2, msgID } = filter;

  try {
    const message = await Message.findOne({
      $or: [
        { userID_1: userID_1, userID_2: userID_2 },
        { userID_1: userID_2, userID_2: userID_1 },
      ],
    });

    if (!message) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Two users never texted each other');
    }

    // Check valid msgID
    const validIndex = message.messages.findIndex((ele) => ele.id === msgID);
    if (validIndex < 0) {
      throw new Error('Message not found');
    }

    // Users can delete own messages
    const validRole = message.messages[validIndex].senderID === userID_1;
    if (!validRole) {
      throw new Error('This message was not sent by you');
    }

    const partnerInfo = await getUserById(userID_2);

    // Update message status
    message.messages[validIndex].status = 'deleted';
    await message.save();
    return { ...message._doc, partnerInfo: partnerInfo.baseInfo, avatar: partnerInfo.avatar, partnerID: userID_2 };
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Delete a conversation by id
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const deleteConversation = async (filter) => {
  const { senderID: userID_1, partnerID: userID_2 } = filter;

  try {
    const message = await Message.findOne({
      $or: [
        { userID_1: userID_1, userID_2: userID_2 },
        { userID_1: userID_2, userID_2: userID_1 },
      ],
    });

    if (!message) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Two users never texted each other');
    }

    await message.remove();
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
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
  // Not yet supported for paginate msg
  // filter.messages = { $slice: [(options.page - 1) * options.limit, options.limit] };
  const { senderID: userID_1, partnerID: userID_2 } = filter;
  try {
    const message = await Message.findOne({
      $or: [
        { userID_1: userID_1, userID_2: userID_2 },
        { userID_1: userID_2, userID_2: userID_1 },
      ],
    });

    const partnerInfo = await getUserById(userID_2);

    if (!message) {
      return {
        partnerInfo: partnerInfo.baseInfo,
        avatar: partnerInfo.avatar,
        partnerID: userID_2,
      };
    }

    const ret = message._doc;
    ret.partnerInfo = partnerInfo.baseInfo;
    ret.avatar = partnerInfo.avatar;
    ret.partnerID = userID_2;

    return ret;
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
const queryListUserMessages = async (filter, options) => {
  // Not yet supported for paginate msg
  // filter.messages = { $slice: [(options.page - 1) * options.limit, options.limit] };
  const { senderID: userID_1 } = filter;
  try {
    const messages = await Message.find({
      $or: [{ userID_1: userID_1 }, { userID_2: userID_1 }],
    })
      .sort({ lastModified: 'desc' })
      .limit(options.limit);

    // Get base partner info
    const listPartnerID = messages.map((el) => (el.userID_1 == userID_1 ? el.userID_2 : el.userID_1));
    const listLatestMessages = messages.map((el) => el.messages.slice(-1));
    const listPartnerBaseInfo = await Promise.all(
      listPartnerID.map(async (partnerID) => {
        const user = await getUserById(partnerID);
        return { ...user.baseInfo, avatar: user.avatar };
      })
    );

    return listPartnerID.map((id, index) => {
      const ret = {};
      // object return
      ret.partnerID = id;
      ret.latestMessage = listLatestMessages[index];
      ret.partnerBaseInfo = listPartnerBaseInfo[index];
      return ret;
    });
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

module.exports = {
  createMessage,
  queryMessages,
  queryListUserMessages,
  deleteMessage,
  deleteConversation,
};
