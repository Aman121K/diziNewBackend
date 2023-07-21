const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    post_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: { type: String },
    description: { type: String},
    type: { type: Number, enum: [0, 1,2],required: true},
    link: { type: String }, 
    thumbnail: { type: String }, 
    likes: { type: Array, default: []},
    totalLikes: { type: Number, default: 0},  
    totalComment: { type: Number, default: 0},  
    isLiked: { type: Boolean,default: false},
    updated_at: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema, "Post");

module.exports = { Post };
