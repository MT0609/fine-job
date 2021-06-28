const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { sendEmail } = require('./email.service');

const elasticService = require('../services/elastic.service');

const {
  createNotification,
  getNotificationById,
  getNotificationByQuery,
  postHideNotification,
  postShowNotification,
} = require('./notification.service');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  var newUser = formatUser(userBody);

  const user = await User.create(newUser);
  await sendEmail(newUser.contact.email, 'Verify your account!', 'Click below button to verify account!');

  // Elastic index
  const body = {
    firstName: user.baseInfo.firstName,
    lastName: user.baseInfo.lastName,
    headLine: user.baseInfo.headLine,
    email: user.contact.email,
    phone: user.contact.phone,
    about: user.about,
    data: user,
  };

  elasticService.index('users', user._id, body);
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Get user by username
 * @param {string} username
 * @returns {Promise<User>}
 */
const getUserByUsername = async (username) => {
  return User.findOne({ username });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  let changeUser = formatUser(updateBody);

  let newUser = mergeDeep(user, changeUser);
  Object.assign(user, newUser);

  await user.save();

  // Elastic update

  // Elastic delete
  await elasticService.delete('users', user._id);

  // Elastic index
  const body = {
    firstName: user.baseInfo.firstName,
    lastName: user.baseInfo.lastName,
    headLine: user.baseInfo.headLine,
    email: user.contact.email,
    phone: user.contact.phone,
    about: user.about,
    data: user,
  };

  elasticService.index('users', user._id, body);

  return user;
};

const modifyEducation = async (userID, eduData) => {
  const user = await getUserById(userID);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!eduData.id) {
    eduData.id = require('mongoose').Types.ObjectId();
    user.baseInfo.educations.push(eduData);
  } else {
    let index = user.baseInfo.educations.findIndex((item) => item.id.toString() === eduData.id.toString());
    if (index > -1) {
      user.baseInfo.educations.splice(index, 1);
      user.baseInfo.educations.splice(index, 0, eduData);
    }
  }
  await user.save();
  return user;
};

const deleteEducation = async (userID, reqBody) => {
  const user = await getUserById(userID);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  let index = user.baseInfo.educations.findIndex((item) => item.id.toString() === reqBody.id.toString());
  if (index > -1) {
    user.baseInfo.educations.splice(index, 1);
    await user.save();
  }
  return user;
};

const modifyAccomplishment = async (userID, data) => {
  const user = await getUserById(userID);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!data.id) {
    data.id = require('mongoose').Types.ObjectId();
    user.accomplishments.push(data);
  } else {
    let index = user.accomplishments.findIndex((item) => item.id.toString() === data.id.toString());
    if (index > -1) {
      user.accomplishments.splice(index, 1);
      user.accomplishments.splice(index, 0, data);
    }
  }
  await user.save();
  return user;
};

const deleteAccomplishment = async (userID, reqBody) => {
  const user = await getUserById(userID);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  let index = user.accomplishments.findIndex((item) => item.id.toString() === reqBody.id.toString());
  if (index > -1) {
    user.accomplishments.splice(index, 1);
    await user.save();
  }
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();

  // Elastic delete
  await elasticService.delete('users', user._id);

  return user;
};

/**
 * format object body to user
 * @param {object} user
 * @returns {object} newUser
 */

const formatUser = (user) => {
  var baseInfo = {
    firstName: user.firstName,
    lastName: user.lastName,
    sex: user.sex,
    headLine: user.headLine,
    educations: user.educations,
    country: user.country,
    locations: user.locations,
    industry: user.industry,
    dob: user.dob,
  };

  let contact = {
    email: user.email,
    phone: user.phone,
  };
  Object.keys(baseInfo).forEach((key) => (baseInfo[key] === undefined ? delete baseInfo[key] : {}));
  Object.keys(contact).forEach((key) => (contact[key] === undefined ? delete contact[key] : {}));

  function deleteProps(obj, prop) {
    for (const p of prop) {
      p in obj && delete obj[p];
    }
  }

  //deleteProps(user, ['firstName', 'lastName', 'sex', 'deadLine', 'educations', 'country', 'locations', 'industry', 'dob']);
  //deleteProps(user, ['phone', 'email']);
  let newUser = {
    baseInfo: baseInfo,
    contact: contact,
  };

  newUser = Object.assign(newUser, user);

  return newUser;
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

/**
 * Send connection req
 * @param {Object} userBody
 * @param {Object} sender
 * @param {ObjectId} receiverID
 * @returns {Promise<User>}
 */
const sendConnReq = async (userBody, sender, receiverID) => {
  try {
    const receiver = await getUserById(receiverID);

    if (!receiver) {
      throw new Error('User not found');
    }

    // Already have the connection
    const isFriend = sender.connections.filter((el) => el.id == receiverID);
    if (isFriend.length >= 1) return {};

    // Sent the connection request
    let canBeSent = true;
    for (let i = 0; i < sender.activities.length; i++) {
      const el = sender.activities[i];
      if (
        el.info.sender.id.toString() === sender._id.toString() &&
        el.info.receiver.id.toString() === receiver._id.toString() &&
        el.type === 'sendConnReq'
      ) {
        const notify = await getNotificationById(el.notificationID);
        if (notify.status === 'new' && notify.type === 'sendConnReq') {
          canBeSent = false;
          return;
        }
      }
    }

    if (!canBeSent) return {};

    const activity = { ...userBody };
    activity.status = 'new';
    activity.type = 'sendConnReq';
    activity.params = [sender._id.toString(), receiver._id.toString()];
    activity.info = {
      sender: {
        id: sender._id,
        avatar: sender.avatar,
        name: `${sender.baseInfo.firstName} ${sender.baseInfo.lastName}`,
      },
      receiver: {
        id: receiver._id,
        avatar: receiver.avatar,
        name: `${receiver.baseInfo.firstName} ${receiver.baseInfo.lastName}`,
      },
    };

    const notification = await createNotification(activity);

    activity.notificationID = notification._id;
    sender.activities.unshift(activity);
    receiver.notifications.unshift(notification);

    await sender.save();
    await receiver.save();

    return {};
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Accept connection req
 * @param {Object} userBody
 * @param {Object} sender
 * @param {ObjectId} receiverID
 * @param {ObjectId} notificationID
 * @returns {Promise<User>}
 */
const acceptConnReq = async (userBody, sender, receiverID, notificationID) => {
  try {
    const receiver = await getUserById(receiverID);
    const notification = await getNotificationById(notificationID);

    if (!receiver) {
      throw new Error('User not found');
    }
    if (!notification) {
      throw new Error('Notification not found');
    }

    // Already have the connection
    const isFriend = sender.connections.filter((el) => el.id == receiverID);
    if (isFriend.length >= 1) return {};

    // Create object activity
    const activity = { ...userBody };
    activity.status = 'new';
    activity.type = 'acceptConnReq';
    activity.params = [sender._id, receiver._id];
    activity.info = {
      sender: {
        id: sender._id,
        avatar: sender.avatar,
        name: `${sender.baseInfo.firstName} ${sender.baseInfo.lastName}`,
      },
      receiver: {
        id: receiver._id,
        avatar: receiver.avatar,
        name: `${receiver.baseInfo.firstName} ${receiver.baseInfo.lastName}`,
      },
    };

    // Update notification
    const index = sender.notifications.findIndex((el) => el._id.toString() === notificationID.toString());
    if (index >= 0) {
      sender.markModified('notifications');
      sender.notifications[index].status = 'read';
      sender.notifications[index].type = 'acceptConnReq';
    }
    notification.status = 'new';
    notification.type = 'acceptConnReq';
    sender.activities.unshift(activity);
    receiver.notifications.unshift(notification);

    // Make a new connection
    const senderInfo = {
      id: sender._id,
      name: `${sender.baseInfo.firstName} ${sender.baseInfo.lastName}`,
      avatar: sender.avatar,
    };

    const receiverInfo = {
      id: receiver._id,
      name: `${receiver.baseInfo.firstName} ${receiver.baseInfo.lastName}`,
      avatar: receiver.avatar,
    };

    sender.connections.unshift(receiverInfo);
    receiver.connections.unshift(senderInfo);

    await sender.save();
    await receiver.save();
    await notification.save();

    return {};
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Delete connection req
 * @param {Object} userBody
 * @param {Object} sender
 * @param {ObjectId} receiverID
 * @param {ObjectId} notificationID
 * @returns {Promise<User>}
 */
const deleteConnReq = async (userBody, sender, receiverID, notificationID) => {
  try {
    const receiver = await getUserById(receiverID);
    const notification = await getNotificationById(notificationID);

    if (!receiver) {
      throw new Error('User not found');
    }
    if (!notification) {
      throw new Error('Notification not found');
    }

    // Create object activity
    const activity = { ...userBody };
    activity.status = 'new';
    activity.type = 'deleteConnReq';
    activity.params = [sender._id, receiver._id];
    activity.info = {
      sender: {
        id: sender._id,
        avatar: sender.avatar,
        name: `${sender.baseInfo.firstName} ${sender.baseInfo.lastName}`,
      },
      receiver: {
        id: receiver._id,
        avatar: receiver.avatar,
        name: `${receiver.baseInfo.firstName} ${receiver.baseInfo.lastName}`,
      },
    };

    // Update notification
    const index = sender.notifications.findIndex((el) => el._id.toString() === notificationID.toString());
    if (index >= 0) {
      sender.markModified('notifications');
      sender.notifications[index].status = 'hide';
      sender.notifications[index].type = 'deleteConnReq';
    }
    notification.status = 'hide';
    notification.type = 'deleteConnReq';
    sender.activities.unshift(activity);

    await sender.save();
    await notification.save();

    return {};
  } catch (error) {
    console.log({ error });
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Delete friend
 * @param {Object} userBody
 * @param {Object} sender
 * @param {ObjectId} receiverID
 * @returns {Promise<User>}
 */
const deleteFriend = async (userBody, sender, receiverID) => {
  try {
    const receiver = await getUserById(receiverID);

    if (!receiver) {
      throw new Error('User not found');
    }

    // Get notificationID
    const index = sender.notifications.findIndex((el) => {
      const params = el.params.map((el) => el.toString());
      return params.includes(sender._id.toString()) && params.includes(receiver._id.toString());
    });
    if (index < 0) {
      throw new Error('???');
    }

    const notificationID = sender.notifications[index]._id;

    const notification = await getNotificationById(notificationID);

    if (!notification) {
      throw new Error('Notification not found');
    }

    // Already haven't the connection
    const isFriend = sender.connections.filter((el) => el.id == receiverID);
    if (!isFriend.length >= 1) return {};

    // Create object activity
    const activity = { ...userBody };
    activity.status = 'new';
    activity.type = 'deleteFriend';
    activity.params = [sender._id, receiver._id];
    activity.info = {
      sender: {
        id: sender._id,
        avatar: sender.avatar,
        name: `${sender.baseInfo.firstName} ${sender.baseInfo.lastName}`,
      },
      receiver: {
        id: receiver._id,
        avatar: receiver.avatar,
        name: `${receiver.baseInfo.firstName} ${receiver.baseInfo.lastName}`,
      },
    };

    // Update connection
    sender.connections = sender.connections.filter((el) => el.id.toString() !== receiver._id.toString());
    receiver.connections = receiver.connections.filter((el) => el.id.toString() !== sender._id.toString());

    sender.activities.unshift(activity);
    notification.status = 'hide';
    notification.type = 'deleteFriend';

    await sender.save();
    await receiver.save();
    await notification.save();

    return {};
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Get connection status
 * @param {Object} sender
 * @param {ObjectId} receiverID
 * @returns {Promise<User>}
 */
const getConnStatus = async (sender, receiverID) => {
  try {
    const receiver = await getUserById(receiverID);

    if (!receiver) {
      throw new Error('User not found');
    }

    const query = { params: [sender._id.toString(), receiver._id.toString()] };
    const notification = await getNotificationByQuery(query);

    // Get type
    let type = 'noConn';
    if (notification) {
      switch (notification.type) {
        case 'sendConnReq': {
          if (notification.params[0].toString() === sender._id.toString()) {
            type = 'connSent';
          } else {
            type = 'waitForRespond';
          }
          break;
        }

        case 'acceptConnReq': {
          type = 'friend';
          break;
        }

        case 'deleteConnReq':
        case 'deleteFriend': {
          type = 'noConn';
          break;
        }
      }
    }

    const ret = {};
    ret.status = 'success';
    ret.result = {
      type,
      notification,
    };

    return ret;
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {Object} res - Respond variable
 * @returns {Promise<QueryResult>}
 */
const searchUsers = async (filter, options, res) => {
  try {
    let allResults = await elasticService.search('users', filter.q);
    allResults = allResults.filter(function (result) {
      return result !== undefined;
    });
    const { page, limit } = options;
    const paginatedResults = allResults.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(allResults.length / limit);
    res.status(200).send({ results: paginatedResults, totalPages, page });
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUserById,
  modifyEducation,
  deleteEducation,
  modifyAccomplishment,
  deleteAccomplishment,
  deleteUserById,
  formatUser,
  mergeDeep,
  sendConnReq,
  acceptConnReq,
  deleteConnReq,
  deleteFriend,
  searchUsers,
  getConnStatus,
};
