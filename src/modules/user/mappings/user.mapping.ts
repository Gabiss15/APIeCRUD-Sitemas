import { UserDTO } from "../dtos/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserMapping {
    static from(user: UserDTO): UserEntity {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    }
}