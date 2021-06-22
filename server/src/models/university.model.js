const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const { toJSON, paginate } = require('./plugins');

const universitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      es_indexed: true,
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
      es_indexed: true,
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
universitySchema.plugin(mongoosastic, { hosts: ['localhost:9200'], hydrate: true });

/**
 * @typedef University
 */
const University = mongoose.model('University', universitySchema);

// Start elastic mapping
University.createMapping(function (err, mapping) {
  if (err) console.log('University mapping error: ', err);
  else console.log('University mapping success: ', mapping);
});

module.exports = University;
