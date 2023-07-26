const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    socialId: { type: String },
    role: { type: Number, required: [true, "Please add User - Type"] },
    fullname: { type: String, trim: true, },
    salonName: { type: String, trim: true, },
    salonOwnerName: { type: String, trim: true, },
    accessoryInfo : { type: Object },
    salonLogo: { type: String, trim: true },
    addressProof: { type: String, trim: true },
    salonType: { type: String },
    countryCode: { type: String, trim: true },
    phone: { type: String },
    email: { type: String, unique: [true, "Email already registered."], trim: true, },
    dob: { type: String },
    account_status: { type: Number },
    gender: { type: Number },
    mpin: { type: String, required: [false, "Please add password"] },
    v_password: { type: String, trim:true },
    address: { type: String, trim: true, },
    pobox: { type: String, trim: true, },
    state: { type: String, trim: true, },
    country: { type: String, trim: true, },
    zipcode: { type: String, trim: true, },
    location: { type: String, trim: true, },
    pic: { type: String, trim: true },
    fcmToken: { type: String, trim: true },
    salonName: { type: String, trim: true, },
    salonOwnerName: { type: String, trim: true, },
    accessoryInfo : { type: Object },
    salonLogo: { type: String, trim: true },
    addressProof: { type: String, trim: true },
    salonType: { type: String },
    lastActive:{type:Date, default: () => Date.now() }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User