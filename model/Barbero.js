const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const { Model } = require('sequelize')
const Persona = require('./Persona')

class Barbero extends Model {}

Barbero.init(
    {
        codBarbero: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'barbero'
    }
)

Barbero.belongsTo(Persona, { foreignKey: 'dni', targetKey: 'dni' })
Persona.hasOne(Barbero, { foreignKey: 'dni' } )

module.exports = Barbero