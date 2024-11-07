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
    socket.emit('"me', socket.id)

    socket.on("callUser", data => {
        io.to(data.userToCall).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})
    })

    socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

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