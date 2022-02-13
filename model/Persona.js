const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

class Persona extends Model {}

Persona.init(
    {
        dni: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        celular: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'persona'
    }
)

module.exports = Persona