const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    username: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      phone: myCustomJoi.string().phoneNumber(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      dob: Joi.date().raw(),
      about: Joi.string(),
      country: Joi.string(),
      locations: Joi.string(),
      industry: Joi.string(),
      education: Joi.object(), // educations: education[]
      skills: Joi.array(),
    })
    .min(1),
};

const modifyEducation = {
  body: Joi.object().keys({
    id: Joi.allow(null, ''),
    school: Joi.object().required(),
    degree: Joi.allow(null, ''),
    major: Joi.allow(null, ''),
    start_date: Joi.date().allow(null, ''),
    end_date: Joi.date().allow(null, ''),
  }),
};

const modifyAccomplishment = {
  body: Joi.object().keys({
    id: Joi.allow(null, ''),
    name: Joi.string().required(),
    description: Joi.allow(null, ''),
    url: Joi.allow(null, ''),
    major: Joi.allow(null, ''),
    start_date: Joi.date().allow(null, ''),
    end_date: Joi.date().allow(null, ''),
  }),
};

const deleteEducation = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getConnStatus = {
  params: Joi.object().keys({
    receiverID: Joi.string().custom(objectId),
  }),
};

const sendConnReq = {
  params: Joi.object().keys({
    receiverID: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    senderUrl: Joi.string().required(),
    receiverUrl: Joi.string().required(),
  }),
};

const acceptConnReq = {
  params: Joi.object().keys({
    receiverID: Joi.string().custom(objectId),
  }),
  query: {
    notificationID: Joi.string().custom(objectId),
  },
};

const deleteConnReq = {
  params: Joi.object().keys({
    receiverID: Joi.string().custom(objectId),
  }),
};

const deleteFriend = {
  params: Joi.object().keys({
    receiverID: Joi.string().custom(objectId),
  }),
};

const postSearchUsers = {
  query: Joi.object().keys({
    q: Joi.string().allow('', null),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  modifyEducation,
  modifyAccomplishment,
  deleteEducation,
  deleteUser,
  sendConnReq,
  acceptConnReq,
  deleteConnReq,
  deleteFriend,
  postSearchUsers,
  getConnStatus,
};
