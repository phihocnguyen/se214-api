const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient()

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