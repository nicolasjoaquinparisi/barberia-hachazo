const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const { Model } = require('sequelize')
const Client = require('./Client')
const Barber = require('./Barber')
const Service = require('./Service')

class Turn extends Model {}

Turn.init(
    {
        date: {
            type: Sequelize.DATE
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'turn'
    }
)

Turn.belongsTo(Client, { foreignKey: 'client_id', targetKey: 'id'})
Client.hasMany(Turn, { foreignKey: 'client_id'})

Turn.belongsTo(Barber, { foreignKey: 'barber_id', targetKey: 'id'})
Barber.hasMany(Turn, { foreignKey: 'barber_id'})

Turn.belongsTo(Service, { foreignKey: 'service_id', targetKey: 'id'})
Service.hasMany(Turn, { foreignKey: 'service_id'})

module.exports = Turn