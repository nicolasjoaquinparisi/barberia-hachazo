const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const { Model } = require('sequelize')
const Persona = require('./Persona')

class Cliente extends Model {}

Cliente.init(
    {
        nroCliente: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        sequelize,
        modelName: 'cliente'
    }
)

Cliente.belongsTo(Persona, { foreignKey: 'dni', targetKey: 'dni', onDelete: 'cascade' })
Persona.hasOne(Cliente, { foreignKey: 'dni', onDelete: 'cascade'} )

module.exports = Cliente