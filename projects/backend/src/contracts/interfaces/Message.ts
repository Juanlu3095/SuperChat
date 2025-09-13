export interface message {
    id: string,
    nombre: string,
    apellidos: string,
    telefono: string,
    email: string,
    contenido: string
}

export type messageInput = Omit<message, 'id'>