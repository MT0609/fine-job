const httpStatus = require('http-status');
const { CV } = require('../models');
const ApiError = require('../utils/ApiError');
const { formatUser, mergeDeep } = require('./user.service');
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

const getCVbyId = async (res, cvID) => {
  // Download file

  // const file = fs.createReadStream(
  //   path.join(__dirname, './../../cvs/60a1e302308c3e2aa40c0619_Backend Developer_2021-06-24T11-01-14.191Z.pdf')
  // );
  // const stat = fs.statSync(
  //   path.join(__dirname, './../../cvs/60a1e302308c3e2aa40c0619_Backend Developer_2021-06-24T11-01-14.191Z.pdf')
  // );

  // res.setHeader('Content-Length', stat.size);
  // res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');

  // file.pipe(res);
  // res.status(200).json({ status: 'success' });

  // Send file

  const filePath = path.join(
    __dirname,
    './../../cvs/60a1e302308c3e2aa40c0619_Backend Developer_2021-06-24T11-01-14.191Z.pdf'
  );
  fs.readFile(filePath, function (err, data) {
    res.contentType('application/pdf');
    res.send(data);
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

module.exports = {
  createCVbyUserandTitle,
  getAllCVbyUserId,
  getCVbyId,
  updateCVById,
};
