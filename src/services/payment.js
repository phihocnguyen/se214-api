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
                amount: parseInt(data.amount),
                image: url,
            }
        }
    )
    return newPayment
}

exports.getPayments = async () => {
    const list = await db.payment.findMany(
        {
            include: {
                user: true
            }
        }
    )
    return list
}

exports.updatePayment = async (id, status) => {
    const result = await db.payment.update(
        {
            where: {
                id 
            },
            data: {
                status
            }
        }
    )
    if (status === 'Thành công') {
        const payment = await db.payment.findUnique(
            {
                where: {
                    id
                },
                include: {
                    user: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        )
        await db.user.update(
            {
                where: {
                    id: payment.user.id
                },
                data: {
                    totalPrice: parseInt(payment.amount) / 1000
                }
            }
        )
    }
    return result
}