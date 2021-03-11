const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

const Calendar = sequelize.define('Calendar', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
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
    }
})
