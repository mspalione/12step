const validate = require('./calendarValidation')
const assert = require('assert')

let harryPotter
let contactRon 

getValues = async () => {
    harryPotter = await validate.findUser('roundglassesarecool')
    contactRon = await validate.findContact(harryPotter, 'Ron', 'Weasley')
}

describe('create', () => {
    describe('when body contains event title, date and time', () => {
        it('returns calendar object', async () => {
            const cal = {
                contactFirstName: "Ron",
                contactLastName: "Weasley",
                dateAndTime: "2021-12-26 10:20",
                eventSummary: "me and Ron against Fred and George. Percy is a wanker and won't play.",
                eventTitle: "Snow Ball Fight",
                userName: "roundglassesarecool"
            }

            //verify the userId and the contactUuid for your sqlite db before running tests
            const output = await validate.create(cal, 'a7bb478f-8a6f-4e8a-adfc-85146651a0ca', '4776675a-b545-40ed-bc76-7afd8ba8f503', 'Ron', 'Weasley')

            assert.strictEqual(output, {
                contactFirstName: "Ron",
                contactLastName: "Weasley",
                dateAndTime: "2021-12-26 10:20",
                eventSummary: "me and Ron against Fred and George. Percy is a wanker and won't play.",
                eventTitle: "Snow Ball Fight",
                userName: "roundglassesarecool"
            })
        })
    })

    describe('when body contains event title, date and time, user name, and the user is not found in the db', () => {
        it('throw an error', () => {
            
        })
    })

    describe('when body missing one of the required fields of event title, date and time, and user name', () => {
        it('throw an error', () => {
            
        })
    })

    describe('when body has no errors and contact is found in db', () => {
        it('returns calendar object', () => {
            
        })
    })

    describe('when body has no errors and multiple contacts are found in db', () => {
        it('throw an error', () => {
            
        })
    })
})



