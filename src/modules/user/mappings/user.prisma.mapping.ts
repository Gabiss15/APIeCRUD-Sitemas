import { UserEntity } from "../entities/user.entity";
import { User } from "@prisma/client";

export class UserPrismaMapping {
    static to(user: User): UserEntity {
        return {
            id: user.id,
            email: user.email,
            name: user.name ?? user.name,
        }
    }

    static from(user: UserEntity): User {
        return {
            id: user.id,
            email: user.email,
            name: user.name ?? user.name,
        }
    }

}

