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

Barber.belongsTo(Person, { foreignKey: 'person_id', targetKey: 'id', onUpdate: 'cascade', onDelete: 'cascade' })
Person.hasOne(Barber, { foreignKey: 'id'} )

module.exports = Barber