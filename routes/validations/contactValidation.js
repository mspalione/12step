const Contact = require('../../database/models/contact.js')
const User = require('../../database/models/user.js')
let err = {}

create = async ( body ) => {
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

update = async ( body, contact ) => {
    const updatedContact = await contact.update({
        firstName: body.firstName ? body.firstName : contact.firstName,
        lastName: body.lastName ? body.lastName : contact.lastName,
        email: body.email ? body.email : contact.email,
        address: body.address ? body.address : contact.address,
        phone: body.phone ? body.phone : contact.phone
    })

    if(!updatedContact) {
        err.message = 'The contact was not updated'
        throw err
    }

    return updatedContact
}

module.exports = { create, update }