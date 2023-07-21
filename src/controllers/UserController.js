const User = require("../models/userModel");
const { OK, WRONG_ENTITY, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require("../utils/statusCode")
const type = require("../@types/enum");

const buc = require("../utils/Bucket");
const enc = require("../utils/Encryption");

const { default: mongoose } = require("mongoose");

class UserController{

   async getUser(req,res){
    
    var sender={
        search : null,
        prev : false,
        next : false,
        page : null,
        categories : []
    };

    if(!req.query.page || req.query.page < 1){
        req.query.page = '1';
    }

    req.query.page = parseInt(req.query.page);
    var sQuery=req.query.search;
    sender.search = sQuery;

    var option = {role:type.userType.user};

    if(sQuery && sQuery != "")
    option = { $or:[{fristname: new RegExp(`.*${sQuery}.*`,`i`)},{email: new RegExp(`.*${sQuery}.*`,`i`)},{lastname: new RegExp(`.*${sQuery}.*`,`i`)}], role:type.userType.user }


        var data = await User.find(option).skip((req.query.page-1)*15).limit(15 + 1)
        
            if(data === undefined || data === null) data=[];
    
                if(data.length === 16){
                    data.pop();
                    sender.next = true;
                }
                if(req.query.page !== 1)
                sender.prev = true;

                sender.categories = data;
                sender.page = req.query.page;

                res.status(OK).json(sender);
   }

}



module.exports = new UserController();