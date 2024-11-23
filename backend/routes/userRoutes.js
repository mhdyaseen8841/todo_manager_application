import express from 'express'
import { addUserDetails,userLogin } from '../controllers/userControllers.js'

const app = express.Router()
app.route('/').post(addUserDetails)
app.route('/login').post(userLogin)

export default app
