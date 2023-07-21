// import { forgotPassword } from './../controllers/auth'
const express = require('express')
const { check, body } = require('express-validator')

const authRoute = express.Router();
const globalController = require("../controllers/GlobalController");

authRoute.post(
    '/check',
    [
        check('email').isEmail().withMessage('Please provide a valid E-Mail!'),
    ],
    globalController.checkEMail
)

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

authRoute.post(
    '/checkUsername',
    [
        check('username').isLength({ min: 4 }).withMessage('Please provide a valid Username.'),
    ],
    globalController.checkUsername
)

// authRoute.post(
//     '/setMpin',
//     [
//         check('pin').isLength({ min: 4 }).withMessage('Pin length should be minimum of 4 Digits')
//     ],
//     globalController.setMpin
// )

// authRoute.post('/sociallogin',[
//     check('socialId')
//         .isLength({
//             min: 3
//         })
//         .withMessage('Please provide social id'),
// ] ,globalController.socialLogin);

// authRoute.post('/forgetpassword', globalController.forgetPassword);

// authRoute.post('/resetpassword',globalController.resetPassword);

authRoute.get('/signout', globalController.signout)

module.exports = authRoute
