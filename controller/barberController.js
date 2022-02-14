const Barber = require('../model/Barber')
const Person = require('../model/Person')
const { validationResult } = require('express-validator')

exports.createBarber = async(req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const { name, lastName, dni, phone, address } = req.body

        const existsBarber = await Barber.findOne({ where: {dni: dni} })
        if (existsBarber) {
            return res.status(400).send(`There is a barber with the DNI: ${dni}`)
        }

        // Se verifica si ya existe la persona.
        // Si un cliente va a ser barbero, entonces se verifica si ya existen sus datos personales
        const existsPerson = await Person.findByPk(dni)
        if (!existsPerson) {
            await Person.create({name, lastName, dni, phone})
        }

        await Barber.create({dni, address})

        res.status(200).send(`New barber added: ${lastName}, ${name}`)
    
    } catch {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.getBarbers = async (req, res) => {
    try {
        const barbers = await Barber.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: { model: Person, attributes: { exclude: ['createdAt', 'updatedAt', 'dni'] } }
        })

        res.json({barbers})
    } catch {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.getBarber = async (req, res) => {
    try {
        // Obtener id del barbero de los parámetros
        const idBarber = req.params.id

        const barber = await Barber.findByPk(idBarber, {
            attributes: { exclude: ['createdAt', 'updatedAt' ] },
            include: { model: Person, attributes: { exclude: ['createdAt', 'updatedAt', 'dni'] }}
        })
        
        if (!barber) {
            return res.status(400).send(`Barber with id ${idBarber} not found`)
        }

        res.json({barber})
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.updateBarber = async(req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        // id es el DNI actual del barbero
        // dni es el DNI nuevo que se pasa por medio del body
        const { name, lastName, dni, phone, address } = req.body

        // Se obtiene el id del barbero
        const idBarber = req.params.id

        const barber = await Barber.findByPk(idBarber)
        if (!barber) {
            return res.status(400).send(`Barber with id ${idBarber} not found`)
        }

        // Se verifica si existe una persona con el dni nuevo
        const person = await Person.findByPk(dni)
        if (person) {
            return res.status(400).send(`Person with DNI ${dni} not found`)
        }

        const barberPerson = await Person.findByPk(client.dni)
        barberPerson.set({
            name: name,
            lastName: lastName,
            dni: dni,
            phone: phone
        })
        await barberPerson.save()

        barber.set({
            address: address
        })
        await barber.save()

        res.status(200).send(`${barberPerson.lastName}, ${barberPerson.name} updated`)
    } catch {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.deleteBarber = async(req,res) => {

}