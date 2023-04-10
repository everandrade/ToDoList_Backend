import jwt from 'jsonwebtoken'

const validateToken = (req, res, next) => {
    const token = req.headers.authorization

    if (!token || token === "Bearer") {
        return res.status(403).json({
            message: "Token is required!"
        })
    }

    const tokenJwt = token.slice(7)
    jwt.verify(tokenJwt, "CHAVE_SECRETA", (error, tokenContent) => {
        if (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(403).json({ message: "Expired token!" })
            } else if (error.name === "JsonWebTokenError") {
                return res.status(403).json({ message: "Invalid token!" })
            }
        } else {
            req.body.userId = tokenContent.id
            next()
        }
    })
}

export default validateToken