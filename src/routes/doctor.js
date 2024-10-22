const express = require('express')
const { addDoctor, findDoctor, getDoctors } = require('../controllers/doctor.controller')
const multer = require('multer')
const upload = multer({dest: 'upload/'})
const router = express.Router()

router.post('/', upload.single('file'), addDoctor)
router.post('/find', findDoctor)
router.get('/', getDoctors)
exports.doctorRoutes = router