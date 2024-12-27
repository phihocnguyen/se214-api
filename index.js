const express = require('express')
const jwt = require('jsonwebtoken')
const {api} = require('./src/routes')
const { errorHandler } = require('./src/middlewares/errorHandler')
const { authenticateToken } = require('./src/middlewares/token')
require('dotenv').config()
const cors = require('cors')
const { app, server } = require('./src/socket/socket')
app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))
app.use('/api', api)
app.use(errorHandler)
let refreshTokens = []

app.post('/token', (req, res, next) => {
    const refreshToken = req.body.token

    if (refreshToken === null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN, {expiresIn: '15s'})

        res.json({accessToken})
    })
})
server.listen(3000, (req, res) => {
    console.log('listening at port 3000')
})