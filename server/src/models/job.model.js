const mongoose = require('mongoose');
const validate = require('validator');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const enumIndustry = {
  values: ['Information Technology & Services', 'Services', 'Information Technology'],
  message: `Industry must be 'Information Technology & Services', 'Services' or 'Information Technology'!`,
};

const enumJobType = {
  values: ['full-time', 'part-time', 'internship', 'contract', 'remote', 'temporary', 'volunteer'],
  message: `JobType must be 'full-time', 'part-time', 'internship', 'contract', 'remote', 'temporary', or 'volunteer'!`,
};

const enumJobStatus = {
  values: ['open', 'close'],
  message: `JobStatus must be 'open' or 'close'!`,
};

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    company: {
      avatar: {
        type: String,
      },
      location: {
        type: String,
      },
      cpn: {
        size: {
          type: Number,
        },
        industry: {
          type: String,
          enum: enumIndustry,
        },
      },
    },
    posted: {
      type: Date,
      default: new Date(),
    },
    job: {
      applicantCount: {
        type: Number,
        default: 0,
      },
      jobType: {
        type: String,
        enum: enumJobType,
      },
    },
    skills: {
      type: Array,
      default: [],
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      require: true,
    },
    companyID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Company',
      required: true,
    },
    status: {
      type: String,
      enum: enumJobStatus,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
