const jwt = require('jsonwebtoken')

//verify token
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization
    if (authToken) {
        const token = authToken.split(' ')[1]
        try {
            const decodedPaylod = jwt.verify(token, process.env.JWT_SECTET)
            req.user = decodedPaylod
            next()
        } catch (error) {
            return res.status(401).json({ message: 'invalid token, access denid!' })
        }
    } else {
        return res.status(401).json({ message: 'no token provided, access denid!' })
    }
}

function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {

            return res.status(403).json({ message: "not allowed, only admin" })
        }
    })
}
module.exports = {
    verifyToken,
    verifyTokenAndAdmin
}