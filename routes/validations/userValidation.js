const Contact = require('../../database/models/contact.js')
const User = require('../../database/models/user.js')
let err = {}

create = body => {
    let message = 'Cannot create user. '
    let errors = false

    if(!body.userName) {
        message += 'User name is required. '
        errors = true
    }

    if(!body.firstName) {
        message += 'First name is required. '
        errors = true
    }
    
    if(!body.lastName) {
        message += 'Last name is required. '
        errors = true
    }
    
    if(!body.recoveryEmail) {
        message += 'Email is required. '
        errors = true
    }
    
    if(!body.password) {
        message += 'Password is required. '
        errors = true
    }

    if(errors) {
        const err = {}
        err.message = message    
        throw err
    }

    return {
        firstName: body.firstName,
        lastName: body.lastName,
        recoveryEmail: body.recoveryEmail,
        userName: body.userName,
        password: body.password
    }
}

findUser = async id => {
    const user = await User.findOne({ where: { id } })
    if(!user) {
        err.message = 'No user found.'
        throw err
    }
    
    return user
}

module.exports = { create, findUser }