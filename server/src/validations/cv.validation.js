const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
const JSONTransport = require('nodemailer/lib/json-transport');
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

//viet lai cai nay
const updateACV = {
  query: Joi.object().keys({
    userId: Joi.required().custom(objectId),
    cvId: Joi.allow(null, ''),
  }),
  body: Joi.object().keys({
    email: Joi.string().email(),
    phone: myCustomJoi.string().phoneNumber(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    dob: Joi.date().raw(),
    country: Joi.string(),
    location: Joi.string(),
    industry: Joi.string(),
    about: Joi.string(),
    sex: Joi.string(),
    location: Joi.string(),
    industry: Joi.string(),
    skills: Joi.string(),
    headline: Joi.string()
  })
}

module.exports = {
    createCV,
    getAllUserCV,
    updateACV
  };
  

