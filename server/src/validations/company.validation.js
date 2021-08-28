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
      type: Joi.string(),
      founded: Joi.number().integer().greater(1900).required(),
      specialties: Joi.string().required(),
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
    companyID: Joi.string().custom(objectId),
  }),
};

const updateCompany = {
  params: Joi.object().keys({
    companyID: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      headLine: Joi.string(),
      about: Joi.string(),
      industry: Joi.string(),
      companySize: Joi.number(),
      headQuarter: Joi.string(),
      type: Joi.string(),
      founded: Joi.number(),
      specialties: Joi.string(),
      avatar: Joi.any(),
      backgroundAvt: Joi.any(),
      photos: Joi.any(),
    })
    .min(1),
};

const deleteCompany = {
  params: Joi.object().keys({
    companyID: Joi.string().custom(objectId),
  }),
};

const postFollow = {
  params: Joi.object().keys({
    companyID: Joi.string().custom(objectId),
  }),
};

const postUnFollow = {
  params: Joi.object().keys({
    companyID: Joi.string().custom(objectId),
  }),
};

const postSearchCompanies = {
  query: Joi.object().keys({
    q: Joi.string().allow('', null),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  postFollow,
  postUnFollow,
  postSearchCompanies,
};
