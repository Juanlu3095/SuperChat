import { WithId, OptionalId } from "mongodb";
import { createUserInput, user } from "shared-types";

export interface UserModelInterface {
    getByEmail: (email: string) => Promise<WithId<OptionalId<user>>>
    create: (userInput: createUserInput) => Promise<boolean>
}