import { ObjectId, OptionalId } from "mongodb"
import { Connection } from "../database/connection.js"

const { DB_NAME, DB_USER, DB_PASS } = process.env

async function chatroomCollection() {
    try {
        const connection = new Connection(DB_USER, DB_PASS, DB_NAME)
        const db = await connection.connection()
        if (!db) return null
        return db.collection<OptionalId<any>>('chatrooms') // OptionalId hace opcional _id para operaciones insert en mongodb
        
    } catch (error) {
        console.error(error)
    }
}

export class ChatroomModel {

    /**
     * It returns all chatrooms with usernames, and if it uses userId as parameter it will return chatrooms where that user is in.
     * https://www.mongodb.com/docs/manual/reference/operator/aggregation/filter/#mongodb-expression-exp.-filter
     * https://labex.io/es/tutorials/mongodb-query-mongodb-arrays-422090
     * @param {{string}} {userId}  
     * @returns 
     */
    getAll = async ({ userId } : { userId?: string }) => {
        try {
            const _id = new ObjectId(userId)
            const collection = await chatroomCollection()
            const result = collection.aggregate([
                {
                    $match: {
                        participants: _id
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "participants",
                        foreignField: "_id",
                        as: "participants"
                    }
                },
                {
                    $project: {
                        "participants.password": 0,
                        "participants.updated_at": 0
                    },
                },
                /* {    
                    $project: {
                        name: { $ifNull: [ '$name', { $filter: {
                            input: "$participants",
                            as: "participant",
                            cond: { $ne: ["$$participant", _id] }  // deja sólo la id distinta a la mía
                            }}
                        ]},
                        participantsInfo: 1,
                        avatar: 1
                    }
                },
                { $unwind: {
                    path: "$name",
                    preserveNullAndEmptyArrays: true // Hace que el unwind no se cargue el documento si name es null
                } },
                {
                    $lookup: {
                        from: "users",
                        localField: "name",
                        foreignField: "_id",
                        as: "name"
                    },
                },
                {
                    $project: {
                        name: '$name.nombre',
                        participantsInfo: 1,
                    }
                },
                { $unwind: {
                    path: "$name",
                    preserveNullAndEmptyArrays: true // Hace que el unwind no se cargue el documento si name es null
                } }, */
            ]).toArray()
            return result
        } catch (error) {
            console.error(error)
            return null
        }
    }

    getById = async () => {
        
    }

    create = async () => {
        
    }

    patch = async () => {
        
    }

    delete = async () => {
        
    }
}