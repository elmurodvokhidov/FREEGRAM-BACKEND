const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phoneNumber: Number,
    code: String,
    expiresIn: Date,
});

module.exports = mongoose.model("OTP", otpSchema);