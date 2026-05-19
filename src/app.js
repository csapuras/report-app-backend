const express = require('express')
const app = express()

app.use(express.json())

const middleware = require('./utils/middleware')
app.use(middleware.morganLogger)
app.use(middleware.tokenExtractor)

const reports = require('./controllers/reports')
const users = require('./controllers/users')
const login = require('./controllers/login')

app.use('/api/reports', reports)
app.use('/api/users', users)
app.use('/login', login)

app.use(middleware.errorHandler)

module.exports = app