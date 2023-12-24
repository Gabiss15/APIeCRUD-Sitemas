import { UserRepository } from '../repositories/user.repository';

export class RemoveUserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async execute(id: number): Promise<void> {
        await this.userRepository.delete(id)
    }
}