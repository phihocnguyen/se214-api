const express = require('express')
const { createConversation, getConversation, getConversationsByUser, getDetailConversation } = require('../controllers/conversation')


const router = express.Router()

router.post('/', createConversation)
router.post('/getconversations', getConversation)
router.get('/:userId', getConversationsByUser)
router.post('/getconversation/:conversationId', getDetailConversation)
exports.conversationRoutes = router