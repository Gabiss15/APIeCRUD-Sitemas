import { UserEntity } from "../entities/user.entity";
import { UserRepository } from '../repositories/user.repository';

export class FindUserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async execute(): Promise<UserEntity[]> {
        const users = await this.userRepository.find()
        return users
    }
}