import { ObjectId, OptionalId } from "mongodb"
import { Connection } from "../database/connection.js"
import { SessionModelInterface } from "../contracts/interfaces/SessionModel.js"
import { SessionMongodb } from "../contracts/interfaces/Session.js"

const { DB_NAME, DB_USER, DB_PASS } = process.env

async function sessionCollection() {
    try {
        const connection = new Connection(DB_USER, DB_PASS, DB_NAME)
        const db = await connection.connection()
        if (!db) return null
        return db.collection<OptionalId<SessionMongodb>>('sessions') // OptionalId hace opcional _id para operaciones insert en mongodb
        
    } catch (error) {
        console.error(error)
    }
}

export class SessionModel implements SessionModelInterface {
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

    // Obtener usuario correspondiente a la sesión
    getUser = async (sessionId: string) => {
        try {
            const collection = await sessionCollection()
            const user = await collection.aggregate([
                { $match: { _id: sessionId } },
                {
                    $lookup: {
                        from: "users", // Colección con la que queremos relacionar sessions
                        localField: "userId", // Campo a relacionar de sessions
                        foreignField: "_id", // Campo a relacionar de users
                        as: "user" // El nombre de la propiedad que va a contener los datos relacionados
                    }
                }
            ]).toArray()
            return user

        } catch (error) {
            console.error(error)
            return null
        }
    }

    patch = async (sessionId: string, userId: string) => {
        try {
            const collection = await sessionCollection()
            const result = await collection.updateOne({ _id: sessionId }, {
                $set: { userId: new ObjectId(userId) }
            })
            return { found: result.matchedCount, result: result.modifiedCount }
        } catch (error) {
            console.error(error)
            return null
        }
    }
}