const e = require("express")
const appointmentService = require("../services/appointment")

exports.createAppointment = async (req, res, next) => {
    try {
        const newAppointment = await appointmentService.createAppointment(req.body, req.files)
        res.status(201).json(newAppointment)
    } catch (err) {
        console.log(err)
        next(err)
    }
}
exports.getAppointmentsByUser = async (req, res, next) => {
    try {
         const result = await appointmentService.getAppointmentsByUser(req.params.id)
         res.status(200).json(result)
    } catch (err){
        next(err)
    }
}
exports.getAppointmentsByDoctor = async (req, res, next) => {
    try {
        const result = await appointmentService.getAppointmentsByDoctor(req.body.doctorId, req.body.status, req.body.date)
        res.status(200).json(result)
    } catch (err){
        next(err)
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const result = await appointmentService.updateStatus(req.body)
        res.status(200).json(result)
    } catch (err){
        next(err)
    }
}