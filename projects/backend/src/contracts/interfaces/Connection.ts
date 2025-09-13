import { Db, MongoClient } from "mongodb";

export interface ConnectionInterface {
    mongoClient: MongoClient;
    connection: () => Promise<Db>
}