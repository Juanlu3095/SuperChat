import { Request, Response } from "express"

export class ChatroomController {
    private chatroomModel: any
    
    public constructor (chatroomModel: any) {
        this.chatroomModel = chatroomModel
    }

    /**
     * Get all chatrooms with filter if needed, mostly to get the ones client participates in.
     */
    getAll = async (req: Request, res: Response) => {
        const { userId } = req.query
        const chatrooms = await this.chatroomModel.getAll({ userId })
        return res.json({ message: 'Salas de chat encontradas.', data: chatrooms })
    }

    getById = async (req: Request, res: Response) => {

    }

    create = async (req: Request, res: Response) => {

    }

    patch = async (req: Request, res: Response) => {

    }

    delete = async (req: Request, res: Response) => {

    }
}