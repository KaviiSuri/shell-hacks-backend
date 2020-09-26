const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./connect')

require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 5000

const routes = require('./routes')

// for parsing body
app.use(express.json())
app.use(compression())
app.use(cors())
app.use(morgan('common'))

// router setup
app.use('/', routes)

// Database Connection and server listen...
connectDB()

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))