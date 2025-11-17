export interface chatMessage {
    _id?: string,
    userId: string,
    username?: string,
    order?: number,
    content: string,
    created_at: string,
    updated_at?: string
}