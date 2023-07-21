const mongoose = require("mongoose")

const OtpModel = new mongoose.Schema({
    uid:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    created: {
        type: Date,
        default: () => Date.now()
    },
    expiresAt: { type: Date, default: Date.now, expires: 180 }
});

const Otp = mongoose.model('Otps', OtpModel);

module.exports = Otp