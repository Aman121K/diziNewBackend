const User = require("../models/userModel");
const Barber = require("../models/barberModel");

const { OK, WRONG_ENTITY, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require("../utils/statusCode")
const type = require("../@types/enum");

const buc = require("../utils/Bucket");
const enc = require("../utils/Encryption");

const { default: mongoose } = require("mongoose");

class BarberController{

   async add(req,res){
    try {
        const salonId = req.user.id;
        const barber = new Barber({
        ...req.body,
        salon: salonId,
        });
        const savedBarber = await barber.save();
        // res.status(OK).json(savedBarber);
        return res.status(OK).json({
            status: OK,
            message: "Barber added Successfully.",
            data: savedBarber
        });
      } catch (err) {
        console.error("Error adding a barber:", err);
        res.status(500).json({ error: "Server error" });
      }
   }

   async get(req,res){
    try {
        const barbers = await Barber.find({ salon: req.user.id });
        return res.status(OK).json({
            status: OK,
            message: "Barber fetched Successfully.",
            data: barbers
        });
      } catch (err) {
        console.error("Error fetching barbers:", err);
        res.status(500).json({ error: "Server error" });
      }
   }

   async update(req,res){
    
   }

   async delete(req,res){
    
   }

}



module.exports = new BarberController();