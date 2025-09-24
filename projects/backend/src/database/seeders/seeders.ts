import { messageInput } from "../../contracts/interfaces/Message.js";
import { Connection } from "../connection.js";
import { CollectionSeeder } from "./CollectionSeeder.js";

const { DB_NAME, DB_USER, DB_PASS } = process.env

const messages: messageInput[] = [
    {
        nombre: 'Guamelo',
        apellidos: 'Sánchez',
        telefono: '656765978',
        email: 'gsanchez@gmail.com',
        contenido: 'Hola, soy Guamelo Sánchez.'
    },
    {
        nombre: 'Pedro',
        apellidos: 'Picapiedra',
        telefono: '952231242',
        email: 'ppica@gmail.com',
        contenido: 'Hola, soy Pedro de los Picapiedra.'
    }
]

const connection = new Connection(DB_USER, DB_PASS, DB_NAME)
const messageSeeder = new CollectionSeeder(connection)
await messageSeeder.seed('messages', messages)