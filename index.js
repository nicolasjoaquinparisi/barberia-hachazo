const express = require("express")
const sequelize = require('./utils/db')

// Crear el server
const app = express()

// Sincronización de los modelos con la Base de Datos
sequelize.sync()

// Habilitar express.json
// express.json permite leer datos que el usuario envie. Otra forma de hacerlo es con body parser
app.use(express.json( {extended: true} ))

// Puerto de la app
const PORT = process.env.PORT || 4000

// Importar rutas
app.use('/api/cliente', require('./routes/cliente'));

// Página principal
app.get('/', (req, res) => {
    res.send()
})

// Iniciar la app
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}...`)
})