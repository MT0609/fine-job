const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { subscriptionService } = require('../services');

const createSubscription = catchAsync(async (req, res) => {
  // https://github.com/web-push-libs/web-push#sendnotificationpushsubscription-payload-options
  // subscription: {endpoint: "string", keys: {p256dh: "string", auth: "string"}}
  // payload: {title: "string", body: "string"}

  const body = { userID: req.body.userID, ...req.body.subscription };
  const subscription = await subscriptionService.createSubscription(body);
  res.status(httpStatus.CREATED).send(subscription);
});

const getSubscriptions = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await subscriptionService.querySubscriptions({}, options);
  res.send(result);
});

const getSubscription = catchAsync(async (req, res) => {
  const subscription = await subscriptionService.getSubscriptionById(req.params.subscriptionID);
  if (!subscription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'subscription not found');
  }
  res.send(subscription);
});

const deleteSubscription = catchAsync(async (req, res) => {
  await subscriptionService.deleteSubscriptionById(req.params.subscriptionID);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSubscription,
  getSubscriptions,
  getSubscription,
  deleteSubscription,
};
