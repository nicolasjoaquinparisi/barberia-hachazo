const Client = require('../model/Client')
const Person = require('../model/Person')
const Barber = require('../model/Barber')
const { validationResult } = require('express-validator')

exports.createClient = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { name, lastName, dni, phone } = req.body

        console.error(`${name} ${lastName} ${dni} ${phone}`)

        // Se verifica si ya existe la persona.
        // Si un barbero quiere cortarse el pelo, entonces se verifica si ya existen sus datos personales
        const existsPerson = await Person.findOne({ where: { dni: dni} })
        if (existsPerson) {
            
            const existClient = await Client.findOne({ where: { person_id: existsPerson.id } })
            if (existClient) {
                res.status(400).send(`There is a client with DNI: ${existsPerson.dni}`)
            }
        }

        const person = await Person.create({
            name: name,
            lastName: lastName,
            dni: dni,
            phone: phone
        })
        await Client.create({person_id: person.id})

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
            include: { model: Person, attributes: { exclude: ['createdAt', 'updatedAt'] } }
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
            include: { model: Person, attributes: { exclude: ['createdAt', 'updatedAt'] }}
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
        // Se extraen los datos del body de la request
        const { name, lastName, dni, phone } = req.body

        // Obtener id del cliente a modificar
        const id = req.params.id

        // Validar que exista el cliente a modificar
        const client = await Client.findByPk(id)
        if (!client) {
            return res.status(400).send(`Client not found`)
        }

        // Se verifica si existe una persona con el nuevo DNI
        const person = await Person.findByPk(client.person_id)
        if (person && !person.dni === dni) {
            return res.status(400).send(`There is a person with the selected dni`)
        }

        // Actualizar los datos personales del cliente
        const clientPerson = await Person.findByPk(client.person_id)
        clientPerson.set({
            name: name,
            lastName: lastName,
            dni: dni,
            phone: phone
        })
        await clientPerson.save()

        res.status(200).send(`Client updated`)
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

        const person = await Person.findByPk(client.person_id)
        if (!person) {
            return res.status(404).send(`The person with id ${id} was not found`)
        }

        await client.destroy()
        await person.destroy()

        res.status(200).send('Client deleted')

    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}