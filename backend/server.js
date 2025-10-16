import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoute.js'
import recipeRouter from './routes/recipeRoute.js'
import connectCloudinary from './config/cloudinary.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

// Middlewares
app.use(cors({
  origin: ["https://foodrecipeblog.vercel.app"], // frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json())

connectDB()
connectCloudinary()


app.use('/api/user',userRouter)
app.use('/api/recipe',recipeRouter)

// Test Route
app.get('/', (req, res) => {
  res.send('API WORKING ✅')
})

// Server Listening
app.listen(port, () => {
  console.log(`🚀 Server started at http://localhost:${port}`)
})
