const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const { Model } = require('sequelize')

class Service extends Model {}

Service.init(
    {
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
        timestamps: false,
        modelName: 'service'
    }
)

module.exports = Service