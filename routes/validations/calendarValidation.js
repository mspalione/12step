const Contact = require('../../database/models/contact.js')
const User = require('../../database/models/user.js')
const Calendar = require('../../database/models/calendar.js')

create = async body => {
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

    if (!body.userName) {
        errors.push('Username is required')
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

    let user = await User.findOne({ where: { userName: body.userName } })
    if (!user) throw 'No user found by that username. Calendar event not created.'
    cal.userId = user.uuid
    
    if (body.contactFirstName || body.contactLastName) {
        const contactName = {}
        contactName.userId = user.uuid
        if (body.contactFirstName) contactName.firstName = body.contactFirstName
        if (body.contactLastName) contactName.lastName = body.contactLastName

        const contact = body.firstName && body.lastName 
            ? await Contact.findOne({ where: contactName }) 
            : await Contact.findAll({ where: contactName })

        if (contact.length > 1) throw `You have several contacts by that name. Please specify first and last name.`

        if (contact) {
            cal.contactId = contact.uuid
            cal.contactFirstName = contact.firstName
            cal.contactLastName = contact.lastName
        }
    }

    return cal
}

module.exports = { create }