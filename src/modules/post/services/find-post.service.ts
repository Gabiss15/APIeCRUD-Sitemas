import { PostEntity } from "../entities/post.entity";
import { PostRepository } from "../repositories/post.repository";

export class FindPostService {
    constructor(
        private readonly postRepository: PostRepository
    ) {}
    async execute(): Promise<PostEntity[]> {
        const posts = await this.postRepository.find()
        return posts
    }
}