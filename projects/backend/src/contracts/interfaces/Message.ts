import { ObjectId } from "mongodb"

export interface message {
    _id: ObjectId,
    nombre: string,
    apellidos: string,
    telefono: string,
    email: string,
    contenido: string,
    created_at: Date,
    updated_at: Date
}

export type messageInput = Omit<message, 'id'|'created_at'|'updated_at'>