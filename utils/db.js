const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'db_barbershop_hachazo',
    'root',
    'localhost',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

module.exports = sequelize