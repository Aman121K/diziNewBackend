const jwt = require("jsonwebtoken");
const config = require('../config/config');
const DeviceDetector = require("device-detector-js");
const { UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../utils/statusCode');
const User = require('../models/userModel');
const types = require('../@types/enum')

module.exports = (req,res,next)=>{

        if(req.headers.authorization){
            try{

                if(req.headers.authorization.startsWith('Bearer'))
                var token = req.headers.authorization.split(' ')[1];
                else
                var token = req.headers.authorization

                const decoded = jwt.verify(token, config.keys.jwt_secret)['tokenObj'];

                const dt = new DeviceDetector();
                const browserDetails = dt.parse(req.headers['user-agent']);

                if(JSON.stringify(decoded.client ) !== JSON.stringify(browserDetails.client) ){
                    res.status(UNAUTHORIZED).send("Unaothorized Access");
                    return;
                }
                if(JSON.stringify(decoded.os ) !== JSON.stringify(browserDetails.os) ){
                    res.status(UNAUTHORIZED).send("Unaothorized Access");
                    return;
                }
                if(JSON.stringify(decoded.device ) !== JSON.stringify(browserDetails.device) ){
                    res.status(UNAUTHORIZED).send("Unaothorized Access");
                    return;
                }

                User.findOne({ _id:decoded.id }).exec((err, user) => {
                    if (err || !user) {
                        return res.status(NOT_FOUND).json({
                            error: 'No user was found in DB!'
                        })
                    }

                    req.user = user
                    next();
                   
                })

            }catch(error){

                return res.status(INTERNAL_SERVER_ERROR).send("Some Error occured while de-tokenization");
            }
        }
        else{
            return res.status(UNAUTHORIZED).send("Unaothorized Access");
        }

}