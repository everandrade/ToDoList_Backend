import Task from "../../models/task.js"

async function findTasks (req, res) {
    try {
        const AllTasks = await Task.findAll({
            where: {
                user_id: req.body.userId
            }
        })

        res.json(AllTasks)
    } catch (error) {
        return res.status(500).json({ message: 'Error getting tasks!' })
    }
}

export default findTasks