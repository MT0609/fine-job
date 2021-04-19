const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCV = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
  }),
};

const getAllUserCV = {
  query: Joi.object().keys({
    userId: Joi.required().custom(objectId),
    cvId: Joi.allow(null, ''),
  })
}

const getAUserCV = {
  params: Joi.object().keys({
    cvId: Joi.required().custom(objectId),
  })
}

module.exports = {
    createCV,
    getAllUserCV,
    getAUserCV
  };
  

