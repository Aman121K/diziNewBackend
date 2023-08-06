// import { forgotPassword } from './../controllers/auth'
const express = require('express')
const { check, body } = require('express-validator')

const authRoute = express.Router();
const globalController = require("../controllers/GlobalController");
const isUser = require('../middleware/isUser');

const multer = require("multer");
const { memoryStorage } = require("multer");
const path = require("path");
const crypto = require("crypto");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/uploads/banners");
    },
    filename: (req, file, cb) => {
      const randomString = crypto.randomBytes(8).toString("hex");
      const fileExtension = path.extname(file.originalname);
      const uniqueFilename = randomString + fileExtension;
      cb(null, uniqueFilename);
    },
  });
  const upload = multer({ storage });

authRoute.post(
    '/sendOtp',
    [
        check('countryCode')
            .isLength({
                min: 1
            })
            .withMessage('Please provide a Country Code.'),
        check('phone')
            .isLength({
                min: 3
            })
            .withMessage('Please provide a Phone Number.'),
    ],
    globalController.sendOtp
)

authRoute.post(
    '/signup',
    [
        check('email').isEmail().withMessage('Please provide a valid E-Mail!')
    ],
    globalController.signUp
)

authRoute.post(
    '/login',
    [
        check('phone')
            .isLength({
                min: 3
            })
            .withMessage('Please provide a Phone Number.'),
        check('pin').isLength({ min: 4 }).withMessage('Pin length should be minimum of 4 Digits')
    ],
    globalController.login
)


authRoute.post('/sociallogin',[
    check('socialId')
        .isLength({
            min: 3
        })
        .withMessage('Please provide social id'),
] ,globalController.socialLogin);

authRoute.post('/forgetpassword', globalController.forgetPassword);

authRoute.post('/resetpassword',globalController.resetPassword);

authRoute.get('/signout', globalController.signout)

authRoute.route('/addBanner')
.post(isUser,
    upload.fields([
      { name: "link", maxCount: 1 },
    ]),
    (req, res) => globalController.addBanner (req, res))

module.exports = authRoute
