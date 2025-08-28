import { Router } from "express"

export const MessageRouter = () => {
    const messageRouter = Router()

    messageRouter.get('/', (req, res) => {
        res.send('Mensaje recibido')
    })

    return messageRouter
}