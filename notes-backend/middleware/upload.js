// middleware/upload.js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log('🧪 Checking file type...');
    console.log('📄 File name:', file.originalname);
    console.log('📄 MIME type:', file.mimetype);

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log('🚫 File rejected: Invalid type');
      cb(new Error('Only PDF and DOCX files are allowed'), false);
    }
  }
});

export default upload;
