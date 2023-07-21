const mongoose = require("mongoose")

const salonSchema = new mongoose.Schema({
    salonName: { type: String, trim: true, },
    salonOwnerName: { type: String, trim: true, },
    countryCode: { type: String, trim: true },
    phone: { type: String },
    email: { type: String, unique: [true, "Email already registered."], trim: true, },
    city: { type: String, trim: true, },
    state: { type: String, trim: true, },
    country: { type: String, trim: true, },
    zipcode: { type: String, trim: true, },
    accessoryInfo : { type: Object },
    salonLogo: { type: String, trim: true },
    addressProof: { type: String, trim: true },
    salonType: { type: String },
    account_status: { type: Number },
    mpin: { type: String, required: [false, "Please add mpin"] },
    address: { type: String, trim: true, },
    fcmToken: { type: String, trim: true },
    lastActive:{type:Date, default: () => Date.now() }
}, { timestamps: true })

const Salon = mongoose.model('Salon', salonSchema)

module.exports = Salon