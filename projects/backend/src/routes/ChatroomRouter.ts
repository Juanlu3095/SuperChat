import { Router } from "express"
import { ChatroomController } from "../controllers/ChatroomController.js"

export const ChatroomRouter = (chatroomModel: any) => {
    const chatroomRouter = Router()

    const chatroomController = new ChatroomController(chatroomModel)

    chatroomRouter.get('/', chatroomController.getAll)
    
    chatroomRouter.get('/:id', chatroomController.getById)

    chatroomRouter.post('/', chatroomController.create)

    chatroomRouter.patch('/', chatroomController.patch)

    chatroomRouter.delete('/', chatroomController.delete)

    return chatroomRouter
}