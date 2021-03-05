const Sequelize = require('sequelize')
const config = require('../configuration/dbConfig.json')

const db = {
    Sequelize,
    init() {
        db.sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
            host: config.development.host,
            dialect: config.development.dialect 
          }) 
    }
}

module.exports = db