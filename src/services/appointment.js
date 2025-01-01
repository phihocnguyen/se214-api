const { PrismaClient } = require("@prisma/client")
const db = new PrismaClient()
const {v2Cloudinary} = require("../utils/cloudinary")
exports.createAppointment = async (data, files) => {
    const { time, date, status, type, note, doctorId, userId} = data
    const [day, month, year] = date.split('/');
    const newDate = `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;
    const newPaths = []
    for (const file of files){
        await v2Cloudinary.uploader.upload(file.path, (err, result) => {
            if (err) {
                return null
            }
            else {
                newPaths.push(result.url)
            }
        })
    }
    
    try {
        const newWorkingShift = await db.workingShifts.create(
            {
                data: {
                    time,
                    date: newDate,
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
                    user: {
                        select: {
                            account: true
                        }  
                    },
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

exports.getAppointmentsByWeek = async (startDate, endDate) => {
    const [day1, month1, year1] = startDate.split('/');
    const [day2, month2, year2] = endDate.split('/');
    const formattedDate1 = `${year1}/${month1.padStart(2, '0')}/${day1.padStart(2, '0')}`;
    const formattedDate2 = `${year2}/${month2.padStart(2, '0')}/${day2.padStart(2, '0')}`;

    const result = await db.appointment.findMany(
        {
            where: {
                workingShift: {
                    date: {
                        gte: formattedDate1,
                        lte: formattedDate2
                    }
                }
            },
            include: {
                    workingShift: {
                        select: {
                            time: true,
                            date: true
                        }
                    },
                    user: {
                        select: {
                            account: true
                        }  
                    }
                }
        }
    )
    return result
}