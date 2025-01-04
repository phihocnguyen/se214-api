const paymentService = require('../services/payment')
exports.createPayment = async (req, res, next) => {
    try {
        const newPayment = await paymentService.createPayment(req.body, req.file)
        res.status(201).json(newPayment)
    } catch (err) {
        next(err)
    }
}

exports.getPayments = async (req, res, next) => {
    try {
        const list = await paymentService.getPayments()
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}
exports.updatePayment = async (req, res, next) => {
    try {
        const result = await paymentService.updatePayment(req.params.id, req.body.status)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}

exports.getPaymentByUser = async (req, res, next) => {
    try {
        const result = await paymentService.getPaymentByUser(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}