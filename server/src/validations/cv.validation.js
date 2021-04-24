const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
const JSONTransport = require('nodemailer/lib/json-transport');
const { password, objectId } = require('./custom.validation');

const createCV = {
  body: Joi.object().keys({
    title: Joi.string(),
  }),
};

const getAllUserCV = {
  query: Joi.object().keys({
    cvId: Joi.allow(null, ''),
  })
}

//viet lai cai nay
const updateACV = {
  query: Joi.object().keys({
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
    skills: Joi.array(),
    headLine: Joi.string(),
    education: Joi.string(),
    experience: Joi.string(),
    fetured: Joi.string(),
    licenseAndCert: Joi.string(),
    volunteer: Joi.string(),
  })
}

module.exports = {
    createCV,
    getAllUserCV,
    updateACV
  };
  

