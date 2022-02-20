const express = require("express")
const sequelize = require('./utils/db')
// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')

// Creating server
const app = express()

// Sync with the DB models
sequelize.sync()

// Enabling express.json
app.use(express.json( {extended: true} ))

// Setting up the App's PORT
const PORT = process.env.PORT || 4000

// Paths
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/client', require('./routes/client'))
app.use('/api/barber', require('./routes/barber'))
app.use('/api/service', require('./routes/service'))
app.use('/api/turn', require('./routes/turn'))

// Main page
app.get('/', (req, res) => {
    res.send()
})

// Start App
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}...`)
})