import { createApp } from "./app.js"
import { MessageModel } from "./models/MessageModel.js"

const app = createApp({
    messageModel: new MessageModel
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})