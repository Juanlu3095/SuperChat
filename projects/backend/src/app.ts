import express, { json, Router } from 'express'
import { applySession } from './middlewares/session.js'
import { applycors } from './middlewares/cors.js'
import { MessageRouter } from './routes/MessageRouter.js'
import { MessageModelInterface } from './contracts/interfaces/MessageModel.js'
import { AuthRouter } from './routes/AuthRouter.js'
import { UserModelInterface } from './contracts/interfaces/UserModel.js'

export const createApp = ({ messageModel, userModel, sessionModel }: { messageModel: MessageModelInterface, userModel: UserModelInterface, sessionModel: any }) => {
    const app = express() // App principal
    const api = Router() // Manejador de rutas
    
    app.disable('x-powered-by')
    
    app.use(applycors())

    app.use(json())

    app.use(applySession()) // Middleware de json() antes de Session para poder obtener los datos de las request y poder leerlos
        
    api.use('/message', MessageRouter(messageModel))
    api.use('/auth', AuthRouter(userModel, sessionModel))
    
    app.use('/api', api)

    return app
}

