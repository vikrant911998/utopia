const multer = require("multer");
const path = require("path");
const rootDirPath = require("../utils/dirRoot.util");

const fileStorageDirPath = path.join(rootDirPath, "product_images")

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileStorageDirPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}-${file.originalname}`
    );
  },
});

const fileFilters = (req, file, cb) => {
  if(
    file.mimetype === 'image/jpeg' || 
    file.mimetype === 'image/jpg' || 
    file.mimetype === 'image/png'
  ){
    cb(null, true);
  }
  else{
    cb(null, false);
  }
};

const fileUploadConfig = (app) => {
  app.use(
    multer({storage: fileStorage, fileFilter: fileFilters}).single('image'),
  );
};

module.exports = fileUploadConfig;
