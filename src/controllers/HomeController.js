const User = require("../models/userModel");
const Barber = require("../models/barberModel");
const Banner = require("../models/bannerModel");
const { loggerUtil } = require("../utils/logger")

const { OK, WRONG_ENTITY, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require("../utils/statusCode")
const type = require("../@types/enum");

const buc = require("../utils/Bucket");
const enc = require("../utils/Encryption");

const { default: mongoose } = require("mongoose");

class HomeController{

   async homeSalon(req,res){
    try {
        const styles = [
            { title: "Style 1", image: "style1.jpg" },
            { title: "Style 2", image: "style2.jpg" },
      ];

      const banners = await Banner.find();
      const barberCount = await Barber.countDocuments();
      const customerCount = 13
        //   await Customer.countDocuments();
      const salesCount = 0
        //   await Sales.countDocuments();
      const feedbackCount = 0; // You should fetch this from your model (e.g., FeedbackModel)
  
      // Dummy data for last customer coming
      const lastCustomer = {
        name: "John Doe",
        lastVisit: new Date().toISOString(),
      };
  
      // Dummy data for today's order count
      const todayOrdersCount = 10;

      let salondata = {
        banners,
        salonDetail: {
            barberCount,
            customerCount,
            salesCount,
            feedbackCount,
        },
        todayOrdersCount,
        lastCustomer,
        styles
    }
      
      res.status(OK).json({
        status: OK,
        message: "Successfully Fetched HomeListing.",
        data: salondata
        })
    }
    catch (err) {
        loggerUtil(err)
    }
    finally {
        loggerUtil("OTP API Called")
    }
   }

   async homeUser(req,res){
    
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



module.exports = new HomeController();