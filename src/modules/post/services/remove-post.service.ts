import { PostRepository } from "../repositories/post.repository";

export class RemovePostService {
    constructor(
        private readonly postRepository: PostRepository
    ) {}
    async execute(id: number): Promise<void> {
        await this.postRepository.delete(id)
    }
}