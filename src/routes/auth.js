const express = require('express')
const { register, login, newVerification, updateAvatar } = require('../controllers/auth.controller')
const multer = require('multer')
const upload = multer({dest: 'upload/'})
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/new-verification', newVerification)
router.post('/update', upload.single('file'), updateAvatar)
exports.authRoutes = router