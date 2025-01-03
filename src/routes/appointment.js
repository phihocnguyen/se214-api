const express = require('express')
const { createAppointment, getAppointmentsByUser, getAppointmentsByDoctor, updateStatus, getDetailAppointment, getAppointmentsByWeek } = require('../controllers/appointment.controller')
const multer = require('multer')
const upload = multer({dest: 'upload/'})

const router = express.Router()
router.post('/', upload.array('files', 12), createAppointment)
router.get('/:id', getAppointmentsByUser)
router.post('/getappointments', getAppointmentsByDoctor)
router.patch('/update', updateStatus)
router.get('/detail/:id', getDetailAppointment)
router.get('/get/by-week', getAppointmentsByWeek)
exports.appointmentRoutes = router