const express = require('express')
const globalController = require('../controllers/GlobalController');

const homeController = require('../controllers/HomeController');

const isUser = require('../middleware/isUser');

const multer = require("multer");
const { memoryStorage } = require("multer");
const path = require("path");
const crypto = require("crypto");

const salonRoute = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/uploads");
    },
    filename: (req, file, cb) => {
      const randomString = crypto.randomBytes(8).toString("hex");
      const fileExtension = path.extname(file.originalname);
      const uniqueFilename = randomString + fileExtension;
      cb(null, uniqueFilename);
    },
  });
  const upload = multer({ storage });

salonRoute.route('/')
.get(isUser, globalController.getSalonDetails)
.put(isUser,
    upload.fields([
      { name: "salonLogo", maxCount: 1 },
      { name: "addressProof", maxCount: 1 },
      { name: "images", maxCount: 5 },
    ]),
    (req, res) => globalController.updateSalonDetails (req, res))
.delete(isUser, globalController.deleteSalon)

salonRoute.route('/salonhome')
.get(isUser, homeController.homeSalon)

module.exports = salonRoute;