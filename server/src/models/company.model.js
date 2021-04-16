const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const enumCompanyType = {
  values: ['closing', 'publishing', 'personal'],
  message: `CompanyType must be 'closing', 'publishing' or 'personal'!`,
};

const enumIndustry = {
  values: ['Information Technology & Services', 'Services', 'Information Technology'],
  message: `Industry must be 'Information Technology & Services', 'Services' or 'Information Technology'!`,
};

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    backgroundAvt: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    headLine: {
      type: String,
      default: '',
    },
    followers: [
      {
        userID: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'User',
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
    ],
    about: {
      type: String,
      default: '',
    },
    employees: [
      {
        userID: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'User',
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
    ],
    baseInfo: {
      linkWeb: {
        type: String,
        default: '',
      },
      industry: {
        type: String,
        enum: enumIndustry,
      },
      companySize: {
        type: Number,
        default: 0,
      },
      headQuarter: {
        type: String,
        default: 'Vietnam',
      },
      type: {
        type: String,
        enum: enumCompanyType,
      },
      founded: {
        type: Number,
        required: true,
      },
      specialties: {
        type: Array,
        default: [],
      },
    },
    locations: [
      {
        name: {
          type: String,
        },
        lang: {
          type: Number,
        },
        long: {
          type: Number,
        },
      },
    ],
    jobs: {
      type: Array,
      default: [],
    },
    photos: [
      {
        title: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
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
companySchema.plugin(toJSON);
companySchema.plugin(paginate);

/**
 * Check if company name is taken
 * @param {string} name - The company's name
 * @param {ObjectId} [excludeCompanyId] - The id of the company to be excluded
 * @returns {Promise<boolean>}
 */
companySchema.statics.isNameTaken = async function (name, excludeCompanyId) {
  const company = await this.findOne({ name, _id: { $ne: excludeCompanyId } });
  return !!company;
};

/**
 * @typedef Company
 */
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
