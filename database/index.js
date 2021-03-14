const { Sequelize } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
  }) 

const db = {
    Sequelize,
    sequelize,
    models: {},
    initialize: () => {
      sequelize.authenticate()
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

