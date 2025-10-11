import { Request, Response } from "express"
import { MessageModelInterface } from "../contracts/interfaces/MessageModel.js"
import { validateMessage } from "../schemas/MessageSchema.js"

export class MessageController {
    private messageModel: MessageModelInterface

    public constructor (messageModel: MessageModelInterface) {
        this.messageModel = messageModel
    }

    getAll = async (_req: Request, res: Response) => {
        const messages = await this.messageModel.getAll()
        return res.json({ message: 'Mensajes encontrados.', data: messages})
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(422).json({ message: 'No se ha proveído de un identificador para el mensaje.' })
        
        const message = await this.messageModel.getById(id)
        if (!message) return res.status(404).json({ message: 'Mensaje no encontrado.' })
        return res.json({ message: 'Mensaje encontrado.', data: message })
    }

    create = async (req: Request, res: Response) => {
        const input = validateMessage(req.body)

        if (!input.success) {
            return res.status(422).json({ message: 'Mensaje no válido.', error: input.errors })
        }

        const result = await this.messageModel.create(input.data)
        if(result) {
            return res.status(201).json({ message: 'Mensaje enviado.' })
        } else {
            return res.status(500).json({ message: 'Mensaje no enviado.' })
        }
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(422).json({ message: 'No se ha proveído de un identificador para el mensaje.' })
        
        const input = validateMessage(req.body)
        if (!input.success) return res.status(422).json({ message: 'Mensaje no válido', error: input.errors })

        const result = await this.messageModel.patch({ id, messageInput: input.data })
        if (result?.found !== 0 && result?.result !== 0) {
            return res.json({ message: 'Mensaje actualizado.' })
        } else if (result.found === 0){
            return res.status(404).json({ message: 'Mensaje no encontrado.'})
        } else {
            return res.status(500).json({ message: 'Ha ocurrido un error.' })
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id) return res.status(422).json({ message: 'No se ha proveído de un identificador para el mensaje.' })

        const result = await this.messageModel.delete(id)
        if (result === 0) return res.status(404).json({ message: 'Mensaje no encontrado. '})
        return res.json({ message: 'Mensaje eliminado.' })
    }

    deleteSelection = async (req: Request, res: Response) => {
        const { ids }: { ids: string[] } = req.body
        if (!ids) return res.status(422).json({ message: 'No se ha proveído de los identificadores para los mensajes.' })
        
        const result = await this.messageModel.deleteSelection(ids)
        if (ids.length !== result) return res.status(404).json({ message: 'No se han encontrado todos los mensajes '})
        return res.json({ message: 'Mensajes eliminados.' })
    }
}