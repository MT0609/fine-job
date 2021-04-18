const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createMessage = {
  body: Joi.object().keys({
    sender: Joi.string().custom(objectId).required(),
    receiver: Joi.string().custom(objectId).required(),
    message: Joi.string(),
  }),
};

const getMessages = {
  query: Joi.object().keys({
    sender: Joi.string(),
    receiver: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createMessage,
  getMessages,
};
