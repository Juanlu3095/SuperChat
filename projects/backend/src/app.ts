import express, { json, Router } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
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

    const { DB_PASS, DB_USER, DB_NAME, SESSION_SECRET_KEY } = process.env

    app.use(session({ // middleware para sesiones
        secret: SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { // Esto es lo que se guardará en base de datos. Debería crearse un .ts con las opciones de las cookies para ponerlo aquí y en AuthController
            secure: true,
            httpOnly: true,
            sameSite: 'none',
            maxAge: 86400000
        },
        store: new MongoStore({
            dbName: DB_NAME,
            collectionName: 'sessions',
            ttl: 60,
            mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.j9ccw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        })
    }))
    
    api.use('/message', MessageRouter(messageModel))
    api.use('/auth', AuthRouter(userModel, sessionModel))
    
    app.use('/api', api)

    return app
}

