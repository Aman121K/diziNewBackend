const mongoose = require("mongoose")

const barberSchema = new mongoose.Schema({
    salon : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    barberName: { type: String, trim: true, },
    countryCode: { type: String, trim: true },
    phone: { type: String },
    address: { type: String, trim: true, },
    city: { type: String, trim: true, },
    state: { type: String, trim: true, },
    zipcode: { type: String, trim: true, },
    country: { type: String, trim: true, },
    addressProof: { type: String, trim: true },
    fcmToken: { type: String, trim: true },
    lastActive:{type:Date, default: () => Date.now() }
}, { timestamps: true })

const Barber = mongoose.model('Barber', barberSchema)

module.exports = Barber