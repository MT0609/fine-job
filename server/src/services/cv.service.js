const httpStatus = require('http-status');
const { CV } = require('../models');
const ApiError = require('../utils/ApiError');
const { formatUser, mergeDeep } = require('./user.service');
const pdf = require('pdf-creator-node');
const fs = require('fs');
const path = require('path');

/**
 * Create a CV
 * @param {Object} user
 * @param {string} title
 * @returns {Promise<CV>}
 */
const createCVbyUserandTitle = async (user, title) => {
  let CVs = new CV({ title: title, userID: user._id }); //Object.assign({title: title, userID: user._id}, user);
  CVs.userSnapShort = user;

  const newCV = await CV.create(CVs);

  return newCV;
};

/**
 * Get user by usserID
 * @param {string} userID
 * @returns {Promise<CV>}
 */

const getAllCVbyUserId = async (userID) => {
  return CV.find({ userID: userID });
};

/**
 * Get user by cv ID
 * @param {string} cvID
 * @returns {Promise<CV>}
 */

const getCVbyId = async (cvID) => {
  return CV.findById(cvID);
};

const downloadCV = async (req, res) => {
  const userID = req.user.id;
  const cv = await getCVbyId(req.query.id);
  if (!cv) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
  }
  const fileName = `${userID}_${req.query.id}_${req.query.title}.pdf`;

  const templateHtml = fs.readFileSync(path.join(__dirname, './../resources/CVTemplates/normal.html'), 'utf8');

  const options = {
    format: 'A4',
    orientation: 'portrait',
  };

  const document = {
    html: templateHtml,
    data: {
      cvs: [{ ...cv['_doc'], profileURL: `${req.protocol}://${req.hostname}/profile/${cv.userID}` }],
    },
    path: path.join(__dirname, './../../cvs/', fileName),
    type: '',
  };

  pdf
    .create(document, options)
    .then((responseData) => {
      const filePath = path.join(__dirname, `./../../cvs/${fileName}`);
      const file = fs.createReadStream(filePath);
      const stat = fs.statSync(filePath);

      res.setHeader('Content-Length', stat.size);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');

      file.pipe(res);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'failed', error });
    });
};

/**
 * Update user by id
 * @param {ObjectId} cvId
 * @param {Object} updateBody
 * @returns {Promise<CV>}
 */
const updateCVById = async (cvId, updateBody) => {
  const CV = await getCVbyId(cvId);
  if (!CV) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
  }

  let changeCV = formatUser(updateBody);

  let newuserSnapShort = mergeDeep(CV.userSnapShort, changeCV);

  let newCV = { userSnapShort: newuserSnapShort };

  if (updateBody.title == '' || updateBody.title === undefined || updateBody.title === null) {
    delete newCV.title;
  } else {
    newCV.title = updateBody.title;
  }
  //update ngay sua
  //de giu lai thanh phan user

  newCV.lastEdited = Date.now();
  Object.assign(CV, newCV);

  await CV.save();
  return CV;
};

/**
 * Update user by id
 * @param {ObjectId} cvId
 * @param {Object} eduData
 * @returns {Promise<CV>}
 */
const updateEducation = async (cvId, eduData) => {
  const cv = await getCVbyId(cvId);
  if (!cv) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
  }

  if (!eduData.id) {
    eduData.id = require('mongoose').Types.ObjectId();
    cv.userSnapShort.baseInfo.educations.push(eduData);
  } else {
    let index = cv.userSnapShort.baseInfo.educations.findIndex((item) => item.id.toString() === eduData.id.toString());
    if (index > -1) {
      cv.userSnapShort.baseInfo.educations.splice(index, 1);
      cv.userSnapShort.baseInfo.educations.splice(index, 0, eduData);
    }
  }
  cv.markModified('userSnapShort.baseInfo.educations');
  await cv.save();
  return cv;
};

/**
 * Update user by id
 * @param {ObjectId} cvId
 * @param {Object} eduData
 * @returns {Promise<CV>}
 */
const deleteEducation = async (cvId, eduData) => {
  const cv = await getCVbyId(cvId);
  if (!cv) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
  }

  let index = cv.userSnapShort.baseInfo.educations.findIndex((item) => item.id.toString() === eduData.id.toString());
  if (index > -1) {
    cv.userSnapShort.baseInfo.educations.splice(index, 1);
    cv.markModified('userSnapShort.baseInfo.educations');
    await cv.save();
  }
  return cv;
};

/**
 * Update user by id
 * @param {ObjectId} cvId
 * @param {Object} eduData
 * @returns {Promise<CV>}
 */
const updateAccomplish = async (cvId, accomplishData) => {
  const cv = await getCVbyId(cvId);
  if (!cv) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
  }

  if (!accomplishData.id) {
    accomplishData.id = require('mongoose').Types.ObjectId();
    cv.userSnapShort.accomplishments.push(accomplishData);
  } else {
    let index = cv.userSnapShort.accomplishments.findIndex((item) => item.id.toString() === accomplishData.id.toString());
    if (index > -1) {
      cv.userSnapShort.accomplishments.splice(index, 1);
      cv.userSnapShort.accomplishments.splice(index, 0, accomplishData);
    }
  }
  cv.markModified('userSnapShort.accomplishments');
  await cv.save();
  return cv;
};

/**
 * Update user by id
 * @param {ObjectId} cvId
 * @param {Object} eduData
 * @returns {Promise<CV>}
 */
const deleteAccomplish = async (cvId, accomplishData) => {
  const cv = await getCVbyId(cvId);
  if (!cv) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
  }

  let index = cv.userSnapShort.accomplishments.findIndex((item) => item.id.toString() === accomplishData.id.toString());
  if (index > -1) {
    cv.userSnapShort.accomplishments.splice(index, 1);
    cv.markModified('userSnapShort.accomplishments');
    await cv.save();
  }
  return cv;
};

const deleteCVById = async (cvId) => {
  CV.findByIdAndDelete(cvId, function (err, docs) {
    if (err) {
      console.log(err);
      throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
    } else {
      return docs;
    }
  });
};

module.exports = {
  createCVbyUserandTitle,
  getAllCVbyUserId,
  getCVbyId,
  downloadCV,
  updateCVById,
  updateEducation,
  deleteEducation,
  updateAccomplish,
  deleteAccomplish,
  deleteCVById,
};
