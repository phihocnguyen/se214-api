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
                    doctorId: doctorId,
                    userId: userId,
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
                    userId: userId
                },
                include: {
                    workingShift: {
                        select: {
                            time: true,
                            date: true
                        }
                    },
                    user: true,
                    doctor: {
                        select: {
                            firstName: true,
                            lastName: true,
                            account: true
                        }
                    }
                }
            }
        )
        return result
    } catch (err){
        console.log(err)
        return new Error(err)
    }
}

exports.getAppointmentsByDoctor = async (doctorId, status, date) => {
    try {
        const result = await db.appointment.findMany(
            {
                where: {
                    doctorId: doctorId,
                    status: status,
                    workingShift: {
                        date
                    }
                }, 
                include: {
                    user: {
                        include: {
                            account: true
                        }
                    },
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
                    id: appointmentId
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

exports.getDetailAppointment = async (id) => {
    const result = await db.appointment.findUnique(
        {
            where: {
                id
            },
            include: {
                workingShift: {
                    select: {
                        time: true,
                        date: true
                    }
                },
                user: true,
                doctor: {
                    select: {
                        firstName: true,
                        lastName: true,
                        account: true
                    }
                }
            }
        }
    )
    return result
}