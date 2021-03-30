const router = require('express').Router()
const Contact = require('../database/models/contact.js')
const User = require('../database/models/user.js')
const validate = require('./validations/contactValidation')

//READ

//get all contacts 
/**
 * This function comment is parsed by doctrine
 * @route GET /contacts
 * @group contacts - Operations about contact
 * @returns {object} 200 - An array of contact info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/', async (req, res) => {
     try {
        const contacts = await Contact.findAll()
        return contacts ? res.json(contacts) : res.status(404).json('Contacts not found')
     } catch (error) {
        res.status(400).json(`There was an error finding all contacts: ${error}`)
     }
})

//get all contacts for a specified user
/**
 * This function comment is parsed by doctrine
 * @route GET /contacts
 * @group contacts - Operations about contact
 * @param {integer} userId.query - the id of the user's contacts to return
 * @returns {object} 200 - An array of contact info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } })
        const contacts = await Contact.findAll({ where: { userId: user.uuid } })
        
        return contacts ? res.json(contacts) : res.status(404).json('Contacts not found')
    } catch (error) {
        res.status(400).json(`There was an error finding this user's contacts: ${error}`)
    }
})

//get one contact
/**
 * This function comment is parsed by doctrine
 * @route GET /contacts
 * @group contacts - Operations about contact
 * @param {integer} userId.query - the id of the user's contacts to return
 * @param {integer} contactId.query - the id of the contact to return
 * @returns {object} 200 - One contact's info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/:userId/:contactId', async (req, res) => {
     try {
         const user = await User.findOne({ where: { id: req.params.userId } })
         const contact = await Contact.findOne({ where: { id: req.params.contactId, userId: user.uuid } })
         
         return contact ? res.json(contact) : res.status(404).json('Contact not found')
     } catch (error) {
        res.status(400).json(`There was an error finding this contact: ${error}`)
     }
})

//CREATE

//create contact
/**
 * This function comment is parsed by doctrine
 * @route POST /contacts
 * @group contacts - Operations about contact
 * @returns {object} 200 - Create new contact
 * @returns {Error}  default - Unexpected error
 */
 router.post('/', async (req, res) => {
     try {
        const contact = await validate.create(req.body)

        return res.json( contact )
     } catch (error) {
        res.status(400).json(`There was an error creating this contact: ${error}`)
     }
})

//UPDATE

//update contact
/**
 * This function comment is parsed by doctrine
 * @route PUT /contacts
 * @group contacts - Operations about contact
 * @param {integer} id.query - the id of the contact to update
 * @returns {object} 200 - Update new contact
 * @returns {Error}  default - Unexpected error
 */
 router.put('/:id', async (req, res) => {
    try {
       const contact = await Contact.findOne({ where: { id: req.params.id } })
       if(!contact) return res.status(400).json('No such contact found.')
        
       const updatedContact = validate.update(req.body, contact)

       return res.json( updatedContact )
    } catch (error) {
       res.status(400).json(`There was an error updating this contact: ${error}`)
    }
})

//DELETE

//delete one contact
/**
 * This function comment is parsed by doctrine
 * @route DELETE /contacts
 * @group contacts - Operations about contact
 * @param {integer} contactId.query - the id of the contact to delete
 * @returns {object} 200 - Contact deleted
 * @returns {Error}  default - Unexpected error
 */
 router.delete('/:contactId', async (req, res) => {
     try {
         const contact = await Contact.findOne({ where: { id: req.params.contactId } })
         if(!contact) res.json('No such contact exists.')

         const contactName = contact.firstName
         await contact.destroy()

         return res.json(`The contact ${contactName} has been successfully deleted.`)
     } catch (error) {
        res.status(400).json(`There was an error deleting this contact: ${error}`)
     }
})

module.exports = router