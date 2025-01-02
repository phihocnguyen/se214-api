const {Server} = require('socket.io')
const http = require('http')
const express = require('express')

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ['GET', 'POST']
    }
})

const userSocketMap = {}
const getReceiverSocketId = receiverId => {
    return userSocketMap[receiverId]
}
io.on('connection', socket => {
    console.log("a user connected", socket.id)
    const userId = socket.handshake.query.userId
    if (userId != 'undefined') userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.emit('me', socket.id)

    socket.on("joinRoom", ({ roomId }) => {
        socket.join(roomId);
        socket.to(roomId).emit("userJoined", { signal: null });
    });

    socket.on("returnSignal", ({ roomId, signal }) => {
        socket.to(roomId).emit("receiveSignal", { signal });
    });

    socket.on("sendMessage", ({ roomId, message }) => {
        console.log(`Message in room ${roomId}:`, message);

        // Gửi tin nhắn đến những người trong phòng
        socket.to(roomId).emit("chatMessage", message);
    });


    socket.on('disconnect', () => {
        console.log("a user disconnected", socket.id)
        delete userSocketMap[userId]
        socket.broadcast.emit("callEnded")
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

module.exports =  {
    app, io, server, getReceiverSocketId
}