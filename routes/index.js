const router = require('express').Router()
const User = require('../database/models/user.js')


/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/', (req, res) => {
    res.send('hi there')
})


// //create user
// /**
//  * This function comment is parsed by doctrine
//  * @route POST /users
//  * @group users - Operations about user
//  * @returns {object} 200 - Create new user
//  * @returns {Error}  default - Unexpected error
//  */
//  router.post('/users', (req, res) => {
//     User.sync().then(() => {
//         return User.create({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             recoveryEmail: req.body.recoveryEmail,
//             userName: req.body.userName,
//             password: req.body.password
//         })
//     }).then((user) => {
//         return res.json( user )
//     })
// })

    // const newUser = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     recoveryEmail: req.body.recoveryEmail,
    //     userName: req.body.userName,
    //     password: req.body.password
    // }



//get all users
/**
 * This function comment is parsed by doctrine
 * @route GET /users
 * @group users - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/users', (req, res) => {
    const users = User.findAll().then(users => {
        return res.json(users)
    })
})

module.exports = router