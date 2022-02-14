const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const { Model } = require('sequelize')
const Person = require('./Person')

class Barber extends Model {}

Barber.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'barber'
    }
)

Barber.belongsTo(Person, { foreignKey: 'dni', targetKey: 'dni' })
Person.hasOne(Barber, { foreignKey: 'dni' } )

module.exports = Barber