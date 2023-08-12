const mongoose = require("mongoose")

const accessoryInfoSchema = new mongoose.Schema({
    AC: { type: Boolean },
    Sofa: { type: Boolean },
    TV: { type: Boolean },
    Newspaper: { type: Boolean },
    wifi: { type: Boolean },
    magazine: { type: Boolean },
}, { _id: false });

// const salonServicesSchema = new mongoose.Schema({
//     dob: { type: String, trim: true },
//     gender: { type: String, trim: true },
//     occupation: { type: String, trim: true },
//     interest: { type: String, trim: true },
//     language: { type: String, trim: true },
// }, { _id: false });

const userSchema = new mongoose.Schema({
    socialId: { type: String },
    role: { type: Number, required: [true, "Please add User - Type"] },
    fullname: { type: String, trim: true, },
    salonName: { type: String, trim: true, },
    salonOwnerName: { type: String, trim: true, },
    accessoryInfo : accessoryInfoSchema,
    salonLogo: { type: String },
    addressProof: { type: String },
    salonType: { type: String },
    // salonServices: salonServicesSchema,
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
    pic: { type: String, trim: true },
    fcmToken: { type: String, trim: true },
    openTime: { type: String, trim: true },
    closeTime: { type: String, trim: true },
    lunchTime: { type: String, trim: true },
    images: [{ type: String, trim: true }], // Store multiple images in an array
    availableDays: [{ type: String, trim: true }], // Store available days in an array
    seats: { type: Number }, // You can adjust the type based on your needs
    barbers: { type: Number }, // You can adjust the type based on your needs
    location: { type: String, trim: true },
    lastActive:{type:Date, default: () => Date.now() }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User