import express, { json, Router } from 'express'
import cors from 'cors'
import { MessageRouter } from './routes/MessageRouter.js'
import { MessageModelInterface } from './contracts/interfaces/MessageModel.js'

export const createApp = ({ messageModel }: { messageModel: MessageModelInterface }) => {
    const app = express() // App principal
    const api = Router() // Manejador de rutas

    var corsOptions = {
        origin: ['http://localhost:4200', 'http://localhost:4000'],
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    
    app.use(cors(corsOptions))

    app.use(json())
    
    app.disable('x-powered-by')
    
    api.use('/message', MessageRouter(messageModel))
    
    app.use('/api', api)

    return app
}

