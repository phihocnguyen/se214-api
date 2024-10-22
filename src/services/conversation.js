const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient()
exports.createConversation = async (data) => {
    const {userId1, userId2} = data 
    try {
        const existConversation = await db.conversation.findFirst(
            {
                where: {
                    doctorId: parseInt(userId1),
                    userId: parseInt(userId2)
                }
            }
        )
        if (existConversation) return existConversation
        const newConversation = await db.conversation.create(
            {
                data: {
                    lastMessage: ' ',
                    seen: false,
                    doctorId: userId1, 
                    userId: parseInt(userId2)
                }
            }
        )
        return newConversation
    } catch (err) {
        console.log(err)
        return new Error(err)
    }
}

exports.getConversationsByUser = async (userId) => {
    try {
        const result = await db.conversation.findMany(
            {
                where: {
                    OR: [
                        {doctorId: parseInt(userId)},
                        {userId: parseInt(userId)}
                    ]
                },
                include: {
                    user: true,
                    doctor: true
                }
            }
        )
        return result
    } catch (err) {
        return new Error(err)
    }
}

exports.getConversation = async (data) => {
    const {userId1, userId2} = data
    try {
        const result = await db.conversation.findFirst(
            {
                where: {
                    doctorId: parseInt(userId1) || parseInt(userId2),
                    uesrId: parseInt(userId1) || parseInt(userId2)
                }
            }
        )
        return result
    } catch (err){
        return new Error(err)
    }
}

exports.getDetailConversation = async (conversationId) => {
    try {
        const result = await db.conversation.findUnique(
            {
                where: {
                    id: conversationId
                },
                include: {
                    messages: true,
                    user: true,
                    doctor: true
                }
            }
        )
        return result
    } catch (err) {
        return new Error(err)
    }
}