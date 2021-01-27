import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = fileTypes.test(file.mimetype);

  if (extName && mime) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.route('/').post(upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
