const express = require('express')
const { register, login, newVerification, updateAvatar, loginFailed, loginSuccess, googleLogin } = require('../controllers/auth.controller')
const multer = require('multer')
const passport = require('passport')
const upload = multer({dest: 'upload/'})
const router = express.Router()

const CLIENT_URL = "http://localhost:5173";

router.post('/register', register)
router.post('/login', login)
router.get('/new-verification', newVerification)
router.post('/update', upload.single('file'), updateAvatar)
router.get('/google', passport.authenticate("google"));
router.get("/google/callback", 
  passport.authenticate("google", 
    { successRedirect: CLIENT_URL, 
      failureRedirect: "/login/failed" 
  })
);
router.get("/login/failed", loginFailed);
router.get("/login/google", googleLogin);
exports.authRoutes = router