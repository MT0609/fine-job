const mongoose = require('mongoose');
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
    baseInfo :{
      firstName: {
          type: String,
          required: [true, 'Họ là bắt buộc!'],
          trim: true,
      },
      lastName: {
          type: String,
          required: [true, 'Tên là bắt buộc!'],
          trim: true,
      },
      sex: {
          type: String,
          enum: enumSex,
          required: true,
      },
      headLine:{
          type: String,
          default: '',
      },
      educations:{
          type: Array,
          default: [],
          // luu object gom avt cua truong hoc va thong tin co ban
      },
      country: {
          type: String,
          default: "",
      },
      locations: {
          type: String,
          default: "",
      },
      industry: {
          type: String,
          default: "",
      },
      dob:{
          type: Date,
          required: true,
      } 
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    backgroundAvt: {
        type: String,
        default: "",
    },
  
    avatar: {
    type: String,
    default: '',
    },
 
    status:{
        type: String,
        enum: enumStatus,

    },
    ///--------------------------------------------
    contacts: {
      
       
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
        },
        phone: {

          type: String,
          default: '',
        }   
  
    
    },
    about: {
        type: String,
        default: '',
    },
    connections: {

        type: Array,
        default: [],
        //mot object lu user_id cua ban be
    },
    features: {

        type: String,
        default: '',
        //link blog, site
    },
    dashboard: {

        type: Array,
        default: [],
        //profileViewCount, articleCount, searchApperanceCount
    },
    experiences: {

        type: Array,
        default: [],
        //luu kinh nghiem cua nguoi do, nhung job da lam
    },
    followings: {

        type: Array,
        default: [],
    },
    savePosts: {

        type: Array,
        default: [],
        //save cac bai post tuyen dung
    },
    licenseAndCerts: {

        type: Array,
        default: [],
        //cac giay chung nhan
    },
    volunteers: {

        type: Array,
        default: [],
        //Hoat dong tinh nguyen
    },
    skills: {
        type: Array,
        default: [],
        //cac ki nang ngoai
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
  notficaions: {
    type: Array,
    default: [],
  },
  activities: {
    type: Array,
    default: [],
  },
  passwordResetToken: {
    type: String,
    //default: randomPassword(10),
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

module.exports = User;
