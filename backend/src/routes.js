const express = require('express')
const jwt = require('jsonwebtoken')

const authMiddleware = require('./auth')
const router = express.Router()

router.post('/authenticate', (req, res) =>{
    const user = {
        id: 1,
        name: "Admin",
    }

    return res.json({
        user,
        token: jwt.sign(user, 'PRIVATEKEY')
    })
})


router.use(authMiddleware)

router.get('/users', async (req, res)=> {
    return res.json([
        {
            id: 1,
            name: 'Admin'
        }
    ])
})

module.exports = router