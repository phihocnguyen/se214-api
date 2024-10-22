const express = require('express')
const { getWsByDoctor, getWsByDay, updateWs } = require('../controllers/workingSchedule.controller')


const router = express.Router()

router.get('/:id', getWsByDoctor)
router.get('/:id/:day', getWsByDay)
router.patch('/:id', updateWs)

exports.wsRoutes = router