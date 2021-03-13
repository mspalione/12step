const router = require('express').Router()
const Calendar = require('../database/models/calendar.js')
const Contact = require('../database/models/contact.js')

//get all users
/**
 * This function comment is parsed by doctrine
 * @route GET /users
 * @group users - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/', (req, res) => {
    Calendar.findAll().then((calendar) => {
        return res.json(calendar)
    })
    
})

//get one user
/**
 * This function comment is parsed by doctrine
 * @route GET /calendar
 * @group calendar - Operations about calendar
 * @param {integer} id.query.required - the id of the user to return
 * @returns {object} 200 - One user's info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/:id', (req, res) => {
    Calendar.findOne({ where: { id } }).then(calendar => {
        return res.json(calendar)
    })
})

//create user
/**
 * This function comment is parsed by doctrine
 * @route POST /calendar
 * @group calendar - Operations about calendar
 * @returns {object} 200 - Create new calendar
 * @returns {Error}  default - Unexpected error
 */
 router.post('/', (req, res) => {
    const contact = Contact.findOne({
        where: {firstName: req.body.contactFirstName}
    }).then(contact => {
        const newCalendar = Calendar.create({
            eventTitle: req.body.eventTitle,
            dateAndTime: req.body.dateAndTime,
            eventSummary: req.body.eventSummary,
            contactFirstName: req.body.contactFirstName,
            contactLastName: req.body.contactLastName,
            contact: contact
    }).then((calendar) => {
        return res.json( calendar )
    })  
})})

module.exports = router