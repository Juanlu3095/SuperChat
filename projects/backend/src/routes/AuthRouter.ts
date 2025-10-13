import { Router } from "express"
import { AuthController } from "../controllers/AuthController.js"
import { UserModelInterface } from "src/contracts/interfaces/UserModel.js"

export const AuthRouter = (userModel: UserModelInterface, sessionModel: any) => {
    const authRouter = Router()

    const authController = new AuthController(userModel, sessionModel)

    authRouter.post('/register', authController.register)

    authRouter.post('/login', authController.login)

    authRouter.get('/login', authController.getLogin)

    authRouter.post('/logout', authController.logout)

    return authRouter
}