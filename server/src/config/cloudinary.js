const cloudinary = require('cloudinary').v2;
const config = require('./config');

cloudinary.config({
  CLOUDINARY_URL: config.cloudinary.id,
});

const uploadSingleProduct = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader
      .upload(file, {
        folder: 'products',
      })
      .then((result) => {
        if (result) {
          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
        }
      });
  });
};

const uploadSingleAvatar = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader
      .upload(file, {
        folder: 'avatars',
      })
      .then((result) => {
        if (result) {
          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
        }
      });
  });
};

const destroySingle = (id) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(id, (error, result) => {
      resolve(result);
    });
  });
};

const destroyMultiple = (IDs) => {
  return new Promise((resolve) => {
    cloudinary.api.delete_resources(IDs, (error, result) => {
      resolve(result);
    });
  });
};

module.exports = {
  uploadSingleProduct,
  uploadSingleAvatar,
  destroySingle,
  destroyMultiple,
};
