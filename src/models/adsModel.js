const mongoose = require("mongoose")

const adSchema = new mongoose.Schema({
    title: { type: String, trim: true, },
    coverImage: { type: String, trim: true },
    description: { type: String },
}, { timestamps: true })

const Ads = mongoose.model('Ads', adSchema)

module.exports = Ads