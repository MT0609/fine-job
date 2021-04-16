const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCompany = {
  body: Joi.object().keys({
    headLine: Joi.string().required(),
    about: Joi.string().required(),
    baseInfo: Joi.object().keys({
      linkWeb: Joi.string(),
      industry: Joi.string().required(),
      companySize: Joi.number().integer().greater(-1).required(),
      headQuarter: Joi.string().required(),
      type: Joi.string().required(),
      founded: Joi.number().integer().greater(1900).required(),
      specialties: Joi.array().items(Joi.string()).required(),
    }),
    name: Joi.string().required(),
  }),
};

const getCompanies = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCompany = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateCompany = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteCompany = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};
