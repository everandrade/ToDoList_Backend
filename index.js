import express from "express"
import connection from "./src/database/index.js"
import log from "./src/middlewares/log.js"
import validateNewUser from "./src/middlewares/validate-new-user.js"
import validateToken from "./src/middlewares/validate-token.js"
import createTask from './src/controllers/tasks/createTasks.js'
import findTasks from './src/controllers/tasks/findTasks.js'
import updateTasks from './src/controllers/tasks/updateTasks.js'
import deleteTasks from './src/controllers/tasks/deleteTasks.js'
import findUsers from './src/controllers/users/findUsers.js'
import createUsers from './src/controllers/users/createUsers.js'
import deleteUsers from './src/controllers/users/deleteUsers.js'
import loginUsers from './src/controllers/users/loginUsers.js'

const app = express()
app.use(express.json())
app.use(log)

connection.authenticate()
connection.sync({ alter: true })
console.log('Connection has been established successfully.')

app.get('/tasks', validateToken, findTasks)
app.post('/tasks', validateToken, createTask)
app.put('/tasks/:id', validateToken, updateTasks)
app.delete('/tasks/:id', validateToken, deleteTasks)

app.get('/users', findUsers)
app.post('/users', validateNewUser, createUsers)
app.delete('/users/:id', deleteUsers)
app.post('/users/login', loginUsers)

app.listen(3333, () => console.log('Listening on port 3333!'))