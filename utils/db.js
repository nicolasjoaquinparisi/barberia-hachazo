const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'db_barberia',
    'root',
    'localhost',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

module.exports = sequelize