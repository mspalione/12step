const { Sequelize, DataTypes } = require('sequelize')
const db = require('../index')
const User = require('./user.js')

const Contact = db.sequelize.define('Contact', {
    uuid: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.INTEGER 
    },
    email: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'uuid'
        }
    }
})

db.models.Contact

module.exports = Contact
