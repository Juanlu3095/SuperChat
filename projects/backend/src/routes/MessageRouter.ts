import { Router } from "express"
import { MessageController } from "../controllers/MessageController.js"
import { MessageModelInterface } from "../contracts/interfaces/MessageModel.js"

export const MessageRouter = (messageModel: MessageModelInterface) => {
    const messageRouter = Router()

    const messageController = new MessageController(messageModel)

    messageRouter.get('/', messageController.getAll)

    messageRouter.get('/:id', messageController.getById)

    messageRouter.post('/', messageController.create)

    messageRouter.patch('/:id', messageController.update)

    messageRouter.delete('/:id', messageController.delete)

    messageRouter.delete('/', messageController.deleteSelection)

    return messageRouter
}