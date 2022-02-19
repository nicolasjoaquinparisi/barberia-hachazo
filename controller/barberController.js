const Barber = require('../model/Barber')
const Person = require('../model/Person')
const { validationResult } = require('express-validator')

exports.createBarber = async(req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { name, lastName, dni, phone, address } = req.body

        // Se verifica si ya existe la persona.
        // Una misma persona puede ser cliente o barbero
        const existsPerson = await Person.findOne({ where: { dni: dni} })
        if (existsPerson) {

            const existBarber = await Barber.findOne({ where: { person_id: existsPerson.id } })
            if (existBarber) {
                return res.status(400).send(`There is a barber with DNI: ${dni}`)
            }

            await Barber.create({
                person_id: existsPerson.id,
                address: address
            })
        }
        else {
            const person = await Person.create({
                name: name,
                lastName: lastName,
                dni: dni,
                phone: phone
            })

            await Barber.create({
                person_id: person.id,
                address: address
            })
        }

        res.status(200).send(`New barber added: ${lastName}, ${name}`)

    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.getBarbers = async (req, res) => {
    try {
        const barbers = await Barber.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt' ] },
            include: { model: Person, attributes: { exclude: ['createdAt', 'updatedAt'] } }
        })

        res.json({barbers})
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.getBarber = async (req, res) => {
    try {
        // Obtener id del barbero de los parámetros
        const id = req.params.id

        const barber = await Barber.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt' ] },
            include: { model: Person, attributes: { exclude: ['createdAt', 'updatedAt'] }}
        })
        
        if (!barber) {
            return res.status(400).send(`Barber with id ${id} not found`)
        }

        res.json({barber})
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.updateBarber = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Se extraen los datos del body de la request
        const { name, lastName, dni, phone, address } = req.body

        // Obtener id del barbero a modificar
        const id = req.params.id

        // Validar que exista el barbero a modificar
        const barber = await Barber.findByPk(id)
        if (!barber) {
            return res.status(400).send(`Barber not found`)
        }

        // Se verifica si existe una persona con el nuevo DNI
        const person = await Person.findByPk(barber.person_id)
        if (person && !person.dni === dni) {
            return res.status(400).send(`There is a person with the selected dni`)
        }

        // Actualizar los datos personales del barbero
        const barberPerson = await Person.findByPk(barber.person_id)
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
        barber.save()

        res.status(200).send(`Barber updated`)
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.deleteBarber = async(req,res) => {
    try {
        const id = req.params.id

        const barber = await Barber.findByPk(id)
        if (!barber) {
            return res.status(404).send(`The barber with id ${id} was not found`)
        }
        
        await barber.destroy()

        res.status(200).send('Barber deleted')

    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}