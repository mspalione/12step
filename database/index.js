const { Sequelize } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
  }) 

// const User = require('./models/user.js')
// const Contact = require('./models/contact.js')
// const Calendar = require('./models/calendar.js')

const db = {
    Sequelize,
    sequelize,
    models: {  },
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


    // init() {
    //   db.sequelize = new Sequelize({
    //     dialect: 'sqlite',
    //     storage: 'database.sqlite'
    //     }),
    //   db.User = UserModel(db)
    //   return db.sequelize.sync({ force: false })
    // }

    
// queryInterface.createTable('Users', User)
// queryInterface.createTable('Contacts', Contact)
// queryInterface.createTable('Calendar', Calendar)

// db.models.User = require('./models/user.js')
// db.models.Contact = require('./models/contact.js')
// db.models.Calendar = require('./models/calendar.js')