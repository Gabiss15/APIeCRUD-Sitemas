import { PostEntity } from "../entities/post.entity";
import { PostRepository } from "../repositories/post.repository";

export class FindOnePostService {
    constructor(
        private readonly postRepository: PostRepository 
    ) { }
    async execute(id: number): Promise<PostEntity> {
        const post = await this.postRepository.findById(id)
        return post
    }
}