import { UserEntity } from "../entities/user.entity";
import { UserRepository } from '../repositories/user.repository';

export class FindOneUserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async execute(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findById(id)
        return user
    }
}