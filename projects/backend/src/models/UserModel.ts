import { OptionalId } from "mongodb"
import { Connection } from "../database/connection.js"
import { createUserInput, user } from "shared-types"
import { UserModelInterface } from "../contracts/interfaces/UserModel.js"

const { DB_NAME, DB_USER, DB_PASS } = process.env

async function userCollection() {
    try {
        const connection = new Connection(DB_USER, DB_PASS, DB_NAME)
        const db = await connection.connection()
        if (!db) return null
        return db.collection<OptionalId<user>>('users') // OptionalId hace opcional _id para operaciones insert en mongodb
        
    } catch (error) {
        console.error(error)
    }
}

export class UserModel implements UserModelInterface {

    getByEmail = async (email: string) => {
        try {
            const collection = await userCollection()
            const query = { email }
            const user = await collection.findOne(query)
            return user
        
        } catch (error) {
            console.error(error)
            return null
        }
    }

    create = async (userInput: createUserInput) => {
        try {
            const collection = await userCollection()
            const user = {
                ...userInput,
                created_at: new Date().toLocaleDateString(),
                updated_at: new Date().toLocaleDateString()
            }
            const query = await collection.insertOne(user)
            return query.acknowledged

        } catch (error) {
            console.error(error)
            return null
        }
    }
}