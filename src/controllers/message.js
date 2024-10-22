const messageService = require("../services/message")

exports.createMessage = async (req, res, next) => {
    try {
        const newMessage = await messageService.createMessage(req.body)
        res.status(201).json(newMessage)
    } catch (err){
        return new Error(err)
    }
}