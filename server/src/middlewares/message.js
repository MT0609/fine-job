const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const senderInTwoUser = (req, res, next) => {
  const userID_1 = req.body.userID_1 || req.query.userID_1 || '';
  const userID_2 = req.body.userID_2 || req.query.userID_2 || '';

  if (![userID_1, userID_2].includes(req.user.id))
    throw new ApiError(httpStatus.NOT_FOUND, 'Current login user must be userID_1 or userID_2');

  next();
};

module.exports = {
  senderInTwoUser,
};
