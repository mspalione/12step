const Contact = require('../../database/models/contact.js')
const User = require('../../database/models/user.js')

create = async ( body ) => {
    if(!body.userName) {
        return res.status(400).json('Cannot create a new contact. User name is required.')
    }

    const user = await User.findOne({ where: { userName: body.userName } })

    if(!user) {
        return res.status(400).json('No user found associated with provided username.')
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
    if(!contact) return res.status(400).json('No such contact found.')

    return contact
}

module.exports = { create, findContact }