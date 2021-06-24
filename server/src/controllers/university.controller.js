const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { universityService } = require('../services');

const getUniversities = catchAsync((req, res) => {
  const filter = pick(req.query, ['q']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  universityService.queryUniversities(filter, options, res);
});

module.exports = {
  getUniversities,
};
