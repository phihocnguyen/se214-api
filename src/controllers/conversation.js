const conversationService = require("../services/conversation")

exports.createConversation = async (req, res, next) => {
    try {
        const newConversation = await conversationService.createConversation(req.body)
        res.status(201).json(newConversation)
    } catch (err){
        next(err)
    }
}

exports.getConversationsByUser = async (req, res, next) => {
    try {
        const result = await conversationService.getConversationsByUser(req.params.userId)
        res.status(200).json(result)
    } catch (err){
        next(err)
    }
}

exports.getConversation = async (req, res, next) => {
    try {
        const result = await conversationService.getConversation(req.body)
        res.status(200).json(result)
    } catch (err){
        next(err)
    }
}
exports.getDetailConversation = async (req, res, next) => {
    try {
        const result = await conversationService.getDetailConversation(req.params.conversationId)
        res.status(200).json(result)
    } catch (err){
        next(err)
    }
}