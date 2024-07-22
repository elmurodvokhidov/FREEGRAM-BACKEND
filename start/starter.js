const express = require('express');
const authRoutes = require('../routes/authRoutes');

module.exports = function (app) {
    app.use(express.json());
    app.get("/", (req, res) => res.send("hello world!"));
    app.use("/api/auth", authRoutes);
}