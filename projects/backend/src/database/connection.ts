import { MongoClient } from 'mongodb'
import { ConnectionInterface } from '../contracts/interfaces/Connection.js';

export class Connection implements ConnectionInterface{
    private dbUser: string = '';
    private dbPass: string = '';
    private dbName: string = '';
    public mongoClient: MongoClient = {} as MongoClient

    public constructor (DB_USER: string, DB_PASS: string, DB_NAME: string) {
        this.dbUser = DB_USER
        this.dbPass = DB_PASS
        this.dbName = DB_NAME
        this.mongoClient = new MongoClient(`mongodb+srv://${this.dbUser}:${this.dbPass}@cluster0.j9ccw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    }

    connection = async () => {
        try {
            await this.mongoClient.connect()
            const databaseConnection = this.mongoClient.db(this.dbName)
            return databaseConnection
        } catch (error) {
            console.error(error)
            return null
        }
    }
}
