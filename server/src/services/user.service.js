const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { sendEmail } = require('./email.service');




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
  //de giu lai thanh phan user
  Object.assign(user, newUser);
  await user.save();
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
      deadLine: user.deadLine,
      education: user.education,
      country: user.country,
      location: user.location,
      industry: user.industry,
      dob: user.dob,
  }
  
  let contact = {
      email: user.email,
      phone: user.phone,

  }
  Object.keys(baseInfo).forEach(key => baseInfo[key] === undefined ? delete baseInfo[key] : {});
  Object.keys(contact).forEach(key => contact[key] === undefined ? delete contact[key] : {});

  function deleteProps (obj, prop) {
    for (const p of prop) {
        (p in obj) && (delete obj[p]);
    }    
  }

  //deleteProps(user, ['firstName', 'lastName', 'sex', 'deadLine', 'education', 'country', 'location', 'industry', 'dob']);
  //deleteProps(user, ['phone', 'email']);
  let newUser = {
    baseInfo: baseInfo, 
    contact: contact,
  }
  
  newUser = Object.assign(newUser, user);


  return newUser;
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
 function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
const mergeDeep  = (target, ...sources) =>{
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
}

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUserById,
  deleteUserById,
  formatUser,
  mergeDeep
};
