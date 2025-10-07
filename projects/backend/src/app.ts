import express, { json, Router } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { applycors } from './middlewares/cors.js'
import { MessageRouter } from './routes/MessageRouter.js'
import { MessageModelInterface } from './contracts/interfaces/MessageModel.js'
import { AuthRouter } from './routes/AuthRouter.js'

export const createApp = ({ messageModel, userModel }: { messageModel: MessageModelInterface, userModel: any }) => {
    const app = express() // App principal
    const api = Router() // Manejador de rutas
    
    app.disable('x-powered-by')
    
    app.use(applycors())

    app.use(json())

    const { DB_PASS, DB_USER, SESSION_SECRET_KEY } = process.env

    app.use(session({
        secret: SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            collectionName: 'sessions',
            ttl: 60,
            mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.j9ccw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        })
    }))
    
    api.use('/message', MessageRouter(messageModel))
    api.use('/auth', AuthRouter(userModel))
    
    app.use('/api', api)

    return app
}

