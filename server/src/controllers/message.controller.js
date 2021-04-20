const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');
const { uploadSingleAvatar } = require('../config/cloudinary');

const createMessage = catchAsync(async (req, res) => {
  // Add sender
  req.body.sender = req.user.id;
  const message = await messageService.createMessage(req.body);
  res.status(httpStatus.CREATED).send(message);
});

const getMessages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userID_1', 'userID_2', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await messageService.queryMessages(filter, options);
  res.send(result);
});

const deleteMessage = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userID_1', 'userID_2', 'msgID']);
  // Add sender id
  filter.senderID = req.user.id;
  const result = await messageService.deleteMessage(filter);
  res.send(result);
});

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};
