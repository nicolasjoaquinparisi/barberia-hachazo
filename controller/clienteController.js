const Cliente = require('../model/Cliente')
const Persona = require('../model/Persona')
const { validationResult } = require('express-validator')

exports.crearCliente = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { nombre, apellido, dni, celular } = req.body

        const exists = await Persona.findOne({ where: {dni: dni} })
        if (exists) {
            return res.status(400).send(`Ya existe un cliente con el DNI: ${dni}`)
        }

        const persona = await Persona.create({nombre, apellido, dni, celular})
        await Cliente.create({dni})

        res.status(200).send(`Se dio de alta a ${apellido}, ${nombre}`)

    } catch (error) {
        console.log(error)
        return res.status(500).send('Hubo un error en el servidor')
    }
}

exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt' ] },
            include: { model: Persona, attributes: { exclude: ['createdAt', 'updatedAt', 'dni'] } }
        })

        res.json({clientes})
    } catch (error) {
        console.log(error)
        return res.status(500).send('Hubo un error en el servidor')
    }
}

exports.actualizarCliente = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // id es el DNI actual del cliente
        // dni es el DNI nuevo que se pasa por el body

        const { nombre, apellido, dni, celular } = req.body

        // Obtener id de los parámetros
        const id = req.params.id

        const cliente = await Cliente.findByPk({ where: {id: id} })
        if (!cliente) {
            return res.status(400).send(`El cliente con DNI ${id} no existe`)
        }

        const exists = await Cliente.findOne({ where: {dni: dni} })
        if (exists) {
            return res.status(400).send(`Ya existe un cliente con el DNI: ${dni}`)
        }

        cliente.set({
            nombre: nombre,
            apellido, apellido,
            dni: dni,
            celular: celular
        })
        await cliente.save()

        res.status(200).send({cliente})
    } catch (error) {
        console.log(error)
        return res.status(500).send('Hubo un error en el servidor')
    }
}

exports.eliminarCliente = async (req, res) => {
    try {
        const id = req.params.id

        console.log(req.params)

        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).send(`No existe el cliente ${id}`)
        }
        
        // const persona = Persona.findByPk(cliente.dni)
        // await persona.destroy()
        await cliente.destroy()

        res.status(200).send('Se dio de baja al cliente')

    } catch (error) {
        console.log(error)
        return res.status(500).send('Hubo un error en el servidor')
    }
}