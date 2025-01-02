const express = require('express')

const { createPayment, getPayments, updatePayment } = require('../controllers/payment')


const router = express.Router()

router.post('/', createPayment)
router.get('/', getPayments)
router.patch('/:id', updatePayment)
exports.paymentRoutes = router