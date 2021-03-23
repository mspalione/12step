const Contact = require('../../database/models/contact.js')
const User = require('../../database/models/user.js')
const Calendar = require('../../database/models/calendar.js')

create = ( body, userId, contactUuid, contactFirstName, contactLastName ) => {
    const errors = []
    const cal = {}
    let missingValues = false

    if (!body.eventTitle) {
        errors.push('Event title is required')
        missingValues = true
    }

    if (!body.dateAndTime) {
        errors.push('Date and Time is required')
        missingValues = true
    }

    if (missingValues === true) {
        errors.push('Please enter the missing value(s) and try again.')
        throw errors
    }
    
    cal.eventTitle = body.eventTitle
    cal.dateAndTime = body.dateAndTime
    cal.eventSummary = body.eventSummary
    cal.contactFirstName = body.contactFirstName
    cal.contactLastName = body.contactLastName
    cal.userName = body.userName
    cal.userId = userId
    
    if (contactUuid) {
        cal.contactId = contactUuid
        cal.contactFirstName = contactFirstName
        cal.contactLastName = contactLastName
    }

    return cal
}

findUser = async userName => {
    if (!userName) throw 'Username is required'

    let user = await User.findOne({ where: { userName } })
    if (!user) throw 'No user found by that username. Calendar event not created.'

    return user
}

findContact = async ( user, contactFirstName, contactLastName ) => {
    if (contactFirstName || contactLastName) {
        const contactName = {}
        contactName.userId = user.uuid
        if (contactFirstName) contactName.firstName = contactFirstName
        if (contactLastName) contactName.lastName = contactLastName

        const contact = contactFirstName && contactLastName 
            ? await Contact.findOne({ where: contactName }) 
            : await Contact.findAll({ where: contactName })

        if (!contact) return
        if (contact.length > 1) throw `You have several contacts by that name. Please specify first and last name.`

        return contact
    }
}

module.exports = { create, findUser, findContact }