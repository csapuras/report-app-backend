import express from 'express';
import middleware from './utils/middleware'
import reports from './controllers/reports';
import users from './controllers/users';
import login from './controllers/login';
const app = express()
app.use(express.json())

app.use(middleware.morganLogger)
app.use(middleware.tokenExtractor)

app.use('/api/reports', reports)
app.use('/api/users', users)
app.use('/login', login)

app.use(middleware.errorHandler)

export default app;