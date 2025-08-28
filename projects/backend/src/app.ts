import express, { json, Router } from 'express'
import { MessageRouter } from './routes/MessageRouter.js'

const app = express() // App principal
const api = Router() // Manejador de rutas

app.use(json())

app.disable('x-powered-by')

api.use('/message', MessageRouter())

app.use('/api', api)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})
