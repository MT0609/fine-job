const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { jobService } = require('../services');
const { uploadSingleAvatar } = require('../config/cloudinary');

const isUserOwnerJob = async (jobID, userID) => {
  const job = await jobService.getJobById(jobID);
  return job.creator.toString() === userID;
};

const createJob = catchAsync(async (req, res) => {
  // Add creator ID
  req.body.creator = req.user.id;
  const job = await jobService.createJob(req.body);
  res.status(httpStatus.CREATED).send(job);
});

const getJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await jobService.queryJobs(filter, options);
  res.send(result);
});

const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.jobID);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  res.send(job);
});

const updateJob = catchAsync(async (req, res) => {
  // Users can update own companies.
  const validOwner = await isUserOwnerJob(req.params.jobID, req.user.id);
  if (!validOwner) throw new ApiError(httpStatus.NOT_FOUND, 'Unable to update. You are not create this job');

  const job = await jobService.updateJobById(req.params.jobID, req.body);
  res.send(job);
});

const deleteJob = catchAsync(async (req, res) => {
  // Users can update own companies.
  const validOwner = await isUserOwnerJob(req.params.jobID, req.user.id);
  if (!validOwner) throw new ApiError(httpStatus.NOT_FOUND, 'Unable to delete. You are not create this job');

  await jobService.deleteJobById(req.params.jobID);
  res.status(httpStatus.NO_CONTENT).send();
});

const postSave = catchAsync(async (req, res) => {
  await jobService.postSaveJob(req.params.jobID, req.user.id);
  res.status(httpStatus.CREATED).send({});
});

const postUnSave = catchAsync(async (req, res) => {
  await jobService.postUnSaveJob(req.params.jobID, req.user.id);
  res.status(httpStatus.CREATED).send({});
});

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  postSave,
  postUnSave,
};
