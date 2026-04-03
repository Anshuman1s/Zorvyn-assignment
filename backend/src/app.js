const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/records', require('./routes/recordRoutes'))
app.use('/api/dashboard', require('./routes/dashboardRoutes'))

const errorHandler = require('./utils/errorHandler')
app.use(errorHandler)

module.exports = app