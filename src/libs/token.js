const { PrismaClient } = require('@prisma/client')
const {v4 : uuidv4} = require('uuid')

exports.generateVerificationToken = async (email) => {
    const prisma = new PrismaClient()
    const token = uuidv4()
    const existingToken = await prisma.verifiedEmail.findFirst(
        {
            where: {
                email
            }
        }
    )
    if (existingToken) {
        await prisma.verifiedEmail.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await prisma.verifiedEmail.create(
        {
            data: {
                email,
                token
            }
        }
    )
    return verificationToken
}
