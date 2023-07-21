const jwt = require("jsonwebtoken");
const config = require('../config/config');
const DeviceDetector = require("device-detector-js");
const User = require('../models/userModel');
const types = require('../@types/enum')


module.exports = (socket,next)=>{

        const headers = socket.handshake.auth;

        try{
            if(headers.token){
       
                if(headers.token.startsWith('Bearer'))
                var token = headers.token.split(' ')[1];
                else
                var token = headers.token

                const decoded = jwt.verify(token, config.keys.jwt_secret)['tokenObj'];

                const dt = new DeviceDetector();
                const browserDetails = dt.parse(socket.handshake.headers['user-agent']);

                if(!decoded){
                    next(new Error("Authentication failed"));
                    return;
                }

                if(JSON.stringify(decoded.client ) !== JSON.stringify(browserDetails.client) ){
                    next(new Error("Authentication failed"));
                    return;
                }
                if(JSON.stringify(decoded.os ) !== JSON.stringify(browserDetails.os) ){
                    next(new Error("Authentication failed"));
                    return;
                }
                if(JSON.stringify(decoded.device ) !== JSON.stringify(browserDetails.device) ){
                    next(new Error("Authentication failed"));
                    return;
                }

                User.findOne({ _id:decoded.id }).exec((err, user) => {
                    if (err || !user) {
                        next(new Error("No user found"));
                        return;
                    }

                    if(user.role != types.userType.user ){
                        next(new Error("Not an user"));
                        return;
                    }

                    socket.user = user
                    next();
                   
                })

           
        }
        else{
            next(new Error("Authentication failed"));
            return;
        }

        }
        catch(e){
            next(new Error("Authentication failed"));
            return;
        }

}