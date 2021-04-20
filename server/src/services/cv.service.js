const httpStatus = require('http-status');
const { CV } = require('../models');
const ApiError = require('../utils/ApiError');
const {formatUser, mergeDeep} = require('./user.service');

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

    let newCV = {userSnapShort: newuserSnapShort};

    if (updateBody.title == '' || updateBody.title === undefined || updateBody.title === null){
        delete newCV.title;
       
    }
    else{
        
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
    updateCVById
}