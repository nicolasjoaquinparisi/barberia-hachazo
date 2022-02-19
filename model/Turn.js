const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const { Model } = require('sequelize')
const Client = require('./Client')
const Barber = require('./Barber')
const Service = require('./Service')

class Turn extends Model {}

Turn.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'turn'
    }
)

Turn.belongsTo(Client, { foreignKey: 'client_id', targetKey: 'id'})
Client.hasMany(Turn, { foreignKey: 'id'})

Turn.belongsTo(Barber, { foreignKey: 'barber_id', targetKey: 'id'})
Barber.hasMany(Turn, { foreignKey: 'id'})

Turn.belongsTo(Service, { foreignKey: 'service_id', targetKey: 'id'})
Service.hasMany(Turn, { foreignKey: 'id'})

module.exports = Turn