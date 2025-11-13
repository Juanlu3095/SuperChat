
export class ChatmessageController {
    private chatMessageModel: any

    public constructor (chatMessageController: any) {
        this.chatMessageModel = chatMessageController
    }

    create = async (msg: any) => {

        // Primero obtener la id de la sesión y sobre ello obtener la id del usuario
        // Comprobar que la id del usuario exista

        const result = await this.chatMessageModel.create(msg)

        return result ? true : false
    } 
}