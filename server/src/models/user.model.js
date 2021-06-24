const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

// Utils func
//const { randomPassword } = require('./../utils/passport');

const enumUser = {
  values: ['candidate', 'employer', 'admin'],
  message: `Quyền người dùng phải là 'candidate', 'employer', 'admin'!`,
};

const enumStatus = {
  values: ['open', 'close'],
  message: `Trạng thái phải là 'open' or 'close'!`,
};

const enumSex = {
  values: ['male', 'female', 'other'],
  message: `Trạng thái phải là 'male', 'female', 'other'!`,
};

const userSchema = mongoose.Schema(
  {
    baseInfo: {
      firstName: {
        type: String,
        required: [true, 'Họ là bắt buộc!'],
        trim: true,
        es_indexed: true,
      },
      lastName: {
        type: String,
        required: [true, 'Tên là bắt buộc!'],
        trim: true,
        es_indexed: true,
      },
      sex: {
        type: String,
        enum: enumSex,
        required: true,
      },
      headLine: {
        type: String,
        default: '',
        es_indexed: true,
      },
      educations: {
        type: Array,
        default: [],
        // luu object gom avt cua truong hoc va thong tin co ban
      },
      country: {
        type: String,
        default: '',
      },
      locations: {
        type: String,
        default: '',
      },
      industry: {
        type: String,
        default: '',
        es_indexed: true,
      },
      dob: {
        type: Date,
        required: true,
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    backgroundAvt: {
      type: String,
      default: '',
    },

    avatar: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: enumStatus,
    },
    contact: {
      email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
        es_indexed: true,
      },
      phone: {
        type: String,
        default: '',
        es_indexed: true,
      },
    },
    about: {
      type: String,
      default: '',
      es_indexed: true,
    },
    connections: {
      type: Array,
      default: [],
    },
    features: {
      type: String,
      default: '',
    },
    cvs: {
      type: Array,
      default: [],
    },
    dashboard: {
      type: Array,
      default: [],
      //profileViewCount, articleCount, searchApperanceCount
    },
    experiences: {
      type: Array,
      default: [],
    },
    applies: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    savePosts: {
      type: Array,
      default: [],
    },
    licenseAndCerts: {
      type: Array,
      default: [],
    },
    volunteers: {
      type: Array,
      default: [],
    },
    skills: {
      type: Array,
      default: [],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    roles: {
      type: String,
      enum: enumUser,
      default: 'candidate',
    },
    likes: {
      type: Array,
      default: [],
    },
    notifications: {
      type: Array,
      default: [],
    },
    activities: {
      type: Array,
      default: [],
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
      default: Date.now(),
    },
    google: {
      type: Object,
      default: {
        id: '',
        token: '',
      },
    },
    facebook: {
      type: Object,
      default: {
        id: '',
        token: '',
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
userSchema.plugin(mongoosastic, {
  hosts: ['localhost:9200'],
  hydrate: true,
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);
// Start elastic mapping
User.createMapping(function (err, mapping) {
  if (err) console.log('User mapping error: ', err);
  else console.log('User mapping success: ', mapping);
});

module.exports = User;
