const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth' },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth' },
        message: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);