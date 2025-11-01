import { createServer } from 'node:http'
import { Server } from "socket.io"
import { ACCEPTED_ORIGINS } from './config/cors.js'

// https://d2ymvn.medium.com/building-a-real-time-chat-application-with-express-typescript-socket-io-next-js-and-tailwindcss-774f1ee6c9e2
export const createServerWithSockets = (app: Express.Application) => {
    const server = createServer(app)

    const io = new Server(server, {
      connectionStateRecovery: {},
      cors: { origin: ACCEPTED_ORIGINS()} // Cambiar esto y quitar de app.ts y ver si funciona.
    })
    
    io.on('connection', (socket) => {
        console.log("Usuario conectado: " + socket.id)
    
        socket.on('message', (msg) => {
            console.log('Received message:', msg);
            io.emit('message', msg); // Broadcasting message to all clients
        });
    
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    })

    return server
}