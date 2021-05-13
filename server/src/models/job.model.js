const mongoose = require('mongoose');
const validate = require('validator');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');
const { number, string } = require('joi');
const mongoosastic = require('mongoosastic');

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

const jobSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      index: true,
      es_indexed: true,
    },
    company: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
      },
      avatar: {
        type: String,
        default: '',
      },
      size: {
        type: Number,
        default: 0,
      },
      industry: {
        type: String,
        enum: enumIndustry,
        default: 'Services',
      },
    },
    posted: {
      type: Date,
      default: new Date(),
      es_indexed: true,
    },
    job: {
      applicantCount: {
        type: Number,
        default: 0,
      },
      jobType: [
        {
          type: String,
          enum: enumJobType,
          es_indexed: true,
        },
      ],
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
      es_indexed: true,
    },
    locations: {
      type: Array,
      default: [],
    },
    maxSalary: {
      type: Number,
      default: 0,
      es_indexed: true,
    },
    status: {
      type: String,
      enum: enumJobStatus,
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);
jobSchema.plugin(mongoosastic, { hosts: ['localhost:9200'], hydrate: true });

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
