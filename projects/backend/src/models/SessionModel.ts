import { OptionalId } from "mongodb"
import { Connection } from "../database/connection.js"

const { DB_NAME, DB_USER, DB_PASS } = process.env

async function sessionCollection() {
    try {
        const connection = new Connection(DB_USER, DB_PASS, DB_NAME)
        const db = await connection.connection()
        if (!db) return null
        return db.collection<OptionalId<any>>('sessions') // OptionalId hace opcional _id para operaciones insert en mongodb
        
    } catch (error) {
        console.error(error)
    }
}

export class SessionModel {
    getById = async (id: string) => {
        try {
            const collection = await sessionCollection()
            const query = { _id: id } // Las ids de MongoDB son tratadas como objetos
            const session = await collection.findOne(query)
            return session
        
        } catch (error) {
            console.error(error)
            return null
        }
    }
}