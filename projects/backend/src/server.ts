import { createApp } from "./app.js"
import { MessageModel } from "./models/MessageModel.js"
import { SessionModel } from "./models/SessionModel.js"
import { UserModel } from "./models/UserModel.js"

const app = createApp({
    messageModel: new MessageModel,
    userModel: new UserModel,
    sessionModel: new SessionModel
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})