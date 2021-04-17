const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createJob = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId),
    title: Joi.string().required(),
    jobType: Joi.string().required(),
    skills: Joi.array().items(Joi.string()),
    description: Joi.string(),
    locations: Joi.array().items(Joi.string()),
    maxSalary: Joi.number(),
  }),
};

const getJobs = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getJob = {
  params: Joi.object().keys({
    companyID: Joi.string().custom(objectId),
  }),
};

const updateJob = {
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

const deleteJob = {
  params: Joi.object().keys({
    companyID: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
