const { Sequelize } = require('sequelize')
const config = require('../configuration/dbConfig.json')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
  }) 

const db = {
    Sequelize,
    sequelize,
    models: {},
    initialize: () => {
      sequelize.sync({ force: false })
      .then(() => {
        console.log('Successful connection to database.')
      })
      .catch(error => {
        console.log('Unable to connect to the database:', error)
      })
    }
}

module.exports = db