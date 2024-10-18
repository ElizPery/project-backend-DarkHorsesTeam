import multer from 'multer';
import path from 'node:path';

const TEMP_UPLOAD_DIR = './temp';

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error('Invalid file type. Only JPEG and PNG files are allowed.'),
      false,
    );
  }

  cb(null, true);
};

const storage = multer.diskStorage({
  destination: TEMP_UPLOAD_DIR,
  filename: (req, file, callback) => {
    const uniquePreffix = Date.now();
    callback(null, `${uniquePreffix}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
