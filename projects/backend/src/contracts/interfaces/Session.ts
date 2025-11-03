import { ObjectId } from "mongodb";

export interface SessionMongodb {
    _id: string,
    expires: Date,
    session: string, // Objeto JSON con la info de la cookie y la id del user de la sesión
    userId?: ObjectId
}