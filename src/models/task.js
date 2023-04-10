import { Sequelize } from "sequelize";
import connection from "../database/index.js";
import User from "./user.js";

const Task = connection.define('tasks',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER
    }
})

Task.belongsTo(User)

export default Task