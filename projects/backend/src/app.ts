import express, { json, Router } from 'express'
import { MessageRouter } from './routes/MessageRouter.js'
import { MessageModelInterface } from './contracts/interfaces/MessageModel.js'

export const createApp = ({ messageModel }: { messageModel: MessageModelInterface }) => {
    const app = express() // App principal
    const api = Router() // Manejador de rutas
    
    app.use(json())
    
    app.disable('x-powered-by')
    
    api.use('/message', MessageRouter(messageModel))
    
    app.use('/api', api)

    return app
}

