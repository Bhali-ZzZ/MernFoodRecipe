import express from 'express'
import { getUserData, login, register } from '../controllers/userController.js'
import { AuthUser } from '../middlewares/AuthUser.js'

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/data',AuthUser,getUserData)

export default userRouter