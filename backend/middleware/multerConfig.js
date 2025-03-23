/**
 * @file upload.js
 * @brief Configuration for file uploads using Multer middleware.
 */

const multer = require("multer");
const path = require("path");

/**
 * @constant {Object} storage
 * @description Multer disk storage configuration.
 */
const storage = multer.diskStorage({
  /**
   * @function destination
   * @description Defines the destination folder for uploaded files.
   * @param {Object} req - Express request object.
   * @param {Object} file - Information about the uploaded file.
   * @param {Function} cb - Callback function.
   */
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  /**
   * @function filename
   * @description Defines how the uploaded files will be named.
   * @param {Object} req - Express request object.
   * @param {Object} file - Information about the uploaded file.
   * @param {Function} cb - Callback function.
   */
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/**
 * @constant {Object} upload
 * @description Multer middleware configuration for file uploads.
 */
const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB
  /**
   * @function fileFilter
   * @description Filters files based on their mimetype.
   * @param {Object} req - Express request object.
   * @param {Object} file - Information about the uploaded file.
   * @param {Function} cb - Callback function.
   */
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      cb(null, true); // Accepter le Fichier
    } else {
      cb(new Error("Seuls les fichiers JPEG et PNG sont autorisés"), false); // Rejeter le fichier
    }
  },
});

module.exports = upload;
