const jwt = require("jsonwebtoken");
const config = require('../config/config');
const DeviceDetector = require("device-detector-js");
const { UNAUTHORIZED, NOT_FOUND, FORBIDDEN } = require('../utils/statusCode');
const User = require('../models/userModel');


module.exports = (req,res,next)=>{

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
           
            return res.status(FORBIDDEN).send("Not allowed while already logged in");
        }
        else{

            next()
        }

}