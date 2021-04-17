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
    title: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getJob = {
  params: Joi.object().keys({
    jobID: Joi.string().custom(objectId),
  }),
};

const updateJob = {
  params: Joi.object().keys({
    jobID: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      jobType: Joi.array().items(
        Joi.string().valid('full-time', 'part-time', 'internship', 'contract', 'remote', 'temporary', 'volunteer')
      ),
      skills: Joi.array().items(Joi.string()),
      description: Joi.string(),
      title: Joi.string(),
      status: Joi.string().valid('open', 'close'),
      maxSalary: Joi.number(),
      locations: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const deleteJob = {
  params: Joi.object().keys({
    jobID: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
