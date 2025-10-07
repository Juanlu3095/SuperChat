import { ObjectId } from "mongodb"

export interface user {
    _id: ObjectId,
    nombre: string,
    email: string,
    password: string,
    created_at: string,
    updated_at: string
}

export type createUserInput = Omit<user, '_id'|'created_at'|'updated_at'>

export type loginUserInput = Pick<user, 'email'|'password'>