const express = require('express')
const router = require('./routes')
const model = require('./models')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.use((req, res, next) => {
    // allow requests from swagger
    res.set('Access-Control-Allow-Origin', 'http://localhost:3001')
    next()
})

app.use('/', router)


model.init()
    .then(() => {
        app.listen(3000, () => {
            console.log('listening on port 3000')
        })
    })



