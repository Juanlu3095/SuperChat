import { ConnectionInterface } from 'backend/src/contracts/interfaces/Connection.js'
import type { Document } from 'mongodb'

export class CollectionSeeder {
    private connection: ConnectionInterface

    public constructor (connection: ConnectionInterface) {
        this.connection = connection
    }

    seed = async (collection: string, documents: Document[]) => {
        try {
            const database = await this.connection.connection()
            const collectionDB = database.collection(collection)
            const result = await collectionDB.insertMany(documents)
            console.log(`Se han añadido ${result.insertedCount} documento(s) a la colección ${collection}.`)
            this.connection.mongoClient.close()
        } catch (error) {
            console.error(error)
        }
    }
}