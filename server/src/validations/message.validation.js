const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createMessage = {
  body: Joi.object().keys({
    partnerID: Joi.string().custom(objectId).required(),
    message: Joi.string(),
  }),
};

const getListUserMessages = {
  query: Joi.object().keys({
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMessages = {
  query: Joi.object().keys({
    partnerID: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const deleteConversation = {
  query: Joi.object().keys({
    partnerID: Joi.string().custom(objectId).required(),
  }),
};

const deleteMessage = {
  query: Joi.object().keys({
    partnerID: Joi.string().custom(objectId).required(),
    msgID: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createMessage,
  getMessages,
  getListUserMessages,
  deleteMessage,
  deleteConversation,
};
