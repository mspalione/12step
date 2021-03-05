const Sequelize = require('sequelize')
const config = require('../configuration/dbConfig.json')

const db = {
    Sequelize,
    async init() {
        db.sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: config.dialect 
          }) 
          try {
            await db.sequelize.authenticate()
            console.log('Connection has been established successfully.')
            await db.sequelize.sync({ force: false })
          } catch (error) {
            console.error('Unable to connect to the database:', error)
          }
    }
}

module.exports = db