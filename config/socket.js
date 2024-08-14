const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

// "foydalanuvchiId": "socketId"
const activeUsers = {};
const checkUserIsActive = receiver => activeUsers[receiver];

io.on("connection", (socket) => {
    console.log("A user is connected...");
    const authId = socket.handshake.query.authId;
    if (authId !== "undefined" && authId) activeUsers[authId] = socket.id;

    io.emit("getActiveUsers", Object.keys(activeUsers));

    socket.on("disconnect", () => {
        console.log("A user is disconnected...");
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