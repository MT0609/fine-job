const mongoose = require('mongoose');

const subscriptionSchema = new mongo.Schema(
  {
    endpoint: { type: String, unique: true, required: true },
    expirationTime: { type: Number, required: false },
    keys: {
      auth: String,
      p256dh: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Subscriptions
 */
const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
