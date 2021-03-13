const { Sequelize, DataTypes } = require('sequelize')
const db = require('../index')
const User = require('./user.js')

const Contact = db.sequelize.define('Contact', {
    uuid: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
        //primaryKey: true
    },
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     autoIncrement: true
    // },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
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
    // userId: {
    //     type: DataTypes.UUID,
    //     references: {
    //         model: User,
    //         key: 'uuid'
    //     }
    // }
})

Contact.belongsTo(User)

db.models.Contact

module.exports = Contact
