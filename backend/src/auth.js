const jwt = require('jsonwebtoken')
const {promisify} = require('util')

validate = async (req, res, next) => {
    const { authorization} = req.headers

    if(!authorization) {
        return res.sendStatus(401)
    }

    const [, token] = authorization.split(' ')

    try {
        await promisify(jwt.promisify)(token, 'PRIVATEKEY')

        return next()
    } catch (err) {
        return res.sendStatus(401)
    }
}

module.exports = validate