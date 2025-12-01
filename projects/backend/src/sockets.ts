import { createServer } from 'node:http'
import { Server } from "socket.io"
import { ACCEPTED_ORIGINS } from './config/cors.js'
import { ChatmessageController } from './controllers/ChatMessageController.js'
import { applySession } from './middlewares/session.js'

// https://d2ymvn.medium.com/building-a-real-time-chat-application-with-express-typescript-socket-io-next-js-and-tailwindcss-774f1ee6c9e2
// https://medium.com/swlh/build-a-chat-room-with-node-js-and-socket-io-e3e43f49a02d PARA CHAT ROOM
// https://socket.io/docs/v4/rooms/ CHAT ROOM OFICIAL
export const createServerWithSockets = (app: Express.Application, chatMessageModel: any) => {
    const server = createServer(app)

    const io = new Server(server, {
      connectionStateRecovery: {},
      cors: { origin: ACCEPTED_ORIGINS(), credentials: true } // Muy importante las credenciales para que se comparta sesión entre Socket.io y Express
    })

    io.engine.use(applySession)

    const chatMessageController = new ChatmessageController(chatMessageModel)

    io.on('connection', (socket) => {
        console.log("Usuario conectado: " + socket.id)
        console.log("Auth: ", socket.handshake)
        const dataSocket = socket.request.sessionID
        console.log('Socket: ', dataSocket)

        socket.on('join', (room) => { // Nos unimos a la sala
            socket.join(room)
        })
    
        socket.on('message', (msg) => {
            console.log('Received message:', msg);
            const result = chatMessageController.create(msg)
            if (!result) return;
            io.to(msg.chatroom).emit('message', msg); // Broadcasting message to all clients
        });

        socket.on('leave', (room: string) => {
            socket.rooms.delete(room) // Esto hay que verlo bien porque queremos enviar el mensaje a una sóla sala pero queremos recibir notificaciones
        })
    
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    })

    return server
}