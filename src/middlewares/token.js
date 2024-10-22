const { Role } = require('@prisma/client')
const jwt = require('jsonwebtoken')
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            console.log(user)
            if (err) return res.sendStatus(403)
            req.user = user 
            next()
    })
}

exports.verifyAdmin = (req, res, next) => {
    this.authenticateToken(req, res, () => {
        if (req.user.role === Role.ADMIN) next()
        else res.status(403).json('Unauthorized')
    })
}