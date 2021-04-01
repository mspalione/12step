const calendar = require('./calendarValidation')
const contact = require('./contactValidation')
const user = require('./userValidation')
let expect = require('chai').expect

const harryPotter = async () => await calendar.findUser('roundglassesarecool')
const contactRon = async () => await calendar.findContact(harryPotter, 'Ron', 'Weasley')
const cal = {
    contactFirstName: "Ron",
    contactLastName: "Weasley",
    dateAndTime: "2021-12-26 10:20",
    eventSummary: "me and Ron against Fred and George. Percy is a wanker and won't play.",
    eventTitle: "Snow Ball Fight",
    userName: "roundglassesarecool"
}

describe('calendar validation', () => {
    describe('when body contains event title, date and time', () => {
        it('returns calendar object', () => {
            expect(
                calendar.create(cal, harryPotter.userId, contactRon.uuid, contactRon.firstName, contactRon.lastName)
                ).to.include(cal)
        })
    })

    describe('when body is missing one of the required fields of event title, date and time, and user name', () => {
        it('throws an error', () => {
            delete cal.eventTitle

            expect(() => 
                calendar.create(cal, harryPotter.userId, contactRon.uuid, contactRon.firstName, contactRon.lastName)
                ).to.throw()
        })
    })

    describe('When a valid username is provided', () => {
        it('returns related user object', async () => {
            const results = await calendar.findUser('roundglassesarecool')

            expect(results).to.include(harryPotter)
        })
    })
})

const luna = {
    firstName: 'Luna',
    lastName: 'Lovegood',
    phone: '+44 6532 123456',
    email: 'watchoutfornargles@email.com',
    address: 'Ottery St. Catchpole, Devon, England'
}

describe('contact validation', () => {
    describe('When a user is found with the provided username', () => {
        it('returns contact object', async () => {
            luna.userName = 'roundglassesarecool'
            const create = await contact.create(luna)
            expect(create).to.include(luna)
        })
    })
    
    describe('When updating a contact', () => {
        it('returns the contact object to update', async () => {
            const contactToUpdate = await contact.findContact(5)
            expect(contactToUpdate).to.include(contactRon)
        })
    })
})

describe('user validation', () => {
    describe('When updating an user', () => {
        it('returns the user object to update', async () => {
            const userToUpdate = await user.findUser(1)
            expect(userToUpdate).to.include(harryPotter)
        })
    })

    describe('When creating a new user and any required field is missing', () => {
        it('throws an error', () => {
            expect(() =>
                user.create({
                    userName: 'HarpiesGirl',
                    firstName: 'Ginny',
                    lastName: 'Weasley'
                })).to.throw()
        })
    })
})
