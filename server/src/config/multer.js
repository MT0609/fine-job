const multer = require('multer');

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/image');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().split(/:/).join('-') + file.originalname);
  },
});

const cvStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/cv');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().split(/:/).join('-') + file.originalname);
  },
});

// Filter file support: jpg, jpeg, png
const imageFileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only support: jpg, jpeg, png file type!'), false);
  }
};

// Filter file support: pdf, docx, doc
const cvFileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'application/msword'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only support: pdf, docx, doc file type!'), false);
  }
};

const imageUpload = multer({
  storage: imageStorage,
  limits: 1024 * 1024 * 5, // 5 MB for each file
  imageFileFilter,
});

const cvUpload = multer({
  storage: cvStorage,
  limits: 1024 * 1024 * 5, // 5 MB for each file
  cvFileFilter,
});

module.exports = {
  imageUpload,
  cvUpload,
};
