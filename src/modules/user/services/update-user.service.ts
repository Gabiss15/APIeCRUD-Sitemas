import { UserDTO } from "../dtos/user.dto";
import { UserMapping } from "../mappings/user.mapping";
import { UserRepository } from "../repositories/user.repository";

export class UpdateUserService {
    constructor(
        private readonly userRepositoy: UserRepository
    ) { }
    async execute(id: number, data: UserDTO): Promise<void> {
        const user = UserMapping.from(data)
        await this.userRepositoy.update(id, user)
    }
}