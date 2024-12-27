const express = require('express')
const { addDoctor, findDoctor, getDoctors, updateDoctor, deleteDoctor, findDoctorById } = require('../controllers/doctor.controller')
const { default: upload } = require('../middlewares/multer')
const router = express.Router()

router.post('/', upload.single('file'), addDoctor)
router.post('/find', findDoctor)
router.get('/', getDoctors)
router.get('/:id', findDoctorById)
router.patch('/', upload.single('file'), updateDoctor)
router.delete('/:id', deleteDoctor)
exports.doctorRoutes = router