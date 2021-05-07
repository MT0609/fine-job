const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');
const { uploadSingleAvatar } = require('../config/cloudinary');

const createMessage = catchAsync(async (req, res) => {
  // Add sender
  req.body.senderID = req.user.id;
  const message = await messageService.createMessage(req.body);
  res.status(httpStatus.CREATED).send(message);
});

const getMessages = catchAsync(async (req, res) => {
  const { partnerID } = pick(req.query, ['partnerID']);
  const filter = { senderID: req.user.id, partnerID: partnerID };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await messageService.queryMessages(filter, options);
  res.send(result);
});

const getListUserMessages = catchAsync(async (req, res) => {
  const filter = { senderID: req.user.id };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await messageService.queryListUserMessages(filter, options);
  res.send(result);
});

const deleteMessage = catchAsync(async (req, res) => {
  const { partnerID, msgID } = pick(req.query, ['partnerID', 'msgID']);
  const filter = { userID_1: partnerID, userID_2: req.user.id };
  // Add sender id
  filter.senderID = req.user.id;
  filter.partnerID = partnerID;
  filter.msgID = msgID;
  const result = await messageService.deleteMessage(filter);
  res.send(result);
});

const deleteConversation = catchAsync(async (req, res) => {
  const { partnerID } = pick(req.query, ['partnerID']);
  const filter = { userID_1: partnerID, userID_2: req.user.id };
  // Add sender id
  filter.senderID = req.user.id;
  filter.partnerID = partnerID;
  const result = await messageService.deleteConversation(filter);
  res.send(result);
});

module.exports = {
  createMessage,
  getMessages,
  getListUserMessages,
  deleteMessage,
  deleteConversation,
};
