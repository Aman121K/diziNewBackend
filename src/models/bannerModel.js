const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    description: { type: String},
    link: { type: String },
    updated_at: { type: Date, default: Date.now },
}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema)

module.exports = Banner
