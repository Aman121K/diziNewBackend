const User = require("../models/userModel");
const Barber = require("../models/barberModel");
const Banner = require("../models/bannerModel");
const Ads = require("../models/adsModel");
const Style = require("../models/styleModel");
const Article = require("../models/articleModel");
const Category = require("../models/categoryModel");

const { loggerUtil } = require("../utils/logger")

const { OK, WRONG_ENTITY, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require("../utils/statusCode")
const type = require("../@types/enum");

const buc = require("../utils/Bucket");
const enc = require("../utils/Encryption");

const { default: mongoose } = require("mongoose");

class AdminController{

   async styleCreate(req,res){
    try {
        const { title, description } = req.body;
        const coverImage = req.files.coverImage[0].filename; // Assuming the uploaded file is named "coverImage"
        const existingStyle = await Style.findOne({ title });
        if (existingStyle) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: "Style with the same title already exists" });
        }
        const newStyle = new Style({
          title,
          coverImage,
          description
        });
    
        const savedStyle = await newStyle.save();
        res.status(OK).json({
            status: OK,
            message: "Style successfully added.",
            data: savedStyle
        })
      } catch (error) {
        return res.status(BAD_REQUEST).json({ status: BAD_REQUEST,message: "Server error" });
      }
   }

   async categoryCreate(req,res){
    try {
        const { title, description, price } = req.body;
        const coverImage = req.files.coverImage[0].filename; // Assuming the uploaded file is named "coverImage"
        const existingCategory = await Category.findOne({ title });
        if (existingCategory) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: "Category with the same title already exists" });
        }
        const newCategory = new Category({
          title,
          coverImage,
          description,
          price,
        });
    
        const savedCategory = await newCategory.save();
        res.status(OK).json({
            status: OK,
            message: "category successfully added.",
            data: savedCategory
        })
      } catch (error) {
        return res.status(BAD_REQUEST).json({ status: BAD_REQUEST,message: "Server error" });
      }
   }

   async articleCreate(req,res){
    try {
        const { title, description } = req.body;
        const coverImage = req.files.coverImage[0].filename; // Assuming the uploaded file is named "coverImage"
        const existingArticle = await Article.findOne({ title });
        if (existingArticle) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: "Article with the same title already exists" });
        }
        const newArticle= new Article({
          title,
          coverImage,
          description
        });
    
        const savedArticle= await newArticle.save();
        res.status(OK).json({
            status: OK,
            message: "Article successfully added.",
            data: savedArticle
        })
      } catch (error) {
        return res.status(BAD_REQUEST).json({ status: BAD_REQUEST,message: "Server error" });
      }
   }

   async adCreate(req,res){
    try {
        const { title, description } = req.body;
        const coverImage = req.files.coverImage[0].filename; // Assuming the uploaded file is named "coverImage"

        const newAd = new Ads({
          title,
          coverImage,
          description,
        });
    
        const savedAd = await newAd.save();
        res.status(OK).json({
            status: OK,
            message: "Ads successfully added.",
            data: savedAd
        })
      } catch (error) {
        return res.status(BAD_REQUEST).json({ status: BAD_REQUEST,message: "Server error" });
      }
   }

}



module.exports = new AdminController();