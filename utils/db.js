const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'db_barbershop_hachazo',
    'root',
    'localhost',
    {
        dialect: 'mysql',
        dialectOptions: {
            useUTC: false,
            dateStrings: true,
            typeCast: true
        },
        timezone: '-03:00',
        host: 'localhost'
    }
)

module.exports = sequelize