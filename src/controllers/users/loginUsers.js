import User from "../../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

async function loginUsers(req, res) {
    try {
        const userInDatabase = await User.findOne({
            where: { cpf: req.body.cpf }
        })

        if (!userInDatabase) {
            return res.status(404).json({ message: "Incorrect credentials!" })
        }

        const passwordIsValid = await bcrypt.compare(req.body.password, userInDatabase.password)

        if (!passwordIsValid) {
            return res.status(404).json({ message: "Incorrect credentials!" })
        }

        const token = jwt.sign(
            {
                id: userInDatabase.id,
                name: userInDatabase.name
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        )

        res.status(200).json({ message: `Welcome ${userInDatabase.name}!`, token })
    } catch (error) {
        return res.status(500).json({ message: 'Error to login!' })
    }
}

export default loginUsers
