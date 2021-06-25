const Joi = require('joi');

const getCompanies = {
  query: Joi.object().keys({
    q: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  getCompanies,
};
