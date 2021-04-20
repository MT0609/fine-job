const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createMessage = {
  body: Joi.object().keys({
    userID_1: Joi.string().custom(objectId).required(),
    userID_2: Joi.string().custom(objectId).required(),
    message: Joi.string(),
  }),
};

const getMessages = {
  query: Joi.object().keys({
    userID_1: Joi.string(),
    userID_2: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const deleteMessage = {
  query: Joi.object().keys({
    userID_1: Joi.string().custom(objectId).required(),
    userID_2: Joi.string().custom(objectId).required(),
    msgID: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};
