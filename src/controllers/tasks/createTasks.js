import Task from "../../models/task.js"

async function createTask (req, res) {
    try {
        const userTask = {
            name: req.body.name,
            description: req.body.description,
            user_id: req.body.userId
        }

        if (!userTask.name || !userTask.description) {
            return res.status(400).json({ message: 'Task/description not found!' })
        }

        const taskInDatabase = await Task.findOne({
            where: { name: userTask.name }
        })

        if (taskInDatabase) {
            return res.status(400).json({ message: 'Task already exist in database!' })
        }

        const newTask = await Task.create(userTask)

        res.status(201).json(newTask)
    } catch (error) {
        return res.status(500).json({ message: 'Error creating task!' })
    }
}

export default createTask