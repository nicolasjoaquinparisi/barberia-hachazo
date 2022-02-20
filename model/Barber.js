const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const { Model } = require('sequelize')
const Person = require('./Person')

class Barber extends Model {}

Barber.init(
    {
        address: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'barber'
    }
)

Barber.belongsTo(Person, { foreignKey: 'person_id', targetKey: 'id'})
Person.hasOne(Barber, { foreignKey: 'id'} )

module.exports = Barber