import { Router } from "express"
import { AuthController } from "../controllers/AuthController.js"
import { UserModelInterface } from "src/contracts/interfaces/UserModel.js"

export const AuthRouter = (userModel: UserModelInterface) => {
    const authRouter = Router()

    const authController = new AuthController(userModel)

    authRouter.post('/register', authController.register)

    authRouter.post('/login', authController.login)

    return authRouter
}