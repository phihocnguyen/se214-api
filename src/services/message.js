const { PrismaClient } = require("@prisma/client");
const { getReceiverSocketId, io } = require("../socket/socket");

const db = new PrismaClient()

exports.createMessage = async (data) => {
    const { file, content, date, conversationId, senderId, receiverId } = data
    try {
        const newMessage = await db.message.create(
            {
                data: {
                    file: '',
                    content,
                    date,
                    conversationId: conversationId,
                    senderId: parseInt(senderId)
                }
            }
        )
        const receiverIdSocketId = getReceiverSocketId(receiverId)
        console.log(receiverId)
        if (receiverIdSocketId){
            io.to(receiverIdSocketId).emit('newMessage', newMessage)
        }
        return newMessage
    } catch (err){
        console.log(err)
        return new Error(err)
    }
}