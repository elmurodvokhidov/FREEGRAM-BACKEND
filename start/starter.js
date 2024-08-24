const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { app } = require('../config/socket');

module.exports = function () {
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({ origin: process.env.CLIENT, credentials: true }));
    app.get("/", (req, res) => res.send("hello world!"));
    app.use("/api/auth", require('../routes/authRoutes'));
    app.use("/api/messages", require('../routes/messageRoutes'));
    app.use("/api/users", require('../routes/userRoutes'));
}