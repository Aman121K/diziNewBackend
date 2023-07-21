const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
    post_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    platform: { type: String, enum: ["Android", "iOS"],required: true },
    device: { type: String},
    deviceId: { type: String,required: true},
    appVersion: { type: String }, 
    country: { type: String }, 
    likes: { type: Array, default: []},
    totalLikes: { type: Number, default: 0},  
    totalComment: { type: Number, default: 0},  
    isLiked: { type: Boolean,default: false},
    updated_at: { type: Date, default: Date.now },
});

const Device = mongoose.model("Device", DeviceSchema, "Device");

module.exports = { Device };
