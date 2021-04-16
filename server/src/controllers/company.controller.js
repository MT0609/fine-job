const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { companyService } = require('../services');

const createCompany = catchAsync(async (req, res) => {
  const company = await companyService.createCompany(req.body);
  res.status(httpStatus.CREATED).send(company);
});

const getCompanies = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['username', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await companyService.queryCompanies(filter, options);
  res.send(result);
});

const getCompany = catchAsync(async (req, res) => {
  const company = await companyService.getCompanyById(req.params.companyID);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  res.send(company);
});

const updateCompany = catchAsync(async (req, res) => {
  const company = await companyService.updateUserById(req.params.companyID, req.body);
  res.send(company);
});

const deleteCompany = catchAsync(async (req, res) => {
  await companyService.deleteCompanyById(req.params.companyID);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};
