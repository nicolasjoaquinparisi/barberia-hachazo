const Client = require('../model/Client')
const Person = require('../model/Person')
const { validationResult } = require('express-validator')

exports.createClient = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { name, lastName, dni, phone } = req.body

        const existsClient = await Client.findOne({ where: {dni: dni} })
        if (existsClient) {
            return res.status(400).send(`There is a client with the DNI: ${dni}`)
        }

        // Se verifica si ya existe la persona.
        // Si un barbero quiere cortarse el pelo, entonces se verifica si ya existen sus datos personales
        const existsPerson = await Person.findByPk(dni)
        if (!existsPerson) {
            await Person.create({name, lastName, dni, phone})
        }

        await Client.create({dni})

        res.status(200).send(`New client added: ${lastName}, ${name}`)

    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt' ] },
            include: { model: Person, attributes: { exclude: ['createdAt', 'updatedAt', 'dni'] } }
        })

        res.json({clients})
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.getClient = async (req, res) => {
    try {
        // Obtener id del cliente de los parámetros
        const idClient = req.params.id

        const client = await Client.findByPk(idClient, {
            attributes: { exclude: ['createdAt', 'updatedAt' ] },
            include: { model: Person, attributes: { exclude: ['createdAt', 'updatedAt', 'dni'] }}
        })
        
        if (!client) {
            return res.status(400).send(`Client with id ${idClient} not found`)
        }

        res.json({client})
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.updateClient = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, lastName, dni, phone } = req.body

        // Obtener id del cliente de los parámetros
        const idClient = req.params.id

        const client = await Client.findByPk(idClient)
        if (!client) {
            return res.status(400).send(`Client with id ${idClient} not found`)
        }

        // Se verifica si existe una persona con el dni nuevo
        const person = await Person.findByPk(dni)
        if (person) {
            return res.status(400).send(`Person with DNI ${dni} not found`)
        }

        const clientPerson = await Person.findByPk(client.dni)
        clientPerson.set({
            name: name,
            lastName: lastName,
            dni: dni,
            phone: phone
        })
        await clientPerson.save()

        client.set({
            dni: dni
        })
        await client.save()

        res.status(200).send(`${clientPerson.lastName}, ${clientPerson.name} updated`)
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.deleteClient = async (req, res) => {
    try {
        const id = req.params.id

        const client = await Client.findByPk(id)
        if (!client) {
            return res.status(404).send(`The client with id ${id} was not found`)
        }
        
        const person = Person.findByPk(client.dni)
        await person.destroy()
        await client.destroy()

        res.status(200).send('Client deleted')

    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}