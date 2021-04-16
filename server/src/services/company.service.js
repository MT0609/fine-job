const httpStatus = require('http-status');
const { Company } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Company>}
 */
const createCompany = async (userBody) => {
  if (await Company.isNameTaken(userBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Company name already taken');
  }
  const company = await Company.create(userBody);
  return company;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCompanies = async (filter, options) => {
  const companies = await Company.paginate(filter, options);
  return companies;
};

/**
 * Get company by id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const getCompanyById = async (id) => {
  return Company.findById(id);
};

/**
 * Get company by email
 * @param {string} email
 * @returns {Promise<Company>}
 */
const getCompanyByEmail = async (email) => {
  return Company.findOne({ email });
};

/**
 * Update company by id
 * @param {ObjectId} companyID
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateCompanyById = async (companyID, updateBody) => {
  const company = await getCompanyById(companyID);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }

  const baseInfo = ['industry', 'companySize', 'headQuarter', 'type', 'founded', 'specialties'];

  baseInfo.forEach((el) => {
    if (updateBody[el]) company.baseInfo[el] = updateBody[el];
  });

  Object.assign(company, updateBody);
  await company.save();
  return company;
};

/**
 * Delete company by id
 * @param {ObjectId} companyID
 * @returns {Promise<Company>}
 */
const deleteCompanyById = async (companyID) => {
  const company = await getCompanyById(companyID);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  await company.remove();
  return company;
};

module.exports = {
  createCompany,
  queryCompanies,
  getCompanyById,
  getCompanyByEmail,
  updateCompanyById,
  deleteCompanyById,
};
