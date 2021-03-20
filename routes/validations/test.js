const validate = require('./calendarValidation')

describe('create', () => {
    describe('when body contains event title, date and time, user name, and the user is found in the db', () => {
        it('returns calendar object')
    })

    describe('when body contains event title, date and time, user name, and the user is not found in the db', () => {
        it('throw an error')
    })

    describe('when body missing one of the required fields of event title, date and time, and user name', () => {
        it('throw an error')
    })

    describe('when body has no errors and contact is found in db', () => {
        it('returns calendar object')
    })

    describe('when body has no errors and multiple contacts are found in db', () => {
        it('throw an error')
    })
})



