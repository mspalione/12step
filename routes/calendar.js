const router = require('express').Router()
const Calendar = require('../database/models/calendar.js')
const User = require('../database/models/user.js')
const validate = require('./validations/calendarValidation')

//READ

//get all calendar events 
/**
 * This function comment is parsed by doctrine
 * @route GET /calendar
 * @group calendar - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/', async (req, res) => {
    try {
       const calendar = await Calendar.findAll()
       return calendar ? res.json(calendar) : res.status(404).json('All calendar events could not be found.')
    } catch (error) {
        res.status(400).json(`There was an error finding all calendar events: ${error}`)
    }
})

//get all calendar events for specified user
/**
 * This function comment is parsed by doctrine
 * @route GET /calendar
 * @group calendar - Operations about user
 * @param {integer} userId.query - the id of the user's calendar to return
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/:userId', async (req, res) => {
     try {
        const user = await User.findOne({ where: { id: req.params.userId } })
        const calendar = await Calendar.findAll({ where: { userId: user.uuid } })
        return calendar ? res.json(calendar) : res.status(404).json('Your calendar could not be found.')
     } catch (error) {
        res.status(400).json(`There was an error finding your calendar: ${error}`)
     }
})

//get one calendar event for specified user
/**
 * This function comment is parsed by doctrine
 * @route GET /calendar
 * @group calendar - Operations about calendar
 * @param {integer} userId.query - the id of the user's calendar to return
 * @param {integer} eventId.query - the id of the calendar event to return
 * @returns {object} 200 - One calendar event's info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/:userId/:eventId', async (req, res) => {
     try {
        const user = await User.findOne({ where: { id: req.params.userId } })
        const calendar = await Calendar.findOne({ where: { id: req.params.eventId, userId: user.uuid } })
        
        return calendar ? res.json(calendar) : res.status(404).json('Calendar event not found.')
    } catch (error) {
        res.status(400).json(`There was an error finding this calendar event: ${error}`)
    }
})

//CREATE

//create calendar event
/**
 * This function comment is parsed by doctrine
 * @route POST /calendar
 * @group calendar - Operations about calendar
 * @returns {object} 200 - Create a new calendar event
 * @returns {Error}  default - Unexpected error
 */
 router.post('/', async (req, res) => {
     try {
        const user = await validate.findUser(req.body.userName)
        const contact = await validate.findContact(user, req.body.contactFirstName, req.body.contactLastName)
        const validEvent = await validate.create(req.body, user.uuid, contact.uuid, contact.firstName, contact.lastName)
        const cal = await Calendar.create(validEvent)

        return res.json( cal )  
     } catch (error) {
         res.status(400).json(`There was an error creating this calendar event: ${error.message}`)
     }
})

//UPDATE

//update calendar event
/**
 * This function comment is parsed by doctrine
 * @route PUT /calendar
 * @group calendar - Operations about calendar
 * @param {integer} eventId.query - the id of the calendar event to return
 * @returns {object} 200 - Update a calendar event
 * @returns {Error}  default - Unexpected error
 */
 router.put('/:eventId', async (req, res) => {
    try {
       const event = await Calendar.findOne({ where: { id: req.params.eventId } })
       if(!event) throw 'No such calendar event found.'

       const cal = await event.update({
           eventTitle: req.body.eventTitle ? req.body.eventTitle : event.eventTitle,
           dateAndTime: req.body.dateAndTime ? req.body.dateAndTime : event.dateAndTime,
           eventSummary: req.body.eventSummary ? req.body.eventSummary : event.eventSummary,
           contactFirstName: req.body.contactFirstName ? req.body.contactFirstName : event.contactFirstName,
           contactLastName: req.body.contactLastName ? req.body.contactLastName : event.contactLastName
       })
   
       return res.json( cal )  
    } catch (error) {
       res.status(400).json(`There was an error updating this calendar event: ${error}`)
    }
})

//DELETE

//delete one calendar event
/**
 * This function comment is parsed by doctrine
 * @route DELETE /calendar
 * @group calendar - Operations about contact
 * @param {integer} eventId.query - the id of the calendar event to delete
 * @returns {object} 200 - Calendar event deleted
 * @returns {Error}  default - Unexpected error
 */
 router.delete('/:eventId', async (req, res) => {
     try {
         const calEvent = await Calendar.findOne({ where: { id: req.params.eventId } })
         if(!calEvent) res.json('No such calendar event exists.')
         
         const calTitle = calEvent.eventTitle
         await calEvent.destroy()

         return res.json(`The calendar event ${calTitle} has been successfully deleted.`)
     } catch (error) {
        res.status(400).json(`There was an error deleting this contact: ${error}`)
     }
})

module.exports = router