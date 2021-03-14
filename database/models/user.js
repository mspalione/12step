const { Sequelize, DataTypes } = require('sequelize')
const db = require('../index')

const User = db.sequelize.define('User', {
    uuid: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recoveryEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

db.models.User

module.exports = User 
