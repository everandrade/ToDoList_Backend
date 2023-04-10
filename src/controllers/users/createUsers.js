import User from "../../models/user.js"
import bcrypt from "bcrypt"

async function createUsers (req, res) {
    try {

        const hash = await bcrypt.hash(req.body.password, 10)

        const newUser = {
            name: req.body.name,
            cpf: req.body.cpf,
            password: hash
        }

        if (!newUser.name || !newUser.cpf || !newUser.password) {
            return res.status(400).json({ message: 'Name, CPF or Password not found!' })
        }

        const userInDatabase = await User.findOne({
            where: { name: newUser.name }
        })

        if (userInDatabase) {
            return res.status(409).json({ message: 'User already exist in database!' })
        }

        const { name, cpf } = await User.create(newUser)

        res.status(201).json({ name, cpf })
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user!' })
        console.log(error);
    }
}

export default createUsers