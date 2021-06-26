const httpStatus = require('http-status');
const { Company } = require('../models');
const ApiError = require('../utils/ApiError');

const elasticService = require('../services/elastic.service');

const { getUserById } = require('./user.service');

/**
 * Create a company
 * @param {Object} userBody
 * @returns {Promise<Company>}
 */
const createCompany = async (userBody) => {
  try {
    if (await Company.isNameTaken(userBody.name)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Company name already taken');
    }
    const company = await Company.create(userBody);

    // Elastic index
    const body = {
      name: company.name,
      headLine: company.headLine,
      about: company.about,
      industry: company.baseInfo.industry,
      data: company,
    };

    elasticService.index('companies', company._id, body);

    return company;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Query for companies
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

  // Custom fields update
  const baseInfo = ['industry', 'companySize', 'headQuarter', 'type', 'founded', 'specialties'];

  baseInfo.forEach((el) => {
    if (updateBody[el]) company.baseInfo[el] = updateBody[el];
  });

  company.baseInfo.specialties = updateBody.specialties.split(',');

  Object.assign(company, updateBody);
  await company.save();

  // Elastic update

  // Elastic delete
  await elasticService.delete('companies', company._id);

  // Elastic index
  const body = {
    name: company.name,
    headLine: company.headLine,
    about: company.about,
    industry: company.baseInfo.industry,
    data: company,
  };

  elasticService.index('companies', company._id, body);

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

  // Elastic delete
  await elasticService.delete('companies', company._id);

  return company;
};

/**
 * Post follow company by id
 * @param {ObjectId} companyID
 * @param {ObjectId} userID
 * @returns {Promise<Company>}
 */
const postFollowCompany = async (companyID, userID) => {
  try {
    const company = await getCompanyById(companyID);
    const user = await getUserById(userID);

    // Check valid user & company
    if (!company) {
      throw new Error('Company not found');
    }
    if (!user) {
      throw new Error('User not found');
    }

    // is following
    const isFollowing = user.followings.filter((el) => el.companyID == companyID);
    if (isFollowing.length >= 1) return {};

    // User & company update
    const userSnap = {
      userID: user._id,
      name: user.baseInfo.firstName + ' ' + user.baseInfo.lastName,
      email: user.contact.email,
      avatar: user.avatar,
    };

    const companySnap = {
      companyID: company._id,
      name: company.name,
      avatar: company.avatar,
      baseInfo: company.baseInfo,
    };

    company.followers.push(userSnap);
    user.followings.push(companySnap);

    await company.save();
    await user.save();

    return {};
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Post unFollow company by id
 * @param {ObjectId} companyID
 * @param {ObjectId} userID
 * @returns {Promise<Company>}
 */
const postUnFollowCompany = async (companyID, userID) => {
  try {
    const company = await getCompanyById(companyID);
    const user = await getUserById(userID);

    // Check valid user & company
    if (!company) {
      throw new Error('Company not found');
    }
    if (!user) {
      throw new Error('User not found');
    }

    company.followers = company.followers.filter((el) => el.userID != userID);
    user.followings = user.followings.filter((el) => el.companyID != companyID);

    await company.save();
    await user.save();

    return {};
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Query for companies
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {Object} res - Respond variable
 * @returns {Promise<QueryResult>}
 */
const searchCompanies = async (filter, options, res) => {
  try {
    let allResults = await elasticService.search('companies', filter.q);
    allResults = allResults.filter(function (result) {
      return result !== undefined;
    });
    const { page, limit } = options;
    const paginatedResults = allResults.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(allResults.length / limit);
    res.status(200).send({ results: paginatedResults, totalPages, page });
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

module.exports = {
  createCompany,
  queryCompanies,
  getCompanyById,
  getCompanyByEmail,
  updateCompanyById,
  deleteCompanyById,
  postFollowCompany,
  postUnFollowCompany,
  searchCompanies,
};
