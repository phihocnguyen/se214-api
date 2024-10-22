const express = require('express')
const { authRoutes } = require('./auth')
const { authenticateToken } = require('../middlewares/token')
const { doctorRoutes } = require('./doctor')
const { blogRoutes } = require('./blog')
const { wsRoutes } = require('./workingSchedule')
const { appointmentRoutes } = require('./appointment')
const { conversationRoutes } = require('./conversation')
const { messageRoutes } = require('./message')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json('Ready to use')
} )

router.use('/auth', authRoutes)
router.use('/doctor',doctorRoutes)
router.use('/blog', blogRoutes)
router.use('/working-schedule', wsRoutes )
router.use('/appointment', appointmentRoutes)
router.use('/conversation', conversationRoutes)
router.use('/message', messageRoutes)
exports.api = router