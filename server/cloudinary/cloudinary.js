const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadFile = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'uploads',
  });
};

module.exports = { uploadFile };
