import { OptionalId } from "mongodb";
import { Connection } from "../connection.js";

const { DB_NAME, DB_USER, DB_PASS } = process.env

async function getCollection(collection: string) {
    try {
        const connection = new Connection(DB_USER, DB_PASS, DB_NAME)
        const db = await connection.connection()
        if (!db) return null
        return db.collection<OptionalId<any>>(collection) // Con esto nos valdrá para hacer la validación en cualquier colección
        
    } catch (error) {
        console.error(error)
    }
}

export class DatabaseValidation {

    /**
     * It returns the number of rows with the same value.
     * @param {string} dbcollection The collection in DB to search a value.
     * @param {string} column The key of values used to search the value.
     * @param {string} value The value to find in database to see if it already exists.
     */
    public repeatedValues = async (dbcollection: string, column: string, value: string) => {
        try {
            const collection = await getCollection(dbcollection)
            const query = { [column]: value }
            const countDocuments = await collection.countDocuments(query)
            return countDocuments
        } catch (error) {
            console.error(error)
        }
    }
}