const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const CVService = require('../services/cv.service');
const pdf = require('pdf-creator-node');
const fs = require('fs');
const path = require('path');
const { CREATED } = require('http-status');

var templateHtml = fs.readFileSync(path.join(__dirname, './../resources/CVTemplates/normal.html'), 'utf8');

const options = {
  format: 'A4',
  orientation: 'portrait',
  border: '10mm',
};

const downloadCV = catchAsync((req, res) => {
  const fileName = `${req.user.id}_${req.body.title}_${new Date().toISOString().split(/:/).join('-')}.pdf`;

  const document = {
    html: templateHtml,
    data: {
      user: req.user,
    },
    path: path.join(__dirname, './../../cvs/', fileName),
    type: '',
  };

  pdf
    .create(document, options)
    .then(async (responseData) => {
      req.user.cvs.push(fileName);
      req.user.markModified('cvs');
      await req.user.save();
      res.status(CREATED).json({ status: 'success' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'failed', error });
    });
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
