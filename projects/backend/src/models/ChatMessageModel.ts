import { OptionalId } from "mongodb"
import { Connection } from "../database/connection.js"

const { DB_NAME, DB_USER, DB_PASS } = process.env

async function chatMessageCollection() {
    try {
        const connection = new Connection(DB_USER, DB_PASS, DB_NAME)
        const db = await connection.connection()
        if (!db) return null
        return db.collection<OptionalId<any>>('chatmessages') // OptionalId hace opcional _id para operaciones insert en mongodb
        
    } catch (error) {
        console.error(error)
    }
}

export class ChatmessageModel {
    create = async (chatmessageInput: any) => {
        try {
            const collection = await chatMessageCollection()
            const chatMessage = {
                ...chatmessageInput,
                created_at: new Date().toLocaleDateString(),
                updated_at: new Date().toLocaleDateString()
            }
            const query = await collection.insertOne(chatMessage)
            return query.acknowledged
        } catch (error) {
            console.error(error)
            return null
        }
    }
}