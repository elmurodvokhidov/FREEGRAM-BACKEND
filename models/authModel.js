const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        phoneNumber: { type: Number, required: true },
        password: { type: String, required: true },
        avatar: { type: String, default: '' },
        verified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Auth', authSchema);