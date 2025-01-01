const { PrismaClient, Role } = require("@prisma/client")
const {v2Cloudinary} = require("../utils/cloudinary")
const db = new PrismaClient()
const bcrypt = require('bcrypt')
const { generateVerificationToken } = require("../libs/token")
const { initWsByDoctor } = require("./workingSchedule")
exports.addDoctor = async (data, file) => {
const salt = bcrypt.genSaltSync(10)
    let url = ''
    await v2Cloudinary.uploader.upload(file.path, (err, result) => {
        if (err) {
            return null
        }
        else {
            url = result.url
        }
    })
    const { email, password, firstName, lastName, phone, introduction, clinic, experience, specialization } = data
    try {
        const existUser = await db.account.findFirst(
            {
                where: {
                    email
                }
            }
        )
        if (existUser) return false
        const verificationToken = await generateVerificationToken(email)
        const newDoctor = await db.doctor.create(
            {
                data: {
                    firstName,
                    lastName,
                    phone,
                    introduction,
                    experience: parseInt(experience),
                    clinic,
                    specialization,
                    account: {
                        create: {
                            email,
                            password: bcrypt.hashSync(password, salt),
                            verifiedEmailId: verificationToken.id,
                            email_verified: new Date(),
                            image: url,
                            role: Role.DOCTOR
                        }
                    }
                }
            }
        )
        await initWsByDoctor(newDoctor.id)
        return {
            newDoctor: newDoctor,
            token: verificationToken.token
        }
    } catch(err){
        console.log(err)
        return new Error(err)
    }
}

exports.findDoctor = async (specialization) => {
    try {
        const result = await db.doctor.findMany(
            {
                where: {
                    specialization: {contains: specialization}
                },
                include: {
                    account: true
                }
            }   
        )
        return result
    } catch (err) {
        next(err)
    }
}
exports.getDoctors = async () => {
    try {
        const result = await db.doctor.findMany({
            include: {
                account: true
            }
        })
        return result
    } catch (err) {
        return new Error(err)
    }
}

exports.findDoctorById = async (id) => {
    try {
        const result = await db.doctor.findUnique(
            {
                where: {
                    id: id
                },
                include: {
                    account: true
                }
            }
        )
        return result
    } catch (err) {
        console.log(err)
        return new Error(err)
    }
}

exports.updateDoctor = async (data, file) => {
    let url = ''
    await v2Cloudinary.uploader.upload(file.path, (err, result) => {
        if (err) {
            return null
        }
        else {
            url = result.url
            data.image = url
        }
    })

    const { id } = data
    const {experience} = data
    delete data.id
    delete data.experience
    try {
        const response = await db.doctor.update(
            {
                where: {
                    id: id
                },
                data: {
                    ...data,
                    experience: parseInt(experience),
                }
            }
        )
        return response
    } catch (err){
        console.log(err)
        return new Error(err)
    }
}

exports.deleteDoctor = async (id) => {
    try {
        const result = await db.doctor.delete(
            {
                where: {
                    id: id
                }
            }
        )
        return result
    } catch (err){
        return new Error(err)
    }
}

exports.findDoctorBySpecialty = async (specialty) => {
    const result = await db.doctor.findMany(
        {
            where: {
                specialization: {
                    contains: specialty
                }
            },
            include: {
                    account: true
                }
        }
    )
    return result
}