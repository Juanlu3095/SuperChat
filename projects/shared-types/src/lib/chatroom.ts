import { ObjectId } from "mongodb";
import { chatParticipant } from "shared-types";

export interface chatroom {
    _id: string,
    name: string | null,
    description: string | null,
    participants: chatParticipant[],
    isGroup: boolean,
    avatar: string | null,
    created_at: string,
    updated_at: string
}