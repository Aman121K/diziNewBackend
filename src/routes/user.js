const express = require('express')
const globalController = require('../controllers/GlobalController');

const isUser = require('../middleware/isUser');

const userRoute = express.Router();

userRoute.route('/')
.get( isUser, globalController.getUserDetails )
.put( isUser , globalController.updateUserDetails )
.delete( isUser, globalController.deleteUser)

// userRoute.route('/password')
// .put( isUser, globalController.updatePassword )

userRoute.route('/profilepic')
.put( isUser, globalController.updateProfilePic )

userRoute.route('/setMpin')
.put( isUser, globalController.setMpin )

module.exports = userRoute;