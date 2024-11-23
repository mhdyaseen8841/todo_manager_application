import express from 'express'
import connectDB from './config/connection.js';
import cors from 'cors'; 
import 'dotenv/config'
import projectRoutes from './routes/projectRoutes.js'
import TodoRoutes from './routes/TodoRoutes.js'
import userRoutes from './routes/userRoutes.js'
const app = express();
app.use(express.json())


const whitelist = ['http://localhost:3001', 'http://localhost:3000','*']; 
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions)); 


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});
app.use('/api/v1/project',projectRoutes)
app.use('/api/v1/todo',TodoRoutes)
app.use('/api/v1/user',userRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

connectDB()