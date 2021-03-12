const express = require('express')
const router = require('./routes')
const user = require('./routes/user')
const database = require('./database')
const app = express()

app.disable('x-powered-by')
app.use(express.json())

app.use((req, res, next) => {
    // allow requests from swagger
    res.set('Access-Control-Allow-Origin', 'http://localhost:3001')
    next()
})

app.use('/users', user)
app.use('/', router)


database.initialize()
    
app.listen(3000, () => {
    console.log('listening on port 3000')
})




