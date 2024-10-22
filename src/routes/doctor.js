const express = require('express')
const { addDoctor, findDoctor, getDoctors, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller')
const multer = require('multer')
const upload = multer({dest: 'upload/'})
const router = express.Router()

router.post('/', upload.single('file'), addDoctor)
router.post('/find', findDoctor)
router.get('/', getDoctors)
router.patch('/', upload.single('file'), updateDoctor)
router.delete('/:id', deleteDoctor)
exports.doctorRoutes = router