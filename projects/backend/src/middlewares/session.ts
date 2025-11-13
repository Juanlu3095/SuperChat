import session from 'express-session'
import MongoStore from 'connect-mongo'

const { DB_PASS, DB_USER, DB_NAME, SESSION_SECRET_KEY } = process.env

export const applySession = 
    session({ // middleware para sesiones
        name: 'sc-session',
        secret: SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false, // Si la request no es modificada, no se guarda. Por eso en AuthController.login hay que añadir user a req.session
        cookie: { // Esto es lo que se guardará en base de datos. Debería crearse un .ts con las opciones de las cookies para ponerlo aquí y en AuthController
            secure: false, // Esto debe ser false en desarrollo
            httpOnly: true,
            sameSite: 'lax', // lax si es localhost, none para https
            maxAge: 86400000, // tiempo de vida de la cookie, esto tiene prioridad sobre ttl en Mongo Store
        },
        store: new MongoStore({
            dbName: DB_NAME,
            collectionName: 'sessions',
            ttl: 60, // La sesión en MONGODB se elimina en 60 segundos
            mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.j9ccw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        })
    })