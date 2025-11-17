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

    getAll = async () => {
        try {
            const collection = await chatMessageCollection()
            let result = await collection.find().toArray()
            return result
        } catch (error) {
            console.error(error)
            return null
        }
    }

    filter = async ({ filter, limit } : { filter: string, limit?: number }) => {
        try {
            const collection = await chatMessageCollection()
            let result = await collection.find().sort({ [filter]: -1 })

            if (limit) {
                result = result.limit(limit)
            }
            
            const documents = await result.toArray()
            return documents.length === 0 ? null : documents
        } catch (error) {
            console.error(error)
            return null
        }
    }

    create = async (chatmessageInput: any) => {
        try {
            const collection = await chatMessageCollection()
            const countDocuments = await this.filter({ filter: 'order', limit: 1 }) || null // Obtenemos el documento de la colección con mayor 'order'
            const date = new Date()
            const chatMessage = {
                userId: chatmessageInput.userId,
                username: chatmessageInput.username,
                content: chatmessageInput.content,
                order: countDocuments ? countDocuments[0].order + 1 : 1,
                created_at: chatmessageInput.created_at,
                updated_at: chatmessageInput.created_at
            }
            const query = await collection.insertOne(chatMessage)
            return query.acknowledged
        } catch (error) {
            console.error(error)
            return null
        }
    }
}