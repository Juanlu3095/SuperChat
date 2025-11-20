import { Request, Response } from "express"

export class ChatmessageController {
    private chatMessageModel: any

    public constructor (chatMessageModel: any) {
        this.chatMessageModel = chatMessageModel
    }

    getAll = async (_req: Request, res: Response) => {
        const messages = await this.chatMessageModel.getAll()
        return res.json({ message: 'Mensajes del chat encontrados.', data: messages })
    }

    create = async (msg: any) => {

        // Primero obtener la id de la sesión y sobre ello obtener la id del usuario
        // Comprobar que la id del usuario exista que viene desde el sessionStorage de Angular

        const result = await this.chatMessageModel.create(msg)

        return result ? true : false
    } 
}