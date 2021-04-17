const httpStatus = require('http-status');
const { Job } = require('../models');
const ApiError = require('../utils/ApiError');

const { getCompanyById } = require('../services/company.service');

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
  return job;
};

module.exports = {
  createJob,
  queryJobs,
  getJobById,
  getJobByEmail,
  updateJobById,
  deleteJobById,
};
