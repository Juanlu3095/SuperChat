export interface chatMessage { // Se podría usar Omit para separar el objeto para frontend y para backend
    _id?: string,
    userId: string,
    username?: string,
    order: number,
    content: string,
    created_at: string,
    updated_at?: string
}