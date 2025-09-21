import { ObjectId } from "mongodb"

export interface message {
    _id: ObjectId,
    nombre: string,
    apellidos: string,
    telefono: string,
    email: string,
    contenido: string,
    created_at: string,
    updated_at: string
}

export type messageInput = Omit<message, 'id'|'created_at'|'updated_at'>