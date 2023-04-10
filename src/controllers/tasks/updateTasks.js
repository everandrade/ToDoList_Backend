import Task from "../../models/task.js"

async function updateTasks (req, res) {
    try {
        const taskInDB = await Task.findByPk(req.params.id)

        if (!taskInDB) {
            return res.status(404).json({ message: 'Task not found!' })
        }

        taskInDB.name = req.body.name || taskInDB.name
        taskInDB.description = req.body.description || taskInDB.description

        await taskInDB.save()

        res.status(200).json(taskInDB)
    } catch (error) {
        return res.status(500).json({ message: 'Error to update the task!' })
    }
}

export default updateTasks