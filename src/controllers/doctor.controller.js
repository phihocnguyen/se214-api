const searchAPI = require("../libs/searchAPI")
const doctorService = require("../services/doctor")

exports.addDoctor = async (req, res, next) => {
    try {
        const newDoctor = await doctorService.addDoctor(req.body, req.file)
        res.status(201).json(newDoctor)
    } catch (err) {
        next(err)
    }
}
exports.findDoctor = async (req, res, next) => {
    try {
        const specialization = await searchAPI(req.body.symptom)
        res.status(200).json(specialization)
    } catch (err){
        next(err)
    }
}
exports.getDoctors = async (req, res, next) => {
    try {
        const result = await doctorService.getDoctors()
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}
exports.updateDoctor = async (req, res, next) => {
    try {
        const response = await doctorService.updateDoctor(req.body, req.file)
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

exports.deleteDoctor = async (req, res, next) => {
    try {
        const result = await doctorService.deleteDoctor(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}