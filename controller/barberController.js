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

}

exports.getBarber = async (req, res) => {

}

exports.updateBarber = async(req, res) => {

}

exports.deleteBarber = async(req,res) => {

}