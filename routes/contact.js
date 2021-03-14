const router = require('express').Router()
const Contact = require('../database/models/contact.js')

//get all contact
/**
 * This function comment is parsed by doctrine
 * @route GET /contacts
 * @group contacts - Operations about contact
 * @returns {object} 200 - An array of contact info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/', (req, res) => {
    Contact.findAll().then((contacts) => {
        return res.json(contacts)
    })
})

//get one contact
/**
 * This function comment is parsed by doctrine
 * @route GET /contacts
 * @group contacts - Operations about contact
 * @param {integer} id.query.required - the id of the contact to return
 * @returns {object} 200 - One contact's info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/:id', (req, res) => {
    Contact.findOne({ where: { id } }).then(contact => {
        return res.json(contact)
    })
})

//create contact
/**
 * This function comment is parsed by doctrine
 * @route POST /contacts
 * @group contacts - Operations about contact
 * @returns {object} 200 - Create new contact
 * @returns {Error}  default - Unexpected error
 */
 router.post('/', (req, res) => {
    const newContact = Contact.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }).then((contact) => {
        return res.json( contact )
    })
    
})

module.exports = router