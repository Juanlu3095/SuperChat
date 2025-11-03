import { Document } from "mongodb";
import { SessionMongodb } from "./Session.js";

export interface SessionModelInterface {
    getById: (id: string) => Promise<SessionMongodb | null> // Falta crear el tipado para Session
    getUser: (sessionId: string) => Promise<Document[] | null>
    patch: (sessionId: string, userId: string) => Promise<any | null>
}