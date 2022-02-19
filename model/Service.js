const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const { Model } = require('sequelize')

class Service extends Model {}

Service.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'service'
    }
)

module.exports = Service