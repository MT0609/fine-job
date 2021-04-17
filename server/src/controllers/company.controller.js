const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { companyService } = require('../services');
const { uploadSingleAvatar } = require('../config/cloudinary');

const createCompany = catchAsync(async (req, res) => {
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
      const photos = [];
      uploaded['photos'].forEach(async (el) => {
        const retPts = await uploadSingleAvatar(el.path);
        await photos.push({ title: new Date(), url: retPts.url });
      });
      req.body.photos = photos;
    } else delete req.body.photos;
  }

  const company = await companyService.updateCompanyById(req.params.companyID, req.body);
  res.send(company);
});

const deleteCompany = catchAsync(async (req, res) => {
  await companyService.deleteCompanyById(req.params.companyID);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};
