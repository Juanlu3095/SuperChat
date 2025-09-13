import { MongoClient } from 'mongodb'

export class DatabaseMigration {
    private dbUser: string = '';
    private dbPass: string = '';
    private dbName: string = '';
    private mongoClient: MongoClient = {} as MongoClient

    public constructor (DB_USER: string, DB_PASS: string, DB_NAME: string) {
        this.dbUser = DB_USER
        this.dbPass = DB_PASS
        this.dbName = DB_NAME
        this.mongoClient = new MongoClient(`mongodb+srv://${this.dbUser}:${this.dbPass}@cluster0.j9ccw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    }

    migrate = async () => {
        try {
            const db = this.mongoClient.db(this.dbName)
            await db.createCollection('messages')
            console.log(`Se ha creado la base de datos ${this.dbName}`)
            this.mongoClient.close()
        } catch (error) {
            console.error(error)
        }
    }

    delete = async () => {
        try {
            const db = this.mongoClient.db(this.dbName)
            const result = await db.dropDatabase()
            if (result) {
                console.log(`Se ha eliminado la base de datos ${this.dbName}`)
            } else {
                console.log(`No se ha eliminado la base de datos ${this.dbName}`)
            }
            this.mongoClient.close()
        } catch (error) {
            console.error(error)
        }
    }
    
}