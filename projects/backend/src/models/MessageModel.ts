import { ObjectId } from "mongodb"
import { message, messageInput } from "../contracts/interfaces/Message.js"
import { MessageModelInterface } from "../contracts/interfaces/MessageModel.js"
import { Connection } from "../database/connection.js"

const { DB_NAME, DB_USER, DB_PASS } = process.env

async function messageCollection() {
    try {
        const connection = new Connection(DB_USER, DB_PASS, DB_NAME)
        const db = await connection.connection()
        if (!db) return null
        return db.collection<message>('messages')
        
    } catch (error) {
        console.error(error)
    }
}

export class MessageModel implements MessageModelInterface {

    getAll = async () => {
        try {
            const collection = await messageCollection()
            const messages = await collection.find().toArray()
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
            const collection = await messageCollection()
            const query = { _id: new ObjectId(id)} // Las ids de MongoDB son tratadas como objetos
            const message = await collection.findOne(query)
            return message
    
        } catch (error) {
            console.error(error)
            return null
        }
    }

    create = async (messageInput: messageInput) => {
        try {
            const collection = await messageCollection()
            const message = {
                ...messageInput,
                created_at: new Date().toLocaleDateString(),
                updated_at: new Date().toLocaleDateString()
            }
            const query = await collection.insertOne(message)
            return query.acknowledged

        } catch (error) {
            console.error(error)
            return null
        }
    }

    patch = async ({ id, messageInput }: { id: string, messageInput: messageInput }) => {
        try {
            const collection = await messageCollection()
            const message = {
                ...messageInput,
                updated_at: new Date().toLocaleDateString()
            }
            const query = await collection.updateOne({ _id: new ObjectId(id) }, { $set: message })
            return { found: query.matchedCount, result: query.modifiedCount }
        } catch (error) {
            console.error(error)
            return null
        }
    }

    delete = async (id: string) => {
        try {
            const collection = await messageCollection()
            const result = await collection.deleteOne({ _id: new ObjectId(id) })
            return result.deletedCount
        } catch (error) {
            console.error(error)
            return null
        }
    }

    deleteSelection = async (ids: string[]) => {
        try {
            const collection = await messageCollection()
            const idsToDelete = ids.map((id: string) => new ObjectId(id)) // Se transforman las ids en objetos para MongoDB
            const result = await collection.deleteMany({ _id: { $in: idsToDelete }})
            return result.deletedCount
        } catch (error) {
            console.error(error)
            return null
        }
    }
}