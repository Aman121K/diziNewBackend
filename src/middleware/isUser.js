const jwt = require("jsonwebtoken");
const config = require('../config/config');
const DeviceDetector = require("device-detector-js");
const { UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR, FORBIDDEN } = require('../utils/statusCode');
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

                if(!decoded){
                    res.status(UNAUTHORIZED).send("Unaothorized Access");
                    return;
                }

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
                            error: 'No user was found in DB!',
                            status: 0
                        })
                    }

                    if(user.role != types.userType.user && user.role != types.userType.salon){
                        return res.status(FORBIDDEN).json({
                            error: 'Not an user!',
                            status: 0
                        })
                    }

                    if(user.account_status == types.userStatus.blocked ){
                        return res.status(FORBIDDEN).json({
                            error: 'Your account has been blocked for violating our terms and conditions!',
                            status:1
                        })
                    }


                    if(user.account_status == types.userStatus.deleted ){
                        return res.status(FORBIDDEN).json({
                            error: `This Account has been deleted by its owner.
                             This account can be re-activated again but, however, you cannot get your history back`,
                            status:2
                        })
                    }

                    req.user = user
                    next();
                   
                })

            }catch(error){

                return res.status(INTERNAL_SERVER_ERROR).send("Something went wrong");
            }
        }
        else{
            return res.status(UNAUTHORIZED).send("Unaothorized Access");
        }

}