import Task from "../../models/task.js"

async function deleteTasks (req, res) {
    try {
        await Task.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({ message: "Success to delete!" })
    } catch (error) {
        return res.status(500).json({ message: 'Error to delete the task!' })
    }
}

export default deleteTasks