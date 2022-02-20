const Service = require('../model/Service')
const { validationResult } = require('express-validator')

exports.createService = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { name, price } = req.body

        const existService = await Service.findOne({ where: {name: name}})
        if (existService) {
            return res.status(400).send(`There is a service with name: ${name}`)
        }

        await Service.create({
            name: name,
            price: price
        })

        res.status(200).send(`New service added: ${name}`)

    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.getServices = async (req, res) => {
    try {
        const services = await Service.findAll()
        res.json({services})
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.getService = async (req, res) => {
    try {
        const id = req.params.id

        const service = await Service.findByPk(id)

        if (!service) {
            return res.status(400).send(`Service not found`)
        }

        res.json({service})
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.updateService = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, price } = req.body

        const id = req.params.id

        // Validar si existe el servicio a modificar
        const service = await Service.findByPk(id)
        if (!service) {
            return res.status(400).send(`Service not found`)
        }

        const existServiceWithNewName = await Service.findOne({where: {name: name}})
        if (existServiceWithNewName && (service.name !== name)) {
            return res.status(400).send(`There is the service with name ${name}`)
        }

        service.set({
            name: name,
            price: price
        })
        await service.save()

        res.status(200).send(`Service updated`)
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}

exports.deleteService = async (req, res) => {
    try {
        const id = req.params.id

        const service = await Service.findByPk(id)
        if (!service) {
            return res.status(400).send(`Service not found`)
        }

        await service.destroy()

        res.status(200).send(`Service deleted`)
    } catch (error) {
        console.log(error)
        return res.status(500).send('There was a server error')
    }
}