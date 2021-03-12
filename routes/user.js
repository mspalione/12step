const router = require('express').Router()
const User = require('../database/models/user.js')

//get all users
/**
 * This function comment is parsed by doctrine
 * @route GET /users
 * @group users - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/users', (req, res) => {
    const users = User.findAll()
    return res.json(users)
})

//get one user
/**
 * This function comment is parsed by doctrine
 * @route GET /users
 * @group users - Operations about user
 * @param {integer} id.query.required - the id of the user to return
 * @returns {object} 200 - One user's info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/users/:id', (req, res) => {
    const users = User.findOne({ where: { id } })
    return res.json(users)
})

//create user
/**
 * This function comment is parsed by doctrine
 * @route POST /users
 * @group users - Operations about user
 * @returns {object} 200 - Create new user
 * @returns {Error}  default - Unexpected error
 */
 router.post('/users', (req, res) => {
    const newUser = User.create({
        firstName: "Melissa",
    lastName: "S",
    recoveryEmail: "recover@email.com",
    userName: "melS",
    password: "thisismypassword"
        // firstName: req.body.firstName,
        // lastName: req.body.lastName,
        // recoveryEmail: req.body.recoveryEmail,
        // userName: req.body.userName,
        // password: req.body.password
    })
    return res.json( newUser )
})

module.exports = router