const { Sequelize, DataTypes } = require('sequelize')
const db = require('../index')
const User = require('./user.js')
const Contact = require('./contact.js')

const Calendar = db.sequelize.define('Calendar', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true
    },
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     autoIncrement: true
    // },
    eventTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateAndTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    eventSummary: {
        type: DataTypes.STRING
    },
    contactName: {
        type: DataTypes.STRING
    },
    contactId: {
        type: DataTypes.UUID,
        references: {
            model: Contact,
            key: 'uuid'
        }
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'uuid'
        }
    }
})

Calendar.belongsTo(User)
Calendar.belongsTo(Contact)

db.models.Calendar

module.exports = Calendar
