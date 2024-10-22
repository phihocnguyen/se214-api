const express = require('express')
const { createMessage } = require('../controllers/message')

const router = express.Router()

router.post('/', createMessage)

exports.messageRoutes = router