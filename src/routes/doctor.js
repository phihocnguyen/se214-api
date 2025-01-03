const express = require('express')
const { addDoctor, findDoctor, getDoctors, updateDoctor, deleteDoctor, findDoctorById, findDoctorBySpecialty } = require('../controllers/doctor.controller')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.post('/', upload.single('file'), addDoctor)
router.post('/find', findDoctor)
router.get('/specialty/:specialty', findDoctorBySpecialty)
router.get('/', getDoctors)
router.get('/:id', findDoctorById)
router.patch('/', upload.single('file'), updateDoctor)
router.delete('/:id', deleteDoctor)
exports.doctorRoutes = router