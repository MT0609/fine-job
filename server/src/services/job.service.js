const httpStatus = require('http-status');
const moment = require('moment');
const { Job } = require('../models');
const ApiError = require('../utils/ApiError');

const elasticService = require('../services/elastic.service');

const { getCompanyById } = require('../services/company.service');
const { getUserById } = require('../services/user.service');

/**
 * Create a job
 * @param {Object} userBody
 * @returns {Promise<Job>}
 */
const createJob = async (userBody) => {
  // Check if exist company
  const { id } = userBody;
  const company = await getCompanyById(id);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }

  // Format user body to fix job
  userBody.company = {
    name: company.name,
    id: id,
    avatar: company.avatar,
    size: company.baseInfo.companySize,
    industry: company.baseInfo.industry,
  };

  userBody.job = {};
  userBody.job.jobType = userBody.jobType;

  const job = await Job.create(userBody);

  // Add job to company
  const jobSub = {
    name: userBody.title,
    id: job._id,
    description: userBody.description,
    salary: userBody.maxSalary,
  };

  company.jobs.push(jobSub);
  await company.save();

  // Elastic index
  const body = {
    title: job.title,
    company: job.company.name,
    description: job.description,
    data: job,
  };

  await elasticService.index('jobs', job._id, body);

  return job;
};

/**
 * Query for jobs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryJobs = async (filter, options) => {
  const jobs = await Job.paginate(filter, options);
  return jobs;
};

/**
 * Get job by id
 * @param {ObjectId} id
 * @returns {Promise<Job>}
 */
const getJobById = async (id) => {
  return Job.findById(id);
};

/**
 * Get job by email
 * @param {string} email
 * @returns {Promise<Job>}
 */
const getJobByEmail = async (email) => {
  return Job.findOne({ email });
};

/**
 * @param {ObjectId} jobID
 * @param {ObjectId} userID
 * @param {String} cvPath
 * @returns {Promise<Job>}
 */
const applyJob = async (jobID, body, userID, cvPath) => {
  try {
    const job = await getJobById(jobID);
    const user = await getUserById(userID);

    // Check valid user & job
    if (!job) {
      throw new Error('Job not found');
    }
    if (!user) {
      throw new Error('User not found');
    }

    // is already applied
    const isApplied = job.job.applicants.filter((applicant) => applicant.userID == userID);
    if (isApplied.length >= 1) return {};

    const applyTime = moment().toISOString();

    // User & job update
    const appliedSnap = {
      user: {
        id: userID,
        ...user._doc.baseInfo,
        avatar: user.avatar,
        email: body.email,
        phone: body.phone,
      },
      cvPath,
      createdAt: applyTime,
    };

    const jobSnap = {
      id: job._id,
      name: job.title,
      company: {
        id: job.company.id,
        name: job.company.name,
        avatar: job.company.avatar,
      },
      locations: job.locations,
      createdAt: applyTime,
    };

    job.job.applicantCount++;
    job.job.applicants.push(appliedSnap);
    user.applies.push(jobSnap);

    await Promise.all([job.save(), user.save()]);

    // Elastic update

    // Elastic delete
    await elasticService.delete('jobs', job._id);

    // Elastic index
    const body = {
      title: job.title,
      company: job.company.name,
      description: job.description,
      data: job,
    };

    await elasticService.index('jobs', job._id, body);

    // Elastic update user

    // Elastic delete
    await elasticService.delete('users', user._id);

    // Elastic index
    const bodyUser = {
      firstName: user.baseInfo.firstName,
      lastName: user.baseInfo.lastName,
      headLine: user.baseInfo.headLine,
      email: user.contact.email,
      phone: user.contact.phone,
      about: user.about,
      data: user,
    };

    await elasticService.index('users', user._id, bodyUser);

    return {};
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Update job by id
 * @param {ObjectId} jobID
 * @param {Object} updateBody
 * @returns {Promise<Job>}
 */
const updateJobById = async (jobID, updateBody) => {
  const job = await getJobById(jobID);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  if (updateBody.jobType) job.job.jobType = updateBody.jobType;

  Object.assign(job, updateBody);
  await job.save();

  // Elastic update

  // Elastic delete
  await elasticService.delete('jobs', job._id);

  // Elastic index
  const body = {
    title: job.title,
    company: job.company.name,
    description: job.description,
    data: job,
  };

  await elasticService.index('jobs', job._id, body);

  return job;
};

/**
 * Delete job by id
 * @param {ObjectId} jobID
 * @returns {Promise<Job>}
 */
const deleteJobById = async (jobID) => {
  const job = await getJobById(jobID);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  await job.remove();

  // Elastic delete
  await elasticService.delete('jobs', job._id);

  return job;
};

/**
 * Post save job by id
 * @param {ObjectId} jobID
 * @param {ObjectId} userID
 * @returns {Promise<Job>}
 */
const postSaveJob = async (jobID, userID) => {
  try {
    const job = await getJobById(jobID);
    const user = await getUserById(userID);

    // Check valid user & job
    if (!job) {
      throw new Error('Job not found');
    }
    if (!user) {
      throw new Error('User not found');
    }

    // is saved
    const isSaved = user.savePosts.filter((el) => el.jobID == jobID);
    if (isSaved.length >= 1) return {};

    // User & job update
    const jobSnap = {
      jobID: job._id,
      name: job.title,
      job: job.job,
      locations: job.locations,
      posted: job.posted,
      status: job.status,
    };

    user.savePosts.push(jobSnap);

    await user.save();

    // Elastic update user

    // Elastic delete
    await elasticService.delete('users', user._id);

    // Elastic index
    const bodyUser = {
      firstName: user.baseInfo.firstName,
      lastName: user.baseInfo.lastName,
      headLine: user.baseInfo.headLine,
      email: user.contact.email,
      phone: user.contact.phone,
      about: user.about,
      data: user,
    };

    await elasticService.index('users', user._id, bodyUser);

    return {};
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Post unSave job by id
 * @param {ObjectId} jobID
 * @param {ObjectId} userID
 * @returns {Promise<Job>}
 */
const postUnSaveJob = async (jobID, userID) => {
  try {
    const job = await getJobById(jobID);
    const user = await getUserById(userID);

    // Check valid user & job
    if (!job) {
      throw new Error('Job not found');
    }
    if (!user) {
      throw new Error('User not found');
    }

    user.savePosts = user.savePosts.filter((el) => el.jobID != jobID);

    await user.save();

    // Elastic update user

    // Elastic delete
    await elasticService.delete('users', user._id);

    // Elastic index
    const bodyUser = {
      firstName: user.baseInfo.firstName,
      lastName: user.baseInfo.lastName,
      headLine: user.baseInfo.headLine,
      email: user.contact.email,
      phone: user.contact.phone,
      about: user.about,
      data: user,
    };

    await elasticService.index('users', user._id, bodyUser);

    return {};
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Query for jobs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {Object} res - Respond variable
 * @returns {Promise<QueryResult>}
 */
const searchJobs = async (filter, options, res) => {
  try {
    let allResults = await elasticService.search('jobs', filter.q);
    allResults = allResults.filter(function (result) {
      return result !== undefined;
    });
    const { page, limit } = options;
    const paginatedResults = allResults.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(allResults.length / limit);
    res.status(200).send({ results: paginatedResults, totalPages, page });
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

module.exports = {
  createJob,
  queryJobs,
  getJobById,
  getJobByEmail,
  applyJob,
  updateJobById,
  deleteJobById,
  postSaveJob,
  postUnSaveJob,
  searchJobs,
};
