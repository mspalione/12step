const validate = require('./calendarValidation')
var expect = require('chai').expect

const harryPotter = async () => await validate.findUser('roundglassesarecool')
const contactRon = async () => await validate.findContact(harryPotter, 'Ron', 'Weasley')
const cal = {
    contactFirstName: "Ron",
    contactLastName: "Weasley",
    dateAndTime: "2021-12-26 10:20",
    eventSummary: "me and Ron against Fred and George. Percy is a wanker and won't play.",
    eventTitle: "Snow Ball Fight",
    userName: "roundglassesarecool"
}

describe('create', () => {
    describe('when body contains event title, date and time', () => {
        it('returns calendar object', () => {
            expect(
                validate.create(cal, harryPotter.userId, contactRon.uuid, contactRon.firstName, contactRon.lastName)
                ).to.include(cal)
        })
    })

    describe('when body is missing one of the required fields of event title, date and time, and user name', () => {
        it('throws an error', async () => {
            delete cal.eventTitle

            expect(() => 
                validate.create(cal, harryPotter.userId, contactRon.uuid, contactRon.firstName, contactRon.lastName)
                ).to.throw()
        })
    })
})



