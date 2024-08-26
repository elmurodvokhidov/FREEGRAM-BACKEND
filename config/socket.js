const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT,
        // methods: ["GET", "POST"],
        credentials: true
    }
});

// "foydalanuvchiId": "socketId"
const activeUsers = {};
const checkUserIsActive = receiver => activeUsers[receiver];

io.on("connection", (socket) => {
    const authId = socket.handshake.query.authId;
    if (authId !== "undefined" && authId) activeUsers[authId] = socket.id;

    io.emit("getActiveUsers", Object.keys(activeUsers));

    socket.on("disconnect", () => {
        delete activeUsers[authId];
        io.emit("getActiveUsers", Object.keys(activeUsers));
    });
});

module.exports = {
    app,
    io,
    server,
    checkUserIsActive,
}