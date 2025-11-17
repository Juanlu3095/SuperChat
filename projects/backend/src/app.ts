import express, { json, Router } from 'express'
import { applySession } from './middlewares/session.js'
import { applycors } from './middlewares/cors.js'
import { MessageRouter } from './routes/MessageRouter.js'
import { MessageModelInterface } from './contracts/interfaces/MessageModel.js'
import { AuthRouter } from './routes/AuthRouter.js'
import { UserModelInterface } from './contracts/interfaces/UserModel.js'
import { ChatmessageRouter } from './routes/ChatmessagesRouter.js'

export const createApp = ({ messageModel, userModel, sessionModel, chatmessageModel }: { messageModel: MessageModelInterface, userModel: UserModelInterface, sessionModel: any, chatmessageModel: any }) => {
    const app = express() // App principal, crea y devuelve instancia de Express.Application
    const api = Router() // Manejador de rutas
    
    app.disable('x-powered-by')
    
    app.use(applycors())

    app.use(json())

    app.use(applySession) // Middleware de json() antes de Session para poder obtener los datos de las request y poder leerlos
        
    api.use('/message', MessageRouter(messageModel))
    api.use('/chatmessage', ChatmessageRouter(chatmessageModel))
    api.use('/auth', AuthRouter(userModel, sessionModel))
    
    app.use('/api', api)

    return app
}

