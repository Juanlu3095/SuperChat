import { ObjectId } from "mongodb"
import { message, messageInput } from "../contracts/interfaces/Message.js"
import { MessageModelInterface } from "../contracts/interfaces/MessageModel.js"
import { Connection } from "../database/connection.js"

const { DB_NAME, DB_USER, DB_PASS } = process.env

const connection = new Connection(DB_USER, DB_PASS, DB_NAME)
// const db = await connection.connection() // Hacer una función para esto

export class MessageModel implements MessageModelInterface {

    getAll = async () => {
        try {
            const db = await connection.connection()
            if (!db) return null
            const messagesCollection = await db.collection<message>('messages')
            const messages = await messagesCollection.find().toArray()
            if (messages) {
                return messages
            } else {
                return []
            }
        } catch (error) {
            console.error(error)
        }
    }

    getById = async (id: string) => {
        try {
            const db = await connection.connection()
            if (!db) return null
            const messagesCollection = await db.collection<message>('messages')
            const query = { _id: new ObjectId(id)} // Las ids de MongoDB son tratadas como objetos
            const message = await messagesCollection.findOne(query)
            return message
    
        } catch (error) {
            console.error(error)
            return null
        }
    }

    create = async (message: messageInput) => {
        try {
            const db = await connection.connection()
            if (!db) return null
            const messagesCollection = await db.collection('messages')
            const query = await messagesCollection.insertOne(message)
            return query.acknowledged

        } catch (error) {
            console.error(error)
            return null
        }
    }

    patch = async ({ id, message }: { id: string, message: messageInput }) => {
        try {
            const db = await connection.connection()
            if (!db) return null
            const messagesCollection = await db.collection('messages')
            const query = await messagesCollection.updateOne({ _id: new ObjectId(id) }, { $set: message })
            return { found: query.matchedCount, result: query.modifiedCount }
        } catch (error) {
            console.error(error)
            return null
        }
    }

    delete = async (id: string) => {
        try {
            const db = await connection.connection()
            if (!db) return null
            const messagesCollection = await db.collection('messages')
            const result = await messagesCollection.deleteOne({ _id: new ObjectId(id) })
            return result.deletedCount
        } catch (error) {
            console.error(error)
            return null
        }
    }

    deleteSelection = async (ids: string[]) => {
        try {
            const db = await connection.connection()
            if (!db) return null
            const messagesCollection = await db.collection('messages')
            const idsToDelete = ids.map((id: string) => new ObjectId(id)) // Se transforman las ids en objetos para MongoDB
            const result = await messagesCollection.deleteMany({ _id: { $in: idsToDelete }})
            return result.deletedCount
        } catch (error) {
            console.error(error)
            return null
        }
    }
}