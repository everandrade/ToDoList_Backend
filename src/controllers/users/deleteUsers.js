import User from "../../models/user.js"

async function deleteUsers (req, res) {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({ message: "Success to delete!" })
    } catch (error) {
        return res.status(500).json({ message: 'Error to delete the user!' })
    }
}

export default deleteUsers