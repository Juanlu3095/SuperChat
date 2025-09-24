import { messageInput } from "./Message.js";

export interface ValidationResultInterface {
    success: boolean,
    errors: {},
    data: messageInput
}