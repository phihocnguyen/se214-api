const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient()

exports.initWsByDoctor = async (id) => {
    try {
        for (let i = 0; i < 6; i++){
            await db.workSchedule.create(
                {
                    data: {
                        startTime: '00:00',
                        endTime: '00:00',
                        doctorId: parseInt(id),
                        day: 'Thứ ' + (i + 2),
                        status: 'Available'
                    }
                }
            )
        }
        return true
    } catch (err){
        return new Error(err)
    }
}

exports.getWsByDoctor = async (id) => {
    try {
        const result = await db.workSchedule.findMany(
            {
                where: {
                    doctorId: parseInt(id)
                }
            }
        )
        return result
    } catch (err){
        console.log(err)
        return new Error(err)
    }
}

exports.getWsByDay = async (day) => {
    try {
         const result = await db.workSchedule.findFirst(
            {
                where: {
                    day
                }
            }
         )
         return result
    } catch (err) {
        console.log(err)
        return new Error(err)
    }
}

exports.updateWs = async (doctorId, data) => {
    try {
        for (let i = 0; i < data.length; i++){
            const existSchedule = await db.workSchedule.findFirst(
                {
                    where: {
                        doctorId: parseInt(doctorId),
                        day: data[i].day
                    }
                }
            )
            await db.workSchedule.update(
                {
                    where: {
                        id: existSchedule.id
                    },
                    data: {
                        startTime: (data[i].from)?.toString() || existSchedule.startTime,
                        endTime: (data[i].to)?.toString() || existSchedule.endTime
                    }
                }
            )
        }
        return true
    } catch (err){
        console.log(err)
        return new Error(err)
    }
}