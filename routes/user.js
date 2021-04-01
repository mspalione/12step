const router = require('express').Router()
const User = require('../database/models/user.js')
const validate = require('./validations/userValidation')

//READ

//get all users
/**
 * This function comment is parsed by doctrine
 * @route GET /users
 * @group users - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/', async (req, res) => {
     try {
         const users = await User.findAll()
         return users ? res.json(users) : res.status(404).json('Users not found')
     } catch (error) {
        res.status(400).json(`There was an error finding all users: ${error}`)
     }
})

//get one user
/**
 * This function comment is parsed by doctrine
 * @route GET /users
 * @group users - Operations about user
 * @param {integer} id.query - the id of the user to return
 * @returns {object} 200 - One user's info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/:id', async (req, res) => {
     try {
         const user = await User.findOne({ where: { id: req.params.id } })
         return user ? res.json(user) : res.status(404).json('User not found')
     } catch (error) {
        res.status(400).json(`There was an error finding this user: ${error}`)
     }
})

//CREATE

//create user
/**
 * This function comment is parsed by doctrine
 * @route POST /users
 * @group users - Operations about user
 * @returns {object} 200 - Create new user
 * @returns {Error}  default - Unexpected error
 */
 router.post('/', async (req, res) => {
     try {
        const user = validate.create(req.body)
        const newUser = await User.create(user)
        // {
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     recoveryEmail: req.body.recoveryEmail,
        //     userName: req.body.userName,
        //     password: req.body.password
        // }
        return res.json( newUser )
     } catch (error) {
        res.status(400).json(`There was an error creating this user: ${error.message}`)
     }
})

//UPDATE

//update USER
/**
 * This function comment is parsed by doctrine
 * @route PUT /users
 * @group users - Operations about user
 * @param {integer} id.query - the id of the user to update
 * @returns {object} 200 - Update a user 
 * @returns {Error}  default - Unexpected error
 */
 router.put('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } })
        if(!user) return res.status(400).json('No such user found.')
        
        const updatedUser = await user.update({
            firstName: req.body.firstName ? req.body.firstName : user.firstName,
            lastName: req.body.lastName ? req.body.lastName : user.lastName,
            recoveryEmail: req.body.recoveryEmail ? req.body.recoveryEmail : user.recoveryEmail,
            userName: req.body.userName ? req.body.userName : user.userName,
            password: req.body.password ? req.body.password : user.password
        })
   
       return res.json( updatedUser )  
    } catch (error) {
       res.status(400).json(`There was an error updating this user: ${error}`)
    }
})

//DELETE

//delete one user
/**
 * This function comment is parsed by doctrine
 * @route DELETE /users
 * @group users - Operations about user
 * @param {integer} id.query - the id of the user to delete
 * @returns {object} 200 - delete One user
 * @returns {Error}  default - Unexpected error
 */
 router.delete('/:id', async (req, res) => {
     try {
         const user = await User.findOne({ where: { id: req.params.id } })
         if(!user) res.json('No such user exists.')
             
         const userName = user.firstName
         await user.destroy()

         return res.json(`The user ${userName} has been successfully deleted.`)
     } catch (error) {
        res.status(400).json(`There was an error deleting this user: ${error}`)
     }
})

module.exports = router