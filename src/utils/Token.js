const jwt = require("jsonwebtoken");
const config = require("../config/config");
const DeviceDetector = require("device-detector-js");


class Token{

    getBrowserUsableToken(req,id){

         //fetching browser details
         const dt = new DeviceDetector();
         const browserDetails = dt.parse(req.headers['user-agent']);
 
         var tokenObj = {
             ...browserDetails,
             id : id
         }

        return jwt.sign({ tokenObj }, config.keys.jwt_secret,{ expiresIn : '30d'} );
    }
}

module.exports = new Token();
