import { Router } from "express"
import { AuthController } from "../controllers/AuthController.js"

export const AuthRouter = (userModel: any) => {
    const authRouter = Router()

    const authController = new AuthController(userModel)

    authRouter.post('/register', authController.register)

    authRouter.post('/login', authController.login)

    return authRouter
}