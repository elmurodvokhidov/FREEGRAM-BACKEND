const express = require('express');
const cookieParser = require('cookie-parser');

module.exports = function (app) {
    app.use(express.json());
    app.use(cookieParser());
    app.get("/", (req, res) => res.send("hello world!"));
    app.use("/api/auth", require('../routes/authRoutes'));
    app.use("/api/messages", require('../routes/messageRoutes'));
}