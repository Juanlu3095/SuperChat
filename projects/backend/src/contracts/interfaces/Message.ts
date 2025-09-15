import { ObjectId } from "mongodb"

export interface message {
    _id: ObjectId,
    nombre: string,
    apellidos: string,
    telefono: string,
    email: string,
    contenido: string
}

export type messageInput = Omit<message, 'id'>