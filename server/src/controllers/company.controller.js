const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { companyService } = require('../services');
const { uploadSingleAvatar } = require('../config/cloudinary');

const isUserOwnerCompany = async (companyID, userID) => {
  const company = await companyService.getCompanyById(companyID);
  return company.owner === userID;
};

const createCompany = catchAsync(async (req, res) => {
  // Add owner company
  req.body.owner = req.user.id;
  const company = await companyService.createCompany(req.body);
  res.status(httpStatus.CREATED).send(company);
});

const getCompanies = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await companyService.queryCompanies(filter, options);
  res.send(result);
});

const getCompany = catchAsync(async (req, res) => {
  const company = await companyService.getCompanyById(req.params.companyID);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  res.send(company);
});

const updateCompany = catchAsync(async (req, res) => {
  // Users can update own companies.
  const validOwner = await isUserOwnerCompany(req.params.companyID, req.user.id);
  if (!validOwner) throw new ApiError(httpStatus.NOT_FOUND, 'Unable to update. You are not owner this company');

  // File uploads
  if (req.files) {
    const uploaded = req.files;

    // Avatar upload
    if (uploaded['avatar']) {
      const retAvt = await uploadSingleAvatar(uploaded['avatar'][0].path);
      req.body.avatar = retAvt.url;
    } else delete req.body.avatar;

    // Background avt upload
    if (uploaded['backgroundAvt']) {
      const retBgAvt = await uploadSingleAvatar(uploaded['backgroundAvt'][0].path);
      req.body.backgroundAvt = retBgAvt.url;
    } else delete req.body.backgroundAvt;

    // Photos upload
    if (uploaded['photos']) {
      const rets = await Promise.all(
        uploaded['photos'].map(async (el) => {
          const retPts = await uploadSingleAvatar(el.path);
          return { title: new Date(), url: retPts.url };
        })
      );
      req.body.photos = rets;
    } else delete req.body.photos;
  }

  const company = await companyService.updateCompanyById(req.params.companyID, req.body);
  res.send(company);
});

const deleteCompany = catchAsync(async (req, res) => {
  // Users can update own companies.
  const validOwner = await isUserOwnerCompany(req.params.companyID, req.user.id);
  if (!validOwner) throw new ApiError(httpStatus.NOT_FOUND, 'Unable to delete. You are not owner this company');

  await companyService.deleteCompanyById(req.params.companyID);
  res.status(httpStatus.NO_CONTENT).send();
});

const postFollow = catchAsync(async (req, res) => {
  await companyService.postFollowCompany(req.params.companyID, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const postUnFollow = catchAsync(async (req, res) => {
  await companyService.postUnFollowCompany(req.params.companyID, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  postFollow,
  postUnFollow,
};
