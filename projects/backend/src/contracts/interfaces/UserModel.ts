import { WithId, OptionalId } from "mongodb";
import { createUserInput, user } from "shared-types";

export interface UserModelInterface {
    getById: (email: string) => Promise<WithId<OptionalId<user>>>
    getByEmail: (email: string) => Promise<WithId<OptionalId<user>>>
    create: (userInput: createUserInput) => Promise<boolean>
}