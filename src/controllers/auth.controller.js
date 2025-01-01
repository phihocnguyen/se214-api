const { PrismaClient, Role } = require('@prisma/client')
const bcrypt = require('bcrypt')
const { generateVerificationToken } = require('../libs/token')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { sendEmail } = require('../libs/sendEmail')
const refreshTokens = []

exports.login = async (req, res, next) => {
    const {email, password} = req.body 
    try {
        const existingUser = await prisma.account.findFirst({
            where: {
                email
            },
            include: {
                user: true,
                doctor: true
            }
        })
        let correctPassword = false
        if (existingUser) {
            if(!existingUser.email_verified) {
                const verificationToken = await generateVerificationToken(existingUser.email)
                sendEmail(existingUser.email, verificationToken.token)
                return res.status(200).json({message: 'Confirmation email sent', token: verificationToken.token})
            }
            correctPassword = bcrypt.compareSync(password, existingUser.password)
        }
        if (existingUser && correctPassword) {
            const accessToken = jwt.sign({id: existingUser.id, email: existingUser.email, role: existingUser.role}, process.env.ACCESS_TOKEN, {expiresIn: '15m'})
            const refreshToken = jwt.sign({id: existingUser.id, email: existingUser.email, role: existingUser.role}, process.env.REFRESH_TOKEN)
            refreshTokens.push(refreshToken)
            res.cookie('token', refreshToken).json({
                account: existingUser,
                accessToken: accessToken
            })
        }
        else res.status(401).json('Unauthorized')
    } catch (err){
        console.log(err)
    }
}

exports.register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)
    const { email, password, firstName, lastName, phoneNumber, image = 'https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg', address, totalPrice = 0 } = req.body
    try {
        const existUser = await prisma.account.findFirst(
            {
                where: {
                    email
                }
            }
        )
        if (existUser) return res.status(303).json('user exists')
        const verificationToken = await generateVerificationToken(email)

        const newUser = await prisma.user.create(
            {
                data: {
                    firstName,
                    lastName,
                    phone: phoneNumber,
                    address,
                    totalPrice,
                    account: {
                        create: {
                            email,
                            password: bcrypt.hashSync(password, salt),
                            verifiedEmailId: verificationToken.id,
                            role: Role.USER,
                            image
                        }
                    }
                }
            }
        )
        return res.status(201).json({
            newUser: newUser,
            token: verificationToken.token
        })
    } catch(err){
        console.log(err)
    }
}

exports.newVerification = async (req, res, next) => {
    const { token } = req.query 
    const existingToken = await prisma.verifiedEmail.findFirst({
        where: {
            token
        }
    })
    if (!existingToken) return res.status(404).json({message: 'Token does not exists!'})
    const existingUser = await prisma.account.findFirst({
        where: {
            email: existingToken.email
        }
    })
    if (!existingUser) return res.status(404).json({message: 'User does not exists!'})

    await prisma.account.update({
        where: {
            id: existingUser?.id
        },
        data: {
            email_verified: new Date(),
            email: existingToken?.email
        }
    })

    return res.status(200).json({message: 'Email verified!'})
}

exports.updateAvatar = async (req, res, next) => {
    const {userId} = req.body
    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    try {
        const result = await prisma.account.update(
            {
                where: {
                    id: parseInt(userId)
                },
                data: {
                    image: newPath
                }
            }
        )
        console.log(result)
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        next(err)
    }
}