const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { jobService } = require('../services');
const { uploadSingleAvatar } = require('../config/cloudinary');

const createJob = catchAsync(async (req, res) => {
  const job = await jobService.createJob(req.body);
  res.status(httpStatus.CREATED).send(job);
});

const getJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
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
  // File uploads
  if (req.files) {
    const uploaded = req.files;

    // Avatar upload
    if (uploaded['avatar']) {
      const retAvt = await uploadSingleAvatar(uploaded['avatar'][0].path);
      req.body.avatar = retAvt.url;
    } else delete req.body.avatar;

    // Background avt upload
    if (uploaded['backgroundAvt']) {
      const retBgAvt = await uploadSingleAvatar(uploaded['backgroundAvt'][0].path);
      req.body.backgroundAvt = retBgAvt.url;
    } else delete req.body.backgroundAvt;

    // Photos upload
    if (uploaded['photos']) {
      const rets = await Promise.all(
        uploaded['photos'].map(async (el) => {
          const retPts = await uploadSingleAvatar(el.path);
          return { title: new Date(), url: retPts.url };
        })
      );
      req.body.photos = rets;
    } else delete req.body.photos;
  }

  const job = await jobService.updateJobById(req.params.jobID, req.body);
  res.send(job);
});

const deleteJob = catchAsync(async (req, res) => {
  await jobService.deleteJobById(req.params.jobID);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
