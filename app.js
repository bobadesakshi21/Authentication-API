const express = require('express')

const bodyParser = require('body-parser')
const app = express()

const cookieParser = require('cookie-parser')

// Import Database Connection
const sequelize = require('./util/database')

app.use(cookieParser())

app.use(bodyParser.json())
// app.use(express.json())

// Enabling CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATHCH')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})
// Import Routes
const authRoute = require('./routes/auth')

// Routes Middleware
app.use('/user', authRoute)

// Error Handling
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const data = error.data
  const message = error.message
  res.status(statusCode).json({
    message: message,
    data: data
  })
})

sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is up and running')
    })
  })
  .catch(err => console.log('ERR:', err))
