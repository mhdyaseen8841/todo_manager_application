import express from 'express'
import { addProject,updateProject,deleteProject,getProjectDetails,getAllProjects,exportSummary } from '../controllers/projectControllers.js'
import protect from '../middleWare/userMiddleware.js'

const app = express.Router()

app.route('/').post(protect,addProject).get(protect,getAllProjects)
app.route('/:id').put(protect,updateProject).delete(protect,deleteProject).get(protect,getProjectDetails)
app.route('/export-summary').post(protect,exportSummary)
export default app