import { Db, MongoClient } from "mongodb";

export interface ConnectionInterface {
    get client() : MongoClient
    connection: () => Promise<Db>
}