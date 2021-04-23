const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createNotification = {
  body: Joi.object().keys({
    type: Joi.string().valid('sendConnReq', 'acceptConnReq', 'postJob', 'closeJob', 'applyJob', 'followCompany').required(),
    url: Joi.string().uri(),
    params: Joi.object().keys({
      senderID: Joi.string().custom(objectId),
      recvID: Joi.string().custom(objectId),
    }),
  }),
};

const getNotification = {
  params: Joi.object().keys({
    notificationID: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNotification,
  getNotification,
};
