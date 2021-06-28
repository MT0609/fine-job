const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const CVService = require('../services/cv.service');
const fs = require('fs');
const path = require('path');

const downloadCV = catchAsync(async (req, res) => {
  // const filePath = path.join(__dirname, `./../../cvs/60d6a7824106b11654a75126_60d6a7e64106b11654a7512b_cv1.pdf`);
  // const file = fs.createReadStream(filePath);
  // const stat = fs.statSync(filePath);

  // res.setHeader('Content-Length', stat.size);
  // res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');

  // file.pipe(res);
  // return;
  CVService.downloadCV(req, res);
});

const createCV = catchAsync(async (req, res) => {
  const userID = req.user._id;

  const user = await userService.getUserById(userID);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const CV = await CVService.createCVbyUserandTitle(user, req.body.title);

  res.status(httpStatus.CREATED).send(CV);
});

const getUserCV = catchAsync(async (req, res) => {
  let { cvId } = req.query;
  const userID = req.user._id;

  const user = await userService.getUserById(userID);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (cvId === undefined || cvId === null || cvId === '') {
    const CVs = await CVService.getAllCVbyUserId(userID);
    return res.send(CVs);
  } else {
    const CV = await CVService.getCVbyId(cvId);
    if (!CV) {
      throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
    }
    return res.send(CV);
  }
});

const getAUserCV = catchAsync(async (req, res) => {
  let cvId = req.params.cvId;

  const CV = await CVService.getCVbyId(cvId);

  if (!CV) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
  }

  res.send(CV);
});

const updateCV = catchAsync(async (req, res) => {
  let { cvId } = req.query;
  const userID = req.user._id;

  const user = await userService.getUserById(userID);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  let CV;
  if (req.body.education) CV = await CVService.updateEducation(cvId, req.body.education);
  else if (req.body.accomplish) CV = await CVService.updateAccomplish(cvId, req.body.accomplish);
  else CV = await CVService.updateCVById(cvId, req.body);

  res.send(CV);
});

const deleteCV = catchAsync(async (req, res) => {
  let { cvId } = req.query;
  const userID = req.user._id;

  const user = await userService.getUserById(userID);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  let result;
  if (req.body.education) result = await CVService.deleteEducation(cvId, req.body.education);
  else if (req.body.accomplish) result = await CVService.deleteAccomplish(cvId, req.body.accomplish);
  else result = await CVService.deleteCVById(cvId);

  res.send(result);
});

module.exports = {
  downloadCV,
  createCV,
  getUserCV,
  getAUserCV,
  updateCV,
  deleteCV,
};
