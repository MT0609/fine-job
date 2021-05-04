const config = require('./config');
const webPush = require('web-push');

const publicVapidKey = config.webPush.publicVapidKey;
const privateVapidKey = config.webPush.privateVapidKey;

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

module.exports = webPush;
