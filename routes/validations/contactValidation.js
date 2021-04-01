const Contact = require('../../database/models/contact.js')
const User = require('../../database/models/user.js')

create = async body => {
    const err = {}
    if(!body.userName) {
        err.message = 'Cannot create a new contact. User name is required.'
        throw err
    }

    const user = await User.findOne({ where: { userName: body.userName } })

    if(!user) {
        err.message = 'No user found associated with provided username.'
        throw err
    }

    return await Contact.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        address: body.address,
        phone: body.phone,
        userName: body.userName,
        userId: user.uuid
    })
}

findContact = async id => {
    const contact = await Contact.findOne({ where: { id } })
    if(!contact) {
        const err = {}
        err.message = 'No such contact found.'
        throw err
    }

    return contact
}

module.exports = { create, findContact }