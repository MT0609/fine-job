const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const universitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alpha_two_code: {
      type: String,
      ref: 'User',
      required: true,
    },
    'state-province': {
      type: Object,
      default: null,
    },
    domains: {
      type: Array,
      default: [],
    },
    country: {
      type: String,
      required: true,
    },
    web_pages: {
      type: Array,
      default: [],
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
universitySchema.plugin(toJSON);
universitySchema.plugin(paginate);

/**
 * @typedef University
 */
const University = mongoose.model('University', universitySchema);

module.exports = University;
