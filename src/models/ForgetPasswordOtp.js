const mongoose = require("mongoose")

const FPotpModel = new mongoose.Schema({
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
    expiresAt: { type: Date, default: Date.now, expires: 600 }
});

const FPotp = mongoose.model('forgetPasswordOtps', FPotpModel);

module.exports = FPotp