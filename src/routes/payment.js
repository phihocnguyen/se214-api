const express = require('express')
const { upload } = require('../middlewares/multer')
const { createPayment, getPayments, updatePayment } = require('../controllers/payment')


const router = express.Router()

router.post('/', upload.single('file'), createPayment)
router.get('/', getPayments)
router.patch('/:id', updatePayment)
exports.paymentRoutes = router