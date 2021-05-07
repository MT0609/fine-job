const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const companyRoute = require('./company.route');
const cvRoute = require('./cv.route');
const jobRoute = require('./job.route');
const messageRoute = require('./message.route');
const notificationRoute = require('./notification.route');
const subscriptionRoute = require('./subscription.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/companies',
    route: companyRoute,
  },
  {
    path: '/jobs',
    route: jobRoute,
  },
  {
    path: '/messages',
    route: messageRoute,
  },
  {
    path: '/cvs',
    route: cvRoute,
  },
  {
    path: '/notifications',
    route: notificationRoute,
  },
  {
    path: '/subscriptions',
    route: subscriptionRoute,
  },
  // {
  //   path: '/jobs',
  //   route: jobRoute,
  // },
  // {
  //   path: '/messages',
  //   route: messageRoute,
  // },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
