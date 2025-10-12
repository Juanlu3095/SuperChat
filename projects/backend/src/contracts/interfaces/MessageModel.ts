import { WithId } from "mongodb";
import { message, messageInput } from "shared-types";

export interface MessageModelInterface {
    getAll: () => Promise<WithId<message>[] | null>
    getById: (id: string) => Promise<WithId<message> | null>
    create: (messageInput: messageInput) => Promise<boolean | null>
    patch: ({ id, messageInput }: { id: string, messageInput: messageInput }) => Promise<{ found: number, result: number }>
    delete: (id: string) => Promise<number | null>
    deleteSelection: (ids: string[]) => Promise<number | null>
}