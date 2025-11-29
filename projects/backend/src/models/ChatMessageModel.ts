import { ObjectId, OptionalId } from "mongodb"
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

    getAll = async (idRoom?: string) => {
        try {
            const collection = await chatMessageCollection()
            let result = await collection.aggregate([
                {
                    $match: {
                        chatroom: new ObjectId(`${idRoom}`)
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "username"
                    },
                },
                { $project: {  // Aquí indicamos qué campos debe mostrar (1) y cuáles no (0 ó no incluir)
                    username: "$username.nombre", // Hacemos que devuelve directamente el string y no el JSON
                    content: 1,
                    created_at: 1,
                    order: 1,
                    userId: 1
                } },
                { $unwind: "$username" }
            ]).toArray()
            return result.length === 0 ? [] : result
        } catch (error) {
            console.error(error)
            return null
        }
    }

    /**
     * It allows to get all documents ordered by a parameter and optionally to limit the number of results.
     * @param { string, number } 
     * @returns 
     */
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
            // const countDocuments = await this.filter({ filter: 'order', limit: 1 }) || null // Obtenemos el documento de la colección con mayor 'order'
            const chatMessage = {
                userId: new ObjectId(`${chatmessageInput.userId}`), // chatmessageInput.userId,
                content: chatmessageInput.content,
                chatroom: new ObjectId(`${chatmessageInput.chatroom}`),
                order: chatmessageInput.order ?? 1,
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