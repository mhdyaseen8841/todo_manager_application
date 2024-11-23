import express from 'express'
import { addTodo,getTodo,updateTodo,deleteTodo } from '../controllers/TodoControllers.js'
import protect from '../middleWare/userMiddleware.js'


const app = express.Router()

app.route('/').post(protect,addTodo)
app.route('/:id').put(protect,updateTodo).delete(protect,deleteTodo).get(protect,getTodo)

export default app