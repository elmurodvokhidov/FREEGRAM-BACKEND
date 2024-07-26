const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true },
        phoneNumber: { type: Number, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String, default: '' },
        verified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Auth', authSchema);