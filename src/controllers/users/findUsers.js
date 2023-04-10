import User from "../../models/user.js"

async function createUsers (req, res) {
    try {
        const AllUsers = await User.findAll()

        res.json(AllUsers)
    } catch (error) {
        return res.status(500).json({ message: 'Error getting users!' })
    }
}

export default createUsers