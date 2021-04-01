const Contact = require('../../database/models/contact.js')
const User = require('../../database/models/user.js')

create = ( body, userId, contactUuid, contactFirstName, contactLastName ) => {
    let errors = 'Please enter the missing value(s) and try again. '
    const cal = {}
    let missingValues = false

    if (!body.eventTitle) {
        errors += 'Event title is required. '
        missingValues = true
    }

    if (!body.dateAndTime) {
        errors += 'Date and Time is required. '
        missingValues = true
    }

    if (missingValues === true) {
        let err = { message: errors}
        throw err         
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
    if (!userName) return res.status(400).json('Username is required')

    let user = await User.findOne({ where: { userName } })
    if (!user) {
        const err = { message: 'No user found by that username. Calendar event not created.' }
        throw err
    }
    return user
}

findContact = async ( user, contactFirstName, contactLastName ) => {
    if (contactFirstName || contactLastName) {
        const contactName = {}
        contactName.userId = user.uuid
        if (contactFirstName) contactName.firstName = contactFirstName
        if (contactLastName) contactName.lastName = contactLastName

        const contact = await Contact.findAll({ where: contactName })

        if (!contact) return
        if (contact.length > 1) {
            const err = { message: 'You have several contacts by that name. Please specify first and last name.' }
            throw err
        }

        return contact
    }
}

module.exports = { create, findUser, findContact }