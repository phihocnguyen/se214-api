const { PrismaClient } = require("@prisma/client")
const fs = require('fs')
const db = new PrismaClient()
exports.createAppointment = async (data, files) => {
    const { time, date, status, type, note, doctorId, userId} = data
    const newPaths = []
    for (const file of files){
        const { originalname, path } = file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        newPaths.push(newPath)
    }
    
    try {
        const newWorkingShift = await db.workingShifts.create(
            {
                data: {
                    time,
                    date,
                    type
                }
            }
        )
        const newAppointment = await db.appointment.create(
            {
                data: {
                    status,
                    note,
                    noteImage1: newPaths[0] || '',
                    noteImage2: newPaths[1] || '',
                    noteImage3: newPaths[2] || '',
                    doctorId: parseInt(doctorId),
                    userId: parseInt(userId),
                    workingShiftId: newWorkingShift.id
                }
            }
        )
        return newAppointment
    } catch (err){
        console.log(err)
        return new Error(err)
    }
}

exports.getAppointmentsByUser = async (userId) => {
    try {
        const result = await db.appointment.findMany(
            {
                where: {
                    userId: parseInt(userId)
                },
                include: {
                    workingShift: true,
                    doctor: true
                }
            }
        )
        return result
    } catch (err){
        console.log(err)
        return new Error(err)
    }
}

exports.getAppointmentsByDoctor = async (doctorId, status) => {
    try {
        const result = await db.appointment.findMany(
            {
                where: {
                    doctorId: parseInt(doctorId),
                    status: status
                }, 
                include: {
                    user: true,
                    workingShift: true
                }
            }
        )
        return result
    } catch (err){
        console.log(err)
        return new Error(err)
    }
}

exports.updateStatus = async (data) => {
    const { status, appointmentId } = data
    try {
        const result = await db.appointment.update(
            {
                where: {
                    id: parseInt(appointmentId)
                },
                data: {
                    status
                }
            }
        )
        return result
    } catch (err){
        console.log(err)
        return new Error(err)
    }
}