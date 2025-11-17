import { Router } from "express"
import { ChatmessageController } from "../controllers/ChatMessageController.js"

export const ChatmessageRouter = (chatmessageModel: any) => {
    const chatmessageRouter = Router()

    const chatmessageController = new ChatmessageController(chatmessageModel)

    chatmessageRouter.get('/', chatmessageController.getAll)

    return chatmessageRouter
}