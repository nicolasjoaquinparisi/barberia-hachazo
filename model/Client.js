const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const { Model } = require('sequelize')
const Person = require('./Person')

class Client extends Model {}

Client.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        sequelize,
        modelName: 'client'
    }
)

Client.belongsTo(Person, { foreignKey: 'dni', targetKey: 'dni' })
Person.hasOne(Client, { foreignKey: 'dni'} )

module.exports = Client