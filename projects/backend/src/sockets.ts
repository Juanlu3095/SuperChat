import { createServer } from 'node:http'
import { Server } from "socket.io"
import { ACCEPTED_ORIGINS } from './config/cors.js'
import { ChatmessageController } from './controllers/ChatMessageController.js'
import { applySession } from './middlewares/session.js'

// https://d2ymvn.medium.com/building-a-real-time-chat-application-with-express-typescript-socket-io-next-js-and-tailwindcss-774f1ee6c9e2
export const createServerWithSockets = (app: Express.Application, chatMessageModel: any) => {
    const server = createServer(app)

    const io = new Server(server, {
      connectionStateRecovery: {},
      cors: { origin: ACCEPTED_ORIGINS(), credentials: true } // Muy importante las credenciales para que se comparta sesión entre Socket.io y Express
    })

    io.engine.use(applySession)

    const chatMessageController = new ChatmessageController(chatMessageModel)

    io.on('connection', async (socket) => {
        console.log("Usuario conectado: " + socket.id)
        const dataSocket = await socket.request.session.id // Tipar esto!!
        console.log('Socket: ', dataSocket)
    
        socket.on('message', (msg) => {
            console.log('Received message:', msg);
            const result = chatMessageController.create(msg)
            if (!result) return;
            io.emit('message', msg); // Broadcasting message to all clients
        });
    
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    })

    return server
}