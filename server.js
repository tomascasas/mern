const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const cors = require('cors')

const connectDB = require('./config/db')
const {logErrors, clientErrorHandler, errorHandler} = require('./error-handling')
const apiRoutes = require('./routes/api')
const appRoutes = require('./routes/app')

const app = express()
connectDB()

const PORT = process.env.PORT || 4000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// app.use(logger('dev'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/api', apiRoutes)
app.use('/', appRoutes)
app.use(express.static(path.join(__dirname, 'client/build')))
// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)))
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Express running on port ${PORT}`)
})
