const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    title: { type: String, trim: true, },
    coverImage: { type: String, trim: true },
    description: { type: String },
    price: { type: Number,required: false},
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category