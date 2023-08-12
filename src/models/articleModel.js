const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    title: { type: String, trim: true, },
    coverImage: { type: String, trim: true },
    description: { type: String },
}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article