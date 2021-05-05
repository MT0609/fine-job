const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: null,
    },
    endpoint: { type: String, unique: true, required: true },
    expirationTime: { type: Number, required: false, default: new Date() },
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
