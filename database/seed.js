const Calendar = require("./models/calendar")
const User = require("./models/user")
const Contact = require("./models/contact")

const createUser = async (firstName, lastName, recoveryEmail, userName, password) => {
    await User.create({
        firstName: firstName,
        lastName: lastName,
        recoveryEmail: recoveryEmail,
        userName: userName,
        password: password
    })
}

const createContact = async (firstName, lastName, email, address, phone, userId, userName) => {
    await Contact.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        phone: phone,
        userId: userId,
        userName: userName
    })
}

const createCalEvent = (eventTitle, dateAndTime, eventSummary, contactFirstName, contactLastName, contactId, userId, userName) => {
    Calendar.create({
        eventTitle: eventTitle,
        dateAndTime: dateAndTime,
        eventSummary: eventSummary,
        contactFirstName: contactFirstName,
        contactLastName: contactLastName,
        contactId: contactId,
        userId: userId,
        userName: userName
    })
}

const setSeed = {
    seed: async () => {
        await createUser("Harry", "Potter", "longlivehedwig@email.com", "roundglassesarecool", "iamthechosenone")
        await createUser("Ron", "Weasley", "bestkeeper@email.com", "chessmaster", "hermione")
        await createUser("Hermione", "Granger", "hgranger@email.com", "hermioneg", "3xlp4GGn")
        const hermione = await User.findOne({ where: { firstName: "Hermione" } })
        const ron = await User.findOne({ where: { firstName: "Ron" } })
        const harry = await User.findOne({ where: { firstName: "Harry" } })
        await createContact("Viktor", "Krum", "seeker4life@email.com", "Bulgaria", "+359 32 455 6464", hermione.uuid, hermione.userName)
        await createContact("Mom", null, "mwgranger@email.com", "123 Granger St", "+44 7911 123456", hermione.uuid, hermione.userName)
        await createContact("Dad", null, "wendellgranger@email.com", "123 Granger St", "+44 7911 123456", hermione.uuid, hermione.userName)
        await createContact("Ronald", "Weasley", "bestkeeper@email.com", "The Burrow", "+44 7911 654321", hermione.uuid, hermione.userName)
        await createContact("Ron", "Weasley", "bestkeeper@email.com", "The Burrow", "+44 7911 654321", harry.uuid, harry.userName)
        await createContact("Harry", "Potter", "longlivehedwig@email.com", "4 Privet Drive", "+44 7911 432165", hermione.uuid, hermione.userName)
        await createContact("Harry", "Potter", "longlivehedwig@email.com", "4 Privet Drive", "+44 7911 432165", ron.uuid, ron.userName)
        await createContact("Hermione", "Granger", "hgranger@email.com", "123 Granger St", "+44 7911 123456", ron.uuid, ron.userName)
        await createContact("Hermione", "Granger", "hgranger@email.com", "123 Granger St", "+44 7911 123456", harry.uuid, harry.userName)
        await createContact("Ginny", "Weasley", "redandgold4life@email.com", "The Burrow", "+44 7911 654321", harry.uuid, harry.userName)
        await createContact("Ginny", "Weasley", "redandgold4life@email.com", "The Burrow", "+44 7911 654321", hermione.uuid, hermione.userName)
        await createContact("Stupid", "Sister", "redandgold4life@email.com", "The Burrow", "+44 7911 654321", ron.uuid, ron.userName)
        const hpGinny = await Contact.findOne({ where: { firstName: "Ginny", userId: harry.uuid } })
        const hRon = await Contact.findOne({ where: { firstName: "Ronald", userId: hermione.uuid } })
        const rHermione = await Contact.findOne({ where: { firstName: "Hermione", userId: ron.uuid } })
        await createCalEvent("cappuccinos with Ron", "2021-05-04 10:20:05.123", "study break", "Ronald", "Weasley", hRon.uuid, hermione.uuid, hermione.userName)
        await createCalEvent("date with Hermione", "2021-05-04 10:20:05.123", "supposedly studying", "Hermione", "Granger", rHermione.uuid, ron.uuid, ron.userName)
        await createCalEvent("quidditch practice", "2021-05-09 10:20:05.123", "must beat those slimy slytherins", null, null, null, harry.uuid, harry.userName)
        await createCalEvent("game debrief", "2021-05-10 10:20:05.123", "strategy planning", "Ginny", "Weasley", hpGinny.uuid, harry.uuid, harry.userName)
    }
}

module.exports = setSeed