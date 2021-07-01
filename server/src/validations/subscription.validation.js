const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createSubscription = {
  body: Joi.object().keys({
    userID: Joi.string().custom(objectId),
    subscription: Joi.object().keys({
      endpoint: Joi.string().required(),
      expirationTime: Joi.any(),
      keys: Joi.object().keys({
        auth: Joi.string().required(),
        p256dh: Joi.string().required(),
      }),
    }),
    body: Joi.object().keys({
      title: Joi.string().required(),
      body: Joi.string().required(),
    }),
  }),
};

const getSubscriptions = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSubscription = {
  params: Joi.object().keys({
    subscriptionID: Joi.string().custom(objectId),
  }),
};

const deleteSubscription = {
  params: Joi.object().keys({
    userID: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSubscription,
  getSubscriptions,
  getSubscription,
  deleteSubscription,
};
