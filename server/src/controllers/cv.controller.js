const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const  userService = require('../services/user.service');
const  CVService = require('../services/cv.service');

const createCV = catchAsync(async (req, res) => {


    const userID = req.user._id;

    const user = await userService.getUserById(userID);
    
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    
    const CV = await CVService.createCVbyUserandTitle(user, req.body.title);
  
    res.status(httpStatus.CREATED).send(CV);
})

const getUserCV = catchAsync(async(req, res) => {

    let {cvId }= req.query;
    const userID = req.user._id;

    const user = await userService.getUserById(userID);
    
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    
    if (cvId === undefined || cvId === null || cvId === ''){
        const CVs = await CVService.getAllCVbyUserId(userID);
        
        return res.send(CVs);
    }
    else{
        const CV = await CVService.getCVbyId(cvId);
        if (!CV) {
            throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
        }

        return res.send(CV);

    }
    
})

const getAUserCV = catchAsync(async(req, res) => {

    
    let cvId = req.params.cvId;

    const CV = await CVService.getCVbyId(cvId);

    if (!CV) {
        throw new ApiError(httpStatus.NOT_FOUND, 'CV not found');
    }

    res.send(CV);
})

const updateCV = catchAsync(async (req, res) => {

    let { cvId }= req.query;
    const userID = req.user._id;
    
    const user = await userService.getUserById(userID);
    
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }


    const CV = await CVService.updateCVById(cvId, req.body);

    
    res.send(CV);
})

module.exports = {
    createCV,
    getUserCV,
    getAUserCV,
    updateCV
}