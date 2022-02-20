const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const { Model } = require('sequelize')
const Person = require('./Person')

class Client extends Model {}

Client.init(
    {},
    {
        sequelize,
        timestamps: false,
        modelName: 'client'
    }
)

Client.belongsTo(Person, { foreignKey: 'person_id', targetKey: 'id' })
Person.hasOne(Client, { foreignKey: 'id'} )

module.exports = Client