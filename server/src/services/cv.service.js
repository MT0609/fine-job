const httpStatus = require('http-status');
const { CV } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create a CV
 * @param {Object} user
 * @param {string} title
 * @returns {Promise<CV>}
*/
const createCVbyUserandTitle = async (user, title) =>{

    let CVs  = new CV({title: title, userID: user._id});//Object.assign({title: title, userID: user._id}, user);
    CVs.userSnapShort = user;

    const newCV = await CV.create(CVs);

    return newCV;
}


/**
 * Get user by usserID
 * @param {string} userID
 * @returns {Promise<CV>}
 */

const getAllCVbyUserId = async (userID) =>{

    return CV.find({userID: userID});;
}


/**
 * Get user by cv ID
 * @param {string} cvID
 * @returns {Promise<CV>}
 */

 const getCVbyId = async (cvID) =>{

    return CV.findById(cvID);
}

module.exports = {
    createCVbyUserandTitle,
    getAllCVbyUserId,
    getCVbyId
}