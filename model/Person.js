const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

class Person extends Model {}

Person.init(
    {
        dni: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'person'
    }
)

module.exports = Person