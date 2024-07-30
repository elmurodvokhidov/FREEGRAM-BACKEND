const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
    {
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' }],
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: [] }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);