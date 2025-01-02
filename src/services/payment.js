const { PrismaClient } = require("@prisma/client")
const {v2Cloudinary} = require("../utils/cloudinary")
const db = new PrismaClient()
exports.createPayment = async (data, file) => {
    let url = ''
    await v2Cloudinary.uploader.upload(file.path, (err, result) => {
        if (err) {
            return null
        }
        else {
            url = result.url
        }
    })
    const newPayment = await db.payment.create(
        {
            data: {
                ...data,
                image: url,
            }
        }
    )
    return newPayment
}

exports.getPayments = async () => {
    const list = await db.payment.findMany()
    return list
}

exports.updatePayment = async (id, status) => {
    const list = await db.payment.update(
        {
            where: {
                id 
            },
            data: {
                status
            }
        }
    )
}