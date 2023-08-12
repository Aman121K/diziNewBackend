const mongoose = require("mongoose")

const styleSchema = new mongoose.Schema({
    title: { type: String, trim: true, },
    coverImage: { type: String, trim: true },
    description: { type: String },
}, { timestamps: true })

const Style = mongoose.model('Style', styleSchema)

module.exports = Style