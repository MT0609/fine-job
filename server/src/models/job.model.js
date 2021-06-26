const mongoose = require('mongoose');
const validate = require('validator');
const { toJSON, paginate } = require('./plugins');
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
        es_indexed: true,
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
    },
    job: {
      applicants: [
        {
          type: Object,
          default: {},
        },
      ],
      applicantCount: {
        type: Number,
        default: 0,
      },
      jobType: [
        {
          type: String,
          enum: enumJobType,
        },
      ],
    },
    skills: [
      {
        type: String,
      },
    ],
    viewCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      require: true,
      es_indexed: true,
    },
    locations: [
      {
        type: String,
        default: [],
      },
    ],
    maxSalary: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: enumJobStatus,
      default: 'open',
    },
    directApplyUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);
jobSchema.plugin(mongoosastic, {
  hosts: ['localhost:9200'],
  hydrate: true,
});

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

// Start elastic mapping
Job.createMapping(function (err, mapping) {
  if (err) console.log('Job mapping error: ', err);
  else console.log('Job mapping success: ', mapping);
});

module.exports = Job;
