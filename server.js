//command center
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')

const characterRoutes = require('./routes/character-routes')
const accessoryRoutes = require('./routes/accessory-routes')
const requestLogger = require('./lib/request-logger')
const characterSeed = require('./lib/character-seed')
const userRoutes = require('./routes/user-routes')
const PORT = 8005
//deprecation warning
mongoose.set('strictQuery', true)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors({origin: `http://127.0.0.1:5501`}))
app.use(requestLogger)
app.use(express.json())
app.use(characterRoutes)
app.use(accessoryRoutes)
app.use(userRoutes)

//if you pass string, you can pre-name extensions
// /send/character
app.use('/seed', characterSeed)

app.listen(PORT, () => {
    console.log('listening on ' + PORT)
})

module.exports = app