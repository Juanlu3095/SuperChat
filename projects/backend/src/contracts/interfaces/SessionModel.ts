import { SessionMongodb } from "./Session.js";

export interface SessionModelInterface {
    getById: (id: string) => Promise<SessionMongodb | null> // Falta crear el tipado para Session
}